const jwt = require('jsonwebtoken');
const errors = require('../services/errors');

const secret = process.env.JWT_SECRET;
const ERROR_NAME = 'UnauthorizedError';
const MESSAGE_NOT_FOUND = 'Token not found';
const MESSAGE_INVALID = 'Expired or invalid token';
const ERROR_STATUS = 401;

const authorization = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return errors(ERROR_NAME, MESSAGE_NOT_FOUND, ERROR_STATUS);

  try {
    const { data } = jwt.verify(token, secret);

    req.user = data;

    next();
  } catch (error) {
    errors(ERROR_NAME, MESSAGE_INVALID, ERROR_STATUS);
  }
};
module.exports = authorization;