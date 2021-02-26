const { Strategy } = require('passport-local');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)


const signinStrategy = new Strategy({ passReqToCallback: true }, async (req, userName, userPassword, done) => {

  try {
    const user = await User.findOne({ $or: [{ userName }, { userPassword }] }).lean()
      .then(user => {

        if (!user) {
          return done('Not an user or bad password!!!');

        }
        if (req.password === userPassword) {
          return done('Not an user or bad password!!!');

        }
        console.log("test", user)
        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.userName = user.username;
          req.session.loggedIn = true;

          done(userName, 'You are now logged in!')

        })
      })
  }

  catch (err) {
    console.error(err, "error");
    done(err);
  }
});



module.exports = signinStrategy;