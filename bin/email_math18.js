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
  from: 'Kevin Wu <kevin@studyform.com>',
  to: 'kevin@studyform.com',
  subject: 'Math 18 Past Exams and Practice Problems',
  html: `
  Hi!
  <br/><br/>
  Do you need any Math 18 past exams or practice problems to study from?
  <br/><br/>
  A group of other students and I took some past exams and converted them into an interactive format that’s way easier to study from. For the exams we could, we even added solution walkthroughs. We added discussion on top of the exams and a directory of problems sorted by topic.
  <br/><br/>
  It’s all FREE. We’re just trying to see how we can make studying less painful. Check it out at: http://studyform.com/ucsd/MATH18
  <br/><br/>
  Feel free to let me know if you have any questions or feedback.
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
