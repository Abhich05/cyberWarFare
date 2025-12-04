const { authMiddleware } = require('./authMiddleware');

// Rate limiting middleware (basic implementation)
const rateLimit = (maxRequests, windowMs) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip).filter((time) => time > windowStart);
    userRequests.push(now);
    requests.set(ip, userRequests);

    if (userRequests.length > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later',
      });
    }

    next();
  };
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

// CORS options handler
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://cyber-war-fare.vercel.app',
      process.env.CLIENT_URL,
    ].filter(Boolean);

    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = {
  rateLimit,
  requestLogger,
  corsOptions,
};
