export DATABASE_URL=$STAGING_DATABASE_URL
heroku pg:reset --app mavenform-staging
heroku pg:push mavenform DATABASE_URL --app mavenform-staging
