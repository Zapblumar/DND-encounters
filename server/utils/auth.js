const jwt = require('jsonwebtoken');

const secret = process.env.secret;
const expiration = '1h';

module.exports = {

  authMiddleware: function (req, res, next) {

    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(401).json({ message: 'invalid token!' });
    }

    next();
  },
  signToken: function ({ userName, userEmail, _id }) {
    const payload = { userName, userEmail, _id };


    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });

  },
};

