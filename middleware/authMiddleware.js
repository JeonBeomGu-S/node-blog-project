const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Utils = require('../util/utils');

dotenv.config();

module.exports = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    return next();
  } catch (err) {
    res.clearCookie('token');
    if (err.name === 'JsonWebTokenError') {
      const err = Utils.createError(401, 'AUTH001');
      return res.status(401).json(err);
    }
    if (err.name === 'TokenExpiredError') {
      const err = Utils.createError(419, 'AUTH002');
      return res.status(419).json(err);
    }
  }
};
