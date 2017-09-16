const url = require("url");
const pg = require("pg");

// Mailgun
const mg_api_key = 'key-55424568d6fba5e1b922f7aedb80543b';
const mg_domain = 'mg.studyform.com';
const mg_options = {
  url: 'https://api.mailgun.net/v3/' + mg_domain + '/messages',
  method: 'POST',
  auth: {
    user: 'api',
    pass: mg_api_key,
  },
};

// GCP Storage
const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: './gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');
const stagingBucket = gcs.bucket('studyform-staging');
const marketingBucket = gcs.bucket('studyform-marketing');
const uploadsBucket = gcs.bucket('studyform-uploads');

// Postgres
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: (process.env.NODE_ENV !== 'development') || (process.env.USER === 'kevinwu'),
};
const pool = new pg.Pool(config);

// Stripe
const stripe = require("stripe")(process.env.NODE_ENV === "development" ? "sk_test_Uhws7IVVHLISzBQUQZckgbho" : "sk_live_dYbYDw2eyxN2DHB1jm8h4Rol");

module.exports = {
  mg_options, mg_api_key, mg_domain, marketingBucket, stagingBucket, uploadsBucket, bucket, pool, stripe
}
