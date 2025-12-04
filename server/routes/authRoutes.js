const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { protect } = require('../middlewares');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.get('/verify', protect, authController.verifyAuth);

module.exports = router;
