const pg = require('pg');
const _ = require('lodash');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

exports.getExams = (req, res) => {
  const q = `select E.id as id, C.code as courseid, E.examtype as examtype, E.examid as examid, E.profs as profs
    from exams E inner join courses C on C.id = E.courseid`;
  client.query({ text: q })
    .then((result) => {
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
      res.json({ multi_dict, key_dict });
    });
};

exports.getSchools = (req, res) => {
  const q = 'select id, code, name from schools';
  client.query({ text: q })
    .then((result) => {
      const items = _.map(result.rows, function(row) {
        return { id: row.id, code: row.code, name: row.name };
      });
      res.json(items);
    });
};

exports.getExamTypes = (req, res) => {
  const q = 'select id, type_code, type_label from exam_types';
  client.query({ text: q })
    .then((result) => {
      const items = _.map(result.rows, function(row) {
        return { id: row.id, type_code: row.type_code, type_label: row.type_label };
      });
      res.json(items);
    });
};

exports.getTerms = (req, res) => {
  const q = 'select id, term_code, term_label from terms';
  client.query({ text: q })
    .then((result) => {
      const items = _.map(result.rows, function(row) {
        return { id: row.id, term_code: row.term_code, term_label: row.term_label };
      });
      res.json(items);
    });
};

exports.getTranscribedExams = (req, res) => {
  const q = `
    select ES.id, ES.profs, courses.code as course_code, courses.name as course_name, schools.code as school_code, schools.name as school_name, terms.term_code, terms.term_label from exams_staging ES
    inner join courses on courses.id = ES.courseid
    inner join exam_types on exam_types.id = ES.examtype
    inner join schools on schools.id = ES.schoolid
    inner join terms on terms.id = ES.examid;
  `;
  client.query({ text: q })
    .then((result) => {
      const items = _.reduce(result.rows, function(dict, row) {
        dict[row.id] = {
          course_code: row.course_code,
          course_name: row.course_name,
          school_code: row.school_code,
          school_name: row.school_name,
          term_code: row.term_code,
          term_label: row.term_label,
        };
        return dict;
      }, {});
      res.json(items);
    });
};

exports.getTranscribedContent = (req, res) => {
  const q = `
    select problem_num, subproblem_num, problem, solution, exam from content_staging
  `;
  client.query({ text: q })
    .then((result) => {
      const items = _.reduce(result.rows, function(dict, row) {
        if (!_.has(dict, row.exam)) {
          dict[row.exam] = [];
        }
        dict[row.exam].push({
          problem_num: row.problem_num,
          subproblem_num: row.subproblem_num,
          problem: row.problem,
          solution: row.solution,
        });
        return dict;
      }, {});
      res.json(items);
    });
};
