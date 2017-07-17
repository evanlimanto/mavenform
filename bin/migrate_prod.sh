export HEROKU_POSTGRESQL_PINK_URL=$PRODUCTION_DATABASE_URL
heroku pg:reset --app mavenform
heroku pg:push mavenform HEROKU_POSTGRESQL_PINK_URL --app mavenform
