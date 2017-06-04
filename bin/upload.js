const fs = require('fs');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');

const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: '../gcp.json',
});

const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');

const bucketFile = bucket.file("test.txt");
const ws = bucketFile.createWriteStream();
ws.on('error', function(err) {
  console.error(err);
});
ws.write("data");
ws.end();

/*
const basePath = '../public/exams';
fs.readdir(basePath, function(err, items) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  _.forEach(items, function(course) {
    const dir = path.join(basePath, course);
    if (fs.lstatSync(dir).isDirectory()) {
      const pdfs = path.join(dir, '*-*-+(soln|exam).pdf');
      glob(pdfs, function(err, files) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        _.forEach(files, function(filepath) {
          const filename = _.last(_.split(filepath, '/'));
          const options = {
            destination: `/ucberkeley/${course}/${filename}`,
            predefinedAcl: 'publicRead',
          };
          bucket.upload(filepath, options, function(err, file, apiResponse) {
            if (err) {
              console.error(filepath, err);
            } else {
              console.log("Uploaded file", filepath);
            }
          });
        });
      });
    }
  });
});
*/
