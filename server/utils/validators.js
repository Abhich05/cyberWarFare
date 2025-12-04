/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {String} password - Password to validate
 * @returns {Object} - { isValid: Boolean, message: String }
 */
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }
  
  // Optional: Add complexity requirements
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!(hasUpperCase && hasLowerCase && hasNumber)) {
    return {
      isValid: false,
      message: 'Password must contain uppercase, lowercase, and numbers',
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Sanitize string input to prevent XSS
 * @param {String} input - Input to sanitize
 * @returns {String} - Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
};

/**
 * Validate promo code
 * @param {String} promoCode - Promo code to validate
 * @param {String} validCode - Valid promo code from constants
 * @returns {Boolean}
 */
const isValidPromoCode = (promoCode, validCode) => {
  return promoCode && promoCode.toUpperCase() === validCode.toUpperCase();
};

module.exports = {
  isValidEmail,
  validatePassword,
  isValidPromoCode,
  sanitizeInput,
};
