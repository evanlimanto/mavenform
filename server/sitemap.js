const _ = require('lodash');
const async = require('async');
const sm = require('sitemap');
const pg = require('pg');

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const client = new pg.Client(config);
client.connect();

const getAvailableSchools = (callback) => {
  const q = `
    select code from schools where exists (select 1 from exams where schoolid = schools.id)
  `;
  client.query(q, (err, result) => {
    if (err) return callback(err);
    return callback(null, _.map(result.rows, (row) => row.code));
  });
};

const getAvailableCourses = (callback, schoolCode) => {
  const q = `
    select C.code as course_code from courses C
    inner join schools S on C.schoolid = S.id
    where exists (select 1 from exams where courseid = C.id) and S.code = $1;
  `;
  client.query(q, [schoolCode], (err, result) => {
    if (err) return callback(err);
    return callback(null, _.map(result.rows, (row) => row.course_code));
  });
};

const getCourseInfo = (callback, schoolCode, courseCode) => {
  const getexamq = `
    select * from exams E
    inner join courses C on C.id = E.courseid
    inner join schools S on S.id = E.schoolid
    inner join exam_types ET on ET.id = E.examtype
    inner join terms T on T.id = E.examid
    where S.code = $1 and C.code = $2
  `;
  const gettopicq = `
    select T.code from course_topics CT
    inner join courses C on C.id = CT.courseid
    inner join topics T on T.id = CT.topicid
    inner join schools S on S.id = C.schoolid
    where S.code = $1 and C.code = $2;
  `;
  async.parallel([
    (callback) => client.query(getexamq, [schoolCode, courseCode], (err, result) => {
      if (err) return callback(err);
      return callback(null, _.map(result.rows, (row) => {
        return {
          examType: row.type_code,
          termCode: row.term_code,
          profs: _.replace(row.profs, /, /g, '-'),
        };
      }));
    }),
    (callback) => client.query(gettopicq, [schoolCode, courseCode], (err, result) => {
      if (err) return callback(err);
      return callback(null, _.map(result.rows, (row) => row.code));
    }),
  ], (err, results) => {
    if (err) return callback(err);
    return callback(err, { exams: results[0], topics: results[1] });
  });
};

module.exports = (app) => {
  const getSitemap = (req, res, next) => {
    const sitemap = sm.createSitemap({
      hostname: 'http://www.studyform.com',
      cacheTime: 60 * 1000,
    });
    sitemap.add({ url: '/' });

    async.waterfall([
      (callback) => getAvailableSchools(callback),
      (schoolCodes, callback) => async.map(schoolCodes, (schoolCode, innerCallback) => {
        sitemap.add({ url: `/${schoolCode}` });

        getAvailableCourses((err, courseCodes) => innerCallback(err, { schoolCode, courseCodes }), schoolCode);
      }, callback),
      (schoolCourseCodes, callback) => async.map(schoolCourseCodes, (schoolCourseCode, innerCallback) => {
        const { schoolCode, courseCodes } = schoolCourseCode;
        async.map(courseCodes, (courseCode, innerInnerCallback) => {
          sitemap.add({ url: `/${schoolCode}/${courseCode}` });

          getCourseInfo((err, courseInfos) => {
            return innerInnerCallback(err, { schoolCode, courseCode, courseInfos });
          }, schoolCode, courseCode);
        }, innerCallback);
      }, callback),
      (results, callback) => {
        results = _.flattenDeep(results);
        _.forEach(results, (result) => {
          const { schoolCode, courseCode } = result;
          _.forEach(result.courseInfos.exams, (examInfo) => {
            const { examType, termCode, profs } = examInfo;
            sitemap.add({ url: `/${schoolCode}/${courseCode}/${examType}/${termCode}/${profs}` });
          });
          _.forEach(result.courseInfos.topics, (topicCode) => {
            sitemap.add({ url: `/${schoolCode}/${courseCode}/${topicCode}` });
          });
        });
        return callback(null);
      }
    ], (err, results) => {
      if (err) return next(err);
      return res.header('Content-Type', 'text/xml').send(sitemap.toString());
    });
  };

  app.get('/sitemap.xml', getSitemap);
};
