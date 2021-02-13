const passport = require('passport');


const google = require('./google');
const signin = require('./signin');
const signup = require('./signup');
const twitter = require('./twitter');
const github = require('./github');

passport.use('local-signin', signin);
passport.use('local-signup', signup);
passport.use('local-google', google);
passport.use('local-twitter', twitter);
passport.use('local-github', github);

module.exports = passport;