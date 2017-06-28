const pg = require("pg");
const request = require("request");
const _ = require("lodash");
const rs = require("randomstring");

const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: '../gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');

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

const q = `
  select E.id, ET.type_code as type_code, T.term_code as term_code, C.code as course_code from exams E
  inner join exam_types ET on E.examtype = ET.id
  inner join terms T on E.examid = T.id
  inner join courses C on E.courseid = C.id
`;

client.query(q, (err, result) => {
  if (err) return console.error(err);
  _.forEach(result.rows, (row) => {
    const newCode = rs.generate(10);
    const url = `https://storage.googleapis.com/studyform/ucberkeley/pdf/${row.course_code}/${row.type_code}-${row.term_code}-soln.pdf`;
    const newURL = `https://storage.googleapis.com/studyform/ucberkeley/pdf/${row.course_code}/${row.type_code}-${row.term_code}-${newCode}.pdf`;
    const filePath = `ucberkeley/pdf/${row.course_code}/${row.type_code}-${row.term_code}-soln.pdf`;
    const newFilePath = `ucberkeley/pdf/${row.course_code}/${row.type_code}-${row.term_code}-${newCode}.pdf`;
    return request(url, (err, response, body) => {
      if (response.statusCode !== 404) {
        const q = `update exams set source_url = $1 where id = $2`;
        const file = bucket.file(filePath);
        const newFile = bucket.file(newFilePath);
        console.log(filePath);
        file.move(newFile, (err) => {
          if (err) return console.error(filePath, err);
          console.log("Success!");
          client.query(q, [newURL, row.id], (err, result) => {
            if (err) return console.error(err);
            console.log(result);
          });
        });
      }
    });
  });
});
