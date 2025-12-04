const { protect, optionalAuth } = require('./authMiddleware');
const { rateLimit, requestLogger, corsOptions } = require('./commonMiddleware');

module.exports = {
  protect,
  optionalAuth,
  rateLimit,
  requestLogger,
  corsOptions,
};
