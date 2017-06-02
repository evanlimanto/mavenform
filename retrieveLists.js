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
