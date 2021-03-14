
const passport = require('passport');
const User = require('../model/User');

//const google = require('./google');
const signin = require("./signin");
const signup = require("./signup");
//const twitter = require('./twitter');
//const github = require('./github');

passport.use("local-signin", signin);
passport.use("local-signup", signup);
// passport.use('local-google', google);
// passport.use('local-twitter', twitter);
// passport.use('local-github', github);
passport.serializeUser(async (user, done) => {
  console.log(user._id);
  await done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const users = await User.findById(id, function (err, user) {
    done(err, user);
  });
  return users;
});
module.exports = passport;
