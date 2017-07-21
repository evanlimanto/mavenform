const pg = require("pg");
const async = require("async");
const _ = require("lodash");
const req = require("superagent");

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

/*
req.get("https://mavenform.auth0.com/api/v2/users/auth0|595c12640f8c1f7ef106495a")
  .set("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUTXdOemhDTlVORk5EZEdPVGc1UlRZM09VRkRNekEwTVVFMk5FUTJNakZDUmpKR1JqQXhNQSJ9.eyJpc3MiOiJodHRwczovL21hdmVuZm9ybS5hdXRoMC5jb20vIiwic3ViIjoib0xLQVRnWG53dEREbjhUd3ljdkFwVkdFQ2ZCeDJabHFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbWF2ZW5mb3JtLmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNTAwNzAxNDYxLCJpYXQiOjE1MDA2MTUwNjEsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIn0.RlZ1xHJsRY3YU5kmDygm__3Cd2a5oOK7vSj_A_Feq_ULYgQTRrNK6yuXFd8x4MgAexkByyX_IYgUEFw8itnNO5fEbDdN124dOR_0djY2b1VTqwxsZ7shj8_kBdYItmuTttV8KH1PaQ8BraikPqtoz_RkpoAehhKalIQt1FfRZ-jR1fQL3eacpFHssIfq8rlWSOH5eE1oWqUMN8FwNEiJYY2s0sgqz91bGhDTccnbpv02UEGJLe3vM7cCMYUMEL293Ykz9NKPkRGA7yJ-3eqKudyB8EZ1Ib8xkp9Pudn-6EJRNnfX5YS7PelM7y0xMWDh97CgQQJXfibBBvZIFhaqLw")
  .end((err, res) => {
    console.log(res.body);
  });
*/

const getq = "select * from users";
const upq = `update users set email = $1 where id = $2`;
const client = new pg.Client(config);
client.connect();

async.waterfall([
  (callback) => req.post("https://mavenform.auth0.com/oauth/token")
    .set("Content-Type", "application/json")
    .send('{"grant_type":"client_credentials","client_id": "oLKATgXnwtDDn8TwycvApVGECfBx2Zlq","client_secret": "YK9zxrgWAq4-6MJDB_xTV0te_7hQ92IuCZ0YZEZF0D5hvcgPwRFIJKfDv5PqhQ4Z","audience": "https://mavenform.auth0.com/api/v2/"}')
    .end(callback),
], (err, result) => {
  const token = result.body.access_token;
  client.query(getq, (err, result) => {
    _.forEach(result.rows, (row) => {
      req.get("https://mavenform.auth0.com/api/v2/users/" + row.auth_user_id)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          if (res.body.email) {
            client.query(upq, [res.body.email, row.id], (err, result) => console.log(result));
          }
        });
    });
  });
});

