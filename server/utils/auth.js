const jwt = require('jsonwebtoken');

const secret = process.env.secret;
const expiration = '1h';

module.exports = {

  authMiddleware: function ({ req }) {

    const token = req.query.token || req.headers.authorization?.split(' ').pop().trim();

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch { }

    return req;
  },
  signToken: function ({ userName, userEmail, _id }) {
    const payload = { userName, userEmail, _id };


    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });

  },
};

