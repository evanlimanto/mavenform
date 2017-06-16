const request = require('request');
// curl --request POST --url '' --user 'anystring:e2480866e411bcc372882f3bb98f4483-us16' -H 'content-type: application/json' --data '{"members": [{"email_address": "evan@studyform.com", "status": "subscribed"}]}

const options = {
  method: 'POST',
  url: 'https://us16.api.mailchimp.com/3.0/lists/bf5797b1e4',
  auth: {
    'user': 'anystring',
    'pass': 'e2480866e411bcc372882f3bb98f4483-us16',
  },
  json: {
    members: [{
      email_address: 'evanlimanto@gmail.com',
      status: 'subscribed',
    }],
    update_existing: true,
  }
};
request(options, (err, response, body) => {
  console.log(body);
});

