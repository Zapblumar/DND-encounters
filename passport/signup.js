const strategy = require('passport-local').Strategy;
const User = require('../model')

const signupStrategy = new LocalStrategy((userName, password, done) => {
  //to do
});

module.exports = signupStrategy;