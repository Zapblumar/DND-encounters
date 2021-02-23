const { Strategy } = require('passport-local');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)


const signinStrategy = new Strategy({ passReqToCallback: true }, async (req, userName, userEmail, userPassword, done) => {

  try {
    const user = await User.findOne({ $or: [{ userName }, { userEmail }] }).lean()
      .then(user => {
        console.log("test", user)
        if (!user) {
          return done({ message: 'No user with that user name!' });

        }


        if (req.password !== userPassword) {
          return done({ message: 'Incorrect password!' });

        }

        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.userName = user.username;
          req.session.loggedIn = true;

          done({ user: User, message: 'You are now logged in!' })

        })
      })
  }

  catch (err) {
    console.error(err);
    done(err);
  }
});



module.exports = signinStrategy;