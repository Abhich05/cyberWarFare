const { User } = require('../models');
const { asyncHandler, ApiError } = require('../utils/errorHandler');
const { generateTokenAndSetCookie, clearTokenCookie } = require('../utils/generateToken');
const { isValidEmail, validatePassword } = require('../utils/validators');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    throw new ApiError(400, 'Please provide name, email, and password');
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    throw new ApiError(400, passwordValidation.message);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
  });

  // Generate token and set cookie
  const token = generateTokenAndSetCookie(res, user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token, // Include token for Authorization header fallback
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  // Find user with password field
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate token and set cookie
  const token = generateTokenAndSetCookie(res, user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token, // Include token for Authorization header fallback
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * @desc    Verify if user is authenticated
 * @route   GET /api/auth/verify
 * @access  Private
 */
const verifyAuth = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    isAuthenticated: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = {
  signup,
  login,
  logout,
  getMe,
  verifyAuth,
};
