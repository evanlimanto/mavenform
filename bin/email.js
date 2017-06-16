const api_key = 'key-55424568d6fba5e1b922f7aedb80543b';
const domain = 'mg.studyform.com';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

const data = {
  from: 'Test User <test@studyform.com>',
  to: 'evan@studyform.com',
  subject: 'Hello World!',
  text: 'Testing Mailgun Hello World!',
};

mailgun.messages().send(data, (err, body) => {
  console.log(body);
});
