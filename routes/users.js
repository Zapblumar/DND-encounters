const express = require('express');
const router = express.Router();
const passport = require('../dnd/passport');
const User = require('../model/User')

router.post('/signup',

  passport.authenticate('local-signup'),
  function (req, res) {

    if (!req.user) { return res.redirect('/signin'); }
    req.logIn(req.user, function (err) {
      if (err) { return next(err); }
      return res.redirect(req.user.userName);
    });
  })//(req, res, next);

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

router.post('/signin', passport.authenticate('signin', {
  successRedirect: '/',
  failureRedirect: '/home',
  session: true
}));

module.exports = router;