const { Strategy } = require('passport-local');
const User = require('../model/User');
const bcrypt = require('bcrypt');


const signupStrategy = new Strategy({ passReqToCallback: true }, async (req, userName, password, done) => {
  const userEmail = req.body.email;
  console.log('anything')
  try {
    const user = await User.findOne({ $or: [{ userName }, { userEmail }] }).lean()
    if (user) {
      return done('User already exist', null);
    }

    const hidedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      userName,
      userEmail,
      userPassword: hidedPassword
    });

    done(null, newUser)
  } catch (err) {
    console.error(err);
    done(err);
  }
});

module.exports = signupStrategy;