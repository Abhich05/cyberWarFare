/**
 * Environment variable validator
 * Validates all required environment variables on startup
 * Fails fast if critical configuration is missing
 */

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'CLIENT_URL',
];

const optionalEnvVars = [
  'LOG_LEVEL',
  'SENTRY_DSN',
  'REDIS_URL',
];

/**
 * Validate environment variables
 * @throws {Error} If any required variable is missing
 */
const validateEnv = () => {
  const missing = [];
  const warnings = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check JWT secret strength (production only)
  if (process.env.NODE_ENV === 'production') {
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      warnings.push('JWT_SECRET should be at least 32 characters in production');
    }
    
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('localhost')) {
      warnings.push('Using localhost MongoDB in production is not recommended');
    }
  }

  // Print warnings
  if (warnings.length > 0) {
    console.warn('\n⚠️  Environment Configuration Warnings:');
    warnings.forEach((warning) => console.warn(`   - ${warning}`));
  }

  // Fail if required variables are missing
  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missing.forEach((envVar) => console.error(`   - ${envVar}`));
    console.error('\nPlease check your .env file and ensure all required variables are set.\n');
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully\n');
};

/**
 * Get validated environment variables
 * @returns {Object} Validated environment config
 */
const getConfig = () => {
  return {
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,
    mongodb_uri: process.env.MONGODB_URI,
    jwt_secret: process.env.JWT_SECRET,
    client_url: process.env.CLIENT_URL,
    log_level: process.env.LOG_LEVEL || 'info',
    sentry_dsn: process.env.SENTRY_DSN || null,
    is_production: process.env.NODE_ENV === 'production',
    is_development: process.env.NODE_ENV === 'development',
  };
};

module.exports = {
  validateEnv,
  getConfig,
};
