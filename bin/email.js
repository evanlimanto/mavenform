const api_key = 'key-55424568d6fba5e1b922f7aedb80543b';
const domain = 'mg.studyform.com';
const request = require('request');
/*
const options = {
  method: 'POST',
  url: 'https://api.mailgun.net/v3/lists/waitlist@mg.studyform.com/members',
  auth: {
    user: 'api',
    pass: 'key-55424568d6fba5e1b922f7aedb80543b',
  },
  form: { address: "evanlimanto@berkeley.edu", upsert: "yes", subscribed: true }
};

request(options, (err, response, body) => {
  console.log(err, response, body);
});
*/
const data = {
  from: 'Kevin Wu <kevintxwu@berkeley.edu>',
  to: 'kevin@studyform.com',
  subject: 'Math 18 Past Exams and Practice Problems',
  html: `
  Hi there,
  <br/><br/>
  Do you need past exams and practice problems to study from for Math 18?
  <br/><br/>
  A group of students and I took some past exams and converted them into an interactive format that’s way easier to study form. For the exams we could, we even added solution walkthroughs. We added mobile-friendliness, discussion, and a directory of problems sorted by topic.
  <br/><br/>
  We’re trying our best to help make studying less painful as a student. You can check out our project at: http://studyform.com/ucsandiego/MATH18
  <br/><br/>
  Feel free to let me know if you have any feedback or questions.
  <br/><br/>
  Best,<br/>
  Kevin
  `,
};

const options = {
  url: 'https://api.mailgun.net/v3/' + domain + '/messages',
  method: 'POST',
  auth: {
    user: 'api',
    pass: api_key,
  },
  form: data,
};

request.post(options, (err, response, body) => {
  console.log(err, body);
});
