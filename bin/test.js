const program = require('commander');

program
  .version('1.0.0')
  .option('-f --from <from>')
  .option('-t --to <to>')
  .parse(process.argv);

const { from, to } = program;

const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: '../gcp.json',
});

const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');

const fromFile = bucket.file(from);
fromFile.download(function(err, contents) {
  const toFile = bucket.file(to);
  const ws = toFile.createWriteStream({
    predefinedAcl: 'publicRead',
    metadata: {
      contentType: 'image/png'
    }
  });
  ws.on('error', function(err) {
    console.error(err);
  });
  ws.write(contents);
  ws.end();
});
fromFile.delete(function(err, apiResponse) {
  if (err) {
    console.error(err);
  }
});
