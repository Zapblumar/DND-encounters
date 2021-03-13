const { Strategy } = require('passport-local');
const User = require('../server/model/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)

const signupStrategy = new Strategy({ passReqToCallback: true }, async (req, userName, password, done) => {
  const userEmail = req.body.email;
  console.log('anything')
  try {
    const user = await User.findOne({ $or: [{ userName }, { userEmail }] }).lean()
    if (user) {
      return done('User already exist', null);
    }

    const hidedPassword = bcrypt.hashSync(password, salt);
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