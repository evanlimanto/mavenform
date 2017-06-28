const pg = require('pg');
const _ = require('lodash');
const url = require('url');

const renderer = require('./src/renderer');

// Postgres
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: process.env.NODE_ENV !== 'development',
};
const pool = new pg.Pool(config);

exports.getExams =
  (req, res, next) => {
    const q = `
      select E.id as id, C.code as courseid, ET.type_code as examtype, T.term_code as examid, E.profs as profs from exams E
      inner join courses C on C.id = E.courseid
      inner join exam_types ET on E.examtype = ET.id
      inner join terms T on E.examid = T.id
    `;
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const multi_dict = _.reduce(result.rows, (dict, row) => {
        const id = row.id;
        const courseid = row.courseid;
        const examtype = row.examtype;
        const examid = row.examid;
        const profs = row.profs;
        if (!_.has(dict, courseid)) {
          dict[courseid] = {};
        }
        if (!_.has(dict[courseid], examtype)) {
          dict[courseid][examtype] = {};
        }
        dict[courseid][examtype][examid] = { id, profs };
        return dict;
      }, {});
      const key_dict = _.reduce(result.rows, (dict, row) => {
        const id = row.id;
        const courseid = row.courseid;
        const examtype = row.examtype;
        const examid = row.examid;
        const profs = row.profs;
        dict[id] = { courseid, examtype, examid, profs };
        return dict;
      }, {});

      return res.json({ multi_dict, key_dict });
    });
  };

exports.getSchools = 
  (req, res, next) => {
    const q = 'select id, code, name from schools';
    pool.query(q, (err, result) =>{
      if (err) return next(err);
      const items = _.map(result.rows, function(row) {
        return { id: row.id, code: row.code, name: row.name };
      });
      return res.json(items);
    });
  };

exports.getExamTypes = 
  (req, res, next) => {
    const q = 'select id, type_code, type_label from exam_types';
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, function(row) {
        return { id: row.id, type_code: row.type_code, type_label: row.type_label };
      });
      return res.json(items);
    });
  };

exports.getTerms = 
  (req, res, next) => {
    const q = 'select id, term_code, term_label from terms';
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, function(row) {
        return { id: row.id, term_code: row.term_code, term_label: row.term_label };
      });
      return res.json(items);
    });
  };

exports.getTranscribedExams = 
  (req, res, next) => {
    const q = `
      select ES.id as id, ES.profs as profs, ES.datetime, exam_types.type_code as type_code, exam_types.type_label as type_label, courses.code as course_code, schools.code as school_code, schools.name as school_name, terms.term_code, terms.term_label from exams_staging ES
      inner join courses on courses.id = ES.courseid
      inner join exam_types on exam_types.id = ES.examtype
      inner join schools on schools.id = ES.schoolid
      inner join terms on terms.id = ES.examid;
    `;
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.reduce(result.rows, function(dict, row) {
        dict[row.id] = {
          datetime: row.datetime,
          type_label: row.type_label,
          type_code: row.type_code,
          course_code: row.course_code,
          school_code: row.school_code,
          school_name: row.school_name,
          term_code: row.term_code,
          term_label: row.term_label,
        };
        return dict;
      }, {});
      return res.json(items);
    });
  };

exports.getTranscribedContent = 
  (req, res, next) => {
    const { examid } = req.params;
    const q = `
      select problem_num, subproblem_num, problem, solution from content_staging
      where exam = $1
    `;
    pool.query(q, [examid], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return {
          problem_num: row.problem_num,
          subproblem_num: row.subproblem_num,
          problem: renderer.preprocess(row.problem),
          solution: renderer.preprocess(row.solution),
        };
      });
      return res.json(items);
    });
  };

exports.getTranscribedContentDict = 
  (req, res, next) => {
    const q = `
      select problem_num, subproblem_num, problem, solution, exam, choices from content_staging
    `;
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.reduce(result.rows, function(dict, row) {
        if (!_.has(dict, row.exam)) {
          dict[row.exam] = [];
        }
        dict[row.exam].push({
          problem_num: row.problem_num,
          subproblem_num: row.subproblem_num,
          problem: renderer.preprocess(row.problem),
          solution: renderer.preprocess(row.solution),
          choices: row.choices,
        });
        return dict;
      }, {});
      return res.json(items);
    });
  };

exports.getTranscribedExam = 
  (req, res, next) => {
    const { examid } = req.params;
    const q = `
      select
        ES.profs as profs,
        courses.code as course_code,
        courses.id as course_id,
        exam_types.type_code type_code,
        exam_types.id as type_id,
        terms.term_code as term_code,
        terms.id as term_id,
        schools.code as school_code,
        schools.id as school_id
      from exams_staging ES
      inner join courses on courses.id = ES.courseid
      inner join exam_types on exam_types.id = ES.examtype
      inner join terms on terms.id = ES.examid
      inner join schools on schools.id = ES.schoolid
      where ES.id = $1
    `;
    pool.query(q, [examid], (err, result) => {
      if (err) return next(err);
      const row = result.rows[0];
      return res.json({
        profs: row.profs,
        course_code: row.course_code,
        course_id: row.course_id,
        type_code: row.type_code,
        type_id: row.type_id,
        term_code: row.term_code,
        term_id: row.term_id,
        school_code: row.school_code,
        school_id: row.school_id,
      });
    });
  };

