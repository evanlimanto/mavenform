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

exports.getSchoolCourses = (req, res, next) => {
  const schoolCode = req.params.schoolCode;
  const q = `
    select C.id, C.code, C.name, subjects.subject_code, subjects.subject_label from courses C
    inner join schools on schools.id = C.schoolid
    inner join subjects on subjects.id = C.subjectid
    where schools.code = $1
  `;
  client.query(q, [schoolCode], (err, result) => {
    if (err) {
      next(err);
      return;
    }
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
        name: row.name,
      });
      return dict;
    }, {});
    res.json(items);
  });
};

exports.getSchoolCoursesList = (req, res, next) => {
  const schoolid = req.params.schoolid;
  const q = `
    select C.id, C.code, C.name from courses C
    inner join schools on schools.id = C.schoolid
    where schools.id = $1
  `;
  client.query(q, [schoolid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const items = _.map(result.rows, (row) => {
      return {
        id: row.id,
        code: row.code,
        name: row.name, 
      };
    });
    res.json(items);
  });
};

exports.getUnbookmarkedCourses = (req, res, next) => {
  const school_id = req.params.school_id;
  const auth_user_id = req.params.auth_user_id;
  const q = `
    select id, code, name from courses where id not in
    (select courseid from bookmarked_courses BC inner join users on BC.userid = users.id where users.auth_user_id = $1) and schoolid = $2;
  `;
  client.query(q, [auth_user_id, school_id], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const items = _.map(result.rows, (row) => {
      return {
        id: row.id,
        code: row.code,
        name: row.name,
      };
    });
    res.json(items);
  });
};

exports.getCourseExams = (req, res, next) => {
  const { courseCode, schoolCode } = req.params;
  const q = `
    select E.id as id, ET.type_code as type_code, ET.type_label as type_label,
      T.term_code as term_code, T.term_label as term_label,
      E.profs as profs from exams E
    inner join courses C on C.id = E.courseid
    inner join exam_types ET on ET.id = E.examtype
    inner join terms T on T.id = E.examid
    inner join schools S on S.id = E.schoolid
    where C.code = $1 and S.code = $2;
  `;
  client.query(q, [courseCode, schoolCode], (err, result) => {
    if (err) {
      next(err);
      return;
    }
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
    res.json(items);
  });
};

exports.getLabels = (req, res, next) => {
  const q = `select code, name from schools`;
  client.query(q, [], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const items = _.reduce(result.rows, (dict, row) => {
      dict[row.code] = row.name; 
      return dict;
    }, {});
    res.json({
      schools: items 
    });
  });
};

exports.getProfs = (req, res, next) => {
  const { schoolCode, courseCode, examTypeCode, termCode } = req.params;
  const getidq = `
    select E.profs from exams E
    inner join courses C on C.id = E.courseid
    inner join exam_types ET on ET.id = E.examtype
    inner join terms T on T.id = E.examid
    inner join schools S on S.id = E.schoolid
    where S.code = $1 and T.term_code = $2 and ET.type_code = $3 and C.code = $4;
  `;
  client.query(getidq, [schoolCode, termCode, examTypeCode, courseCode], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ profs: result.rows[0].profs });
  });
};
