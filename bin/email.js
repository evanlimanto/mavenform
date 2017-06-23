const api_key = 'key-55424568d6fba5e1b922f7aedb80543b';
const domain = 'mg.studyform.com';
const request = require('request');

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
/*
const data = {
  from: 'Test User <test@studyform.com>',
  to: 'evan@studyform.com',
  subject: 'Hello World!',
  html: 'Testing Mailgun Hello World!',
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
*/