exports.getSchoolCourses = 
  (req, res, next) => {
    const schoolCode = req.params.schoolCode;
    const checkq = `select 1 from schools where code = $1`;
    const q = `
      select C.id, C.code_label, C.code, subjects.subject_code, subjects.subject_label from courses C
      inner join schools on schools.id = C.schoolid
      inner join subjects on subjects.id = C.subjectid
      where schools.code = $1 and exists (select 1 from exams where exams.courseid = C.id)
    `;
    pool.query(checkq, [schoolCode], (err, result) => {
      if (err) return next(err);
      if (_.keys(result.rows).length === 0)
        return res.json({ invalidCode: true });
      pool.query(q, [schoolCode], (err, result) => {
        if (err)
          return next(err);
        const items = _.reduce(result.rows, (dict, row) => {
          if (!_.has(dict, row.subject_code)) {
            dict[row.subject_code] = {
              label: row.subject_label,
              courses: []
            }
          }
          dict[row.subject_code].courses.push({
            id: row.id,
            code: row.code,
            code_label: row.code_label,
          });
          return dict;
        }, {});
        return res.json(items);
      });
    });
  };

exports.getSchoolCoursesList = 
  (req, res, next) => {
    const schoolid = req.params.schoolid;
    const q = `
      select C.id, C.code from courses C
      inner join schools on schools.id = C.schoolid
      where schools.id = $1
    `;
    pool.query(q, [schoolid], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return {
          id: row.id,
          code: row.code,
        };
      });
      return res.json(items);
    });
  };

exports.getUnbookmarkedCourses = 
  (req, res, next) => {
    const school_id = req.params.school_id;
    const auth_user_id = req.params.auth_user_id;
    const q = `
      select id, code from courses where id not in
      (select courseid from bookmarked_courses BC inner join users on BC.userid = users.id where users.auth_user_id = $1) and schoolid = $2;
    `;
    pool.query(q, [auth_user_id, school_id], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return { id: row.id, code: row.code };
      });
      return res.json(items);
    });
  };

exports.getCourseExams = 
  (req, res, next) => {
    const { courseCode, schoolCode } = req.params;
    const q = `
      select E.id as id, ET.type_code as type_code, ET.type_label as type_label,
        T.term_code as term_code, T.term_label as term_label, E.profs as profs from exams E
      inner join courses C on C.id = E.courseid
      inner join exam_types ET on ET.id = E.examtype
      inner join terms T on T.id = E.examid
      inner join schools S on S.id = E.schoolid
      where C.code = $1 and S.code = $2;
    `;
    pool.query(q, [courseCode, schoolCode], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return {
          id: row.id,
          type_code: row.type_code,
          type_label: row.type_label,
          term_code: row.term_code,
          term_label: row.term_label,
          profs: row.profs,
        };
      });
      return res.json(items);
    });
  };

exports.getLabels = 
  (req, res, next) => {
    const q = `select code, name from schools`;
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.reduce(result.rows, (dict, row) => {
        dict[row.code] = row.name; 
        return dict;
      }, {});
      return res.json({ schools: items  });
    });
  };

exports.getExamInfo = 
  (req, res, next) => {
    const { schoolCode, courseCode, examTypeCode, termCode } = req.params;
    const getidq = `
      select E.profs, E.source_url from exams E
      inner join courses C on C.id = E.courseid
      inner join exam_types ET on ET.id = E.examtype
      inner join terms T on T.id = E.examid
      inner join schools S on S.id = E.schoolid
      where S.code = $1 and T.term_code = $2 and ET.type_code = $3 and C.code = $4;
    `;
    pool.query(getidq, [schoolCode, termCode, examTypeCode, courseCode], (err, result) => {
      if (err) return next(err);
      if (result.rows.length === 0)
        return res.json({ profs: null, source_url: null });
      return res.json({ profs: result.rows[0].profs, source_url: result.rows[0].source_url});
    });
  };

exports.getCoursesList = 
  (req, res, next) => {
    const q = `
      select courses.id as course_id, courses.code as course_code,
        schools.id as school_id, schools.name as school_name from courses
      inner join schools on courses.schoolid = schools.id
    `;
    pool.query(q, (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (item) => {
        return {
          course_id: item.course_id,
          course_code: item.course_code,
          school_id: item.school_id,
          school_name: item.school_name,
        };
      });
      return res.json(items);
    });
  };

exports.getCoursesBySchool = 
  (req, res, next) => {
    const q = `
      select courses.id as course_id, courses.code as course_code, schools.name as school_name from courses
      inner join schools on courses.schoolid = schools.id
    `;
    pool.query(q, [], (err, result) => {
      if (err) return next(err);
      const items = _.reduce(result.rows, (dict, row) => { 
        if (!_.has(dict, row.school_name)) {
          dict[row.school_name] = [];
        }
        dict[row.school_name].push({
          course_id: row.course_id,
          course_code: row.course_code,
        });
        return dict;
      }, {});
      return res.json(items);
    });
  };

exports.getSubjects = 
  (req, res, next) => {
    const q = `select id, subject_code, subject_label from subjects`;
    pool.query(q, [], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (item) => {
        return {
          subject_id: item.id,
          subject_code: item.subject_code,
          subject_label: item.subject_label,
        };
      });
      return res.json(items);
    });
  };
