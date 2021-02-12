const strategy = require('passport-local').Strategy;


const signinStrategy = new LocalStrategy((userName, password, done) => {
  //to do
});

module.exports = signinStrategy;