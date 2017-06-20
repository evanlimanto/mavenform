// GCP Storage

const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: '../gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');
const url = 'http://cs1331.gatech.edu/summer2017/cs1331-fall2016-exam1.pd'
const path = `gatech/pdf/CS1331/mt1-fa16-exam.pdf`;
const http = require('http');
http.get(url, (response) => {
  const bucketFile = bucket.file(path);
  const ws = bucketFile.createWriteStream({
    public: true,
    metadata: {
      contentType: 'application/pdf',
    }
  }); 
  ws.on('error', function(err) {
    console.error(err);
  });
  ws.on('finish', function() {
    console.log('Finished uploading file', path);
  });
  response.pipe(ws);
  return;
});
