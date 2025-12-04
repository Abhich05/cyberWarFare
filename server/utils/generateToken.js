const jwt = require('jsonwebtoken');
const { COOKIE_OPTIONS, JWT_EXPIRES_IN } = require('../config/constants');

/**
 * Generate JWT token and set it as HTTP-only cookie
 * @param {Object} res - Express response object
 * @param {String} userId - User's MongoDB _id
 * @returns {String} - Generated token
 */
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.cookie('token', token, COOKIE_OPTIONS);

  return token;
};

/**
 * Clear the authentication cookie
 * @param {Object} res - Express response object
 */
const clearTokenCookie = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
};

module.exports = {
  generateTokenAndSetCookie,
  clearTokenCookie,
};
