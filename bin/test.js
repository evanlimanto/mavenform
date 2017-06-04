// GCP Storage
const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: '../gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');
const stagingBucket = gcs.bucket('studyform-staging');

const pg = require('pg');
const async = require('async');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const imageq = `select url from images_staging where examid = $1`;

client.query(imageq, [45], (err, result) =>
  async.forEach(result.rows, (row, callback) => {
    const sourceFile = stagingBucket.file(row.url);
    console.log(sourceFile);
  }, (err) => {
    console.error('callback', err); 
  })
);


/*
client.query(imageq, [45], (err, result) => {
  _.forEach(result.rows, (row) => {
    const sourceFile = stagingBucket.file(row.url);
    sourceFile.move(bucket, (err, destFile, resp) => {
      if (err) return console.error(err);
      else {
        destFile.makePublic((err, resp) => {
          if (err) console.error(err);
        })
      }
    });
  });
});
*/
