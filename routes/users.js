const express = require('express');
const router = express.Router();
const passport = require('../passport');
const User = require('../model/User')

router.post('/signup',
  function (req, res, next) {

    console.log(req.get('Content-Type'))
    next()

  },
  passport.authenticate('local-signup'),
  function (req, res) {

    if (!req.user) { return res.redirect('/signin'); }
    req.logIn(req.user, function (err) {
      if (err) { return next(err); }
      return res.send(req.user)

    });
  })

router.get('/user', (req, res) => {
  console.log(res.body)

  User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
})
router.delete('/deleteUser', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No Friend found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
})

router.post('/signin',
  function (req, res, next) {

    console.log("route", req.body)
    next()

  },
  passport.authenticate('local-signin'),
  (req, res) => {
    User.findOne(req.body.User)
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  })

module.exports = router;