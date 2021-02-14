const express = require('express');
const router = express.Router();
const passport = require('../passport');


router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/home',
  session: true
}));


router.post('/signin', passport.authenticate('signin', {
  successRedirect: '/',
  failureRedirect: '/home',
  session: true
}));

module.exports = router;