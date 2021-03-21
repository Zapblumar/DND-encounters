const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,

} = require('../controllers/user-controller');
const {
  createCharacter,
  getCharacter,

} = require("../controllers/character-controller")
// import middleware
const { authMiddleware } = require('../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/character').post(createCharacter);

router.route('/char').post(getCharacter);


module.exports = router;
