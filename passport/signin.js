const { Strategy } = require('passport-local');
const passport = require('passport');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)



const signinStrategy = new Strategy({ passReqToCallback: true }, async (req, userName, userPassword, done) => {

  try {
    let user = await User.findOne({ $or: [{ userName }, { userPassword }] }).lean()
    if (!user) {
      return done('Not an user or bad password!!!');
    }
    if (req.password === userPassword) {
      return done('Not an user or bad password!!!');
    }
    done(null, user)

  }

  catch (err) {
    console.error(err, "error");
    done(err);
  }

});



module.exports = signinStrategy;