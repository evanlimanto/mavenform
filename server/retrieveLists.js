const async = require('async');
const express = require('express');
const router = express.Router();
const pg = require('pg');
const _ = require('lodash');
const url = require('url');

const renderer = require('../src/renderer');

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

const getExams = (callback) => {
  const q = `
    select E.id as id, C.code as courseid, ET.type_code as examtype, T.term_code as examid, E.profs as profs from exams E
    inner join courses C on C.id = E.courseid
    inner join exam_types ET on E.examtype = ET.id
    inner join terms T on E.examid = T.id
  `;
  pool.query(q, (err, result) => {
    if (err)
      return callback(err);
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

    return callback(null, { multi_dict, key_dict });
  });
};

const getSchools = (callback) => {
  const q = 'select id, code, name from schools';
  pool.query(q, (err, result) =>{
    if (err)
      return callback(err);
    const items = _.map(result.rows, function(row) {
      return { id: row.id, code: row.code, name: row.name };
    });
    return callback(null, items);
  });
};

const getExamTypes = (callback) => {
  const q = 'select id, type_code, type_label from exam_types';
  pool.query(q, (err, result) => {
    if (err)
      return callback(err);
    const items = _.map(result.rows, function(row) {
      return { id: row.id, type_code: row.type_code, type_label: row.type_label };
    });
    return callback(null, items);
  });
};

const getTerms = (callback) => {
  const q = 'select id, term_code, term_label from terms';
  pool.query(q, (err, result) => {
    if (err)
      callback(err);
    const items = _.map(result.rows, function(row) {
      return { id: row.id, term_code: row.term_code, term_label: row.term_label };
    });
    return callback(null, items);
  });
};

const getLabels = (callback) => {
  const q = `select code, name from schools`;
  pool.query(q, (err, result) => {
    if (err)
      return callback(err);
    const items = _.reduce(result.rows, (dict, row) => {
      dict[row.code] = row.name; 
      return dict;
    }, {});
    return res.json({ schools: items  });
  });
};

// Combine all initial data into one single response
const getInitial = (req, res, next) => {
  async.parallel([
    getExams,
    getSchoos,
    getExamTypes,
    getTerms,
    getLabels,
  ], (err, results) => {
    if (err)
      return next(err);
    return res.json({
      exams: results[0],
      schools: results[1],
      exam_types: results[2],
      terms: results[3],
      labels: results[4],
    });
  })
};

const getTranscribedExams =
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

const getTranscribedContent =
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

const getTranscribedContentDict =
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

const getTranscribedExam =
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

const getSchoolCourses =
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

const getSchoolCoursesList =
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

const getCourseExams =
  (req, res, next) => {
    const { courseCode, schoolCode } = req.params;
    const q = `
      select E.id as id, E.solutions_available as solutions_available, ET.type_code as type_code, ET.type_label as type_label,
        T.term_code as term_code, T.term_label as term_label, E.profs as profs from exams E
      inner join courses C on C.id = E.courseid
      inner join exam_types ET on ET.id = E.examtype
      inner join terms T on T.id = E.examid
      inner join schools S on S.id = E.schoolid
      where C.code = $1 and S.code = $2
      order by E.examtype asc, E.examid desc
    `;
    pool.query(q, [courseCode, schoolCode], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return {
          id: row.id,
          solutions_available: row.solutions_available,
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

const getExamInfo =
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

const getCoursesBySchool =
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

const getSubjects =
  (req, res, next) => {
    const q = `select id, subject_code, subject_label from subjects`;
    pool.query(q, (err, result) => {
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

const getMathTopics =
  (req, res, next) => {
    const getq = `
      select id, topic, concept, code from math_topics
      where exists (select 1 from math_content where tag = math_topics.id);
    `;
    pool.query(getq, (err, result) => {
      if (err) return next(err);
      const items = _.reduce(result.rows, (dict, row) => {
        if (!_.has(dict, row.topic)) {
          dict[row.topic] = [];
        }
        dict[row.topic].push({ id: row.id, label: row.concept, code: row.code });
        return dict;
      }, {});
      return res.json(items);
    });
  };

const getMathContent =
  (req, res, next) => {
    const { topic } = req.params;
    const getq = `
      select content, solution from math_content
      inner join math_topics on
      math_content.tag = math_topics.id
      where math_topics.code = $1
    `;
    pool.query(getq, [topic], (err, result) => {
      if (err) return next(err);
      const items = _.map(result.rows, (row) => {
        return {
          content: renderer.preprocess(row.content),
          solution: renderer.preprocess(row.solution),
        };
      });
      return res.json(items);
    });
  };

// Retrieve initial data
router.get('/getInitial', getInitial);

// Retrieve list of subjects
router.get('/getSubjects', getSubjects);

// Retrieve list of transcribed exams
router.get('/getTranscribedExams', getTranscribedExams);

// Retrieve information for a transcribed exam
router.get('/getTranscribedExam/:examid', getTranscribedExam);

// Retrieve courses grouped by school
router.get('/getCoursesBySchool', getCoursesBySchool);

// Retrieve list of transcribed content
router.get('/getTranscribedContent/:examid', getTranscribedContent);

// Retrive dict of transcribed content
router.get('/getTranscribedContentDict', getTranscribedContentDict);

// Retrieve dictionary of courses with subjects
router.get('/getSchoolCourses/:schoolCode', getSchoolCourses);

// Retrieve dictionary of courses with subjects
router.get('/getSchoolCoursesList/:schoolid', getSchoolCoursesList);

// Retrieve list of exams
router.get('/getCourseExams/:schoolCode/:courseCode', getCourseExams);

// Retrieve list of labels
router.get('/getLabels', getLabels);

// Retrieve information for an exam
router.get('/getExamInfo/:schoolCode/:courseCode/:examTypeCode/:termCode', getExamInfo);

// Retrieve list of math topics
router.get('/getMathTopics', getMathTopics);

// Retrieve math content by topic
router.get('/getMathContent/:topic', getMathContent);

module.exports = router;
