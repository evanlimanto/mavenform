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
  to: 'kevintxwu@gmail.com',
  subject: 'Math 18 Past Exams and Practice Problems',
  html: `
  Hi!
  <br/><br/>
  I’m Kevin. My friends and I are working on a project to help students study for classes like Math 18.
  <br/><br/>
  We took some Math 18 past exams and practice problems and converted them into an interactive format that’s way easier to study from. For most of the problems, we’ve included step-by-step solutions. We’ve even added some other features like discussion and study by topic.
  <br/><br/>
  It’s all FREE. We’re just trying to see how we can make studying easier for everyone. If you’re interested, check it out here: http://www.studyform.com/ucsd
  <br/><br/>
  Feel free to let me know if you have any questions or comments.
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
