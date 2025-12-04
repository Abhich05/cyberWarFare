const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { asyncHandler, ApiError } = require('../utils/errorHandler');

/**
 * Authentication middleware
 * Verifies JWT from HTTP-only cookie or Authorization header
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Debug: Log cookies received
  console.log('Cookies received:', req.cookies);
  console.log('Origin:', req.headers.origin);

  // Check for token in HTTP-only cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Not authorized, invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Not authorized, token expired');
    }
    throw error;
  }
});

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't block if no token
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (error) {
      // Token is invalid, but we continue without user
      req.user = null;
    }
  }

  next();
});

module.exports = {
  protect,
  optionalAuth,
};
