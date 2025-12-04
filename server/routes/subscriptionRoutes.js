const express = require('express');
const router = express.Router();
const { subscriptionController } = require('../controllers');
const { protect } = require('../middlewares');

// Protected routes
router.post('/subscribe', protect, subscriptionController.subscribe);
router.get('/my-courses', protect, subscriptionController.getMyCourses);
router.get('/subscription-status/:courseId', protect, subscriptionController.getSubscriptionStatus);

// Public routes
router.post('/validate-promo', subscriptionController.validatePromo);

module.exports = router;
