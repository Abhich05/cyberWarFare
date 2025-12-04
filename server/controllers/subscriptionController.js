const { Subscription, Course } = require('../models');
const { asyncHandler, ApiError } = require('../utils/errorHandler');
const { isValidPromoCode } = require('../utils/validators');
const { PROMO_CODE, DISCOUNT_PERCENTAGE } = require('../config/constants');

/**
 * @desc    Subscribe to a course
 * @route   POST /api/subscribe
 * @access  Private
 */
const subscribe = asyncHandler(async (req, res) => {
  const { courseId, promoCode } = req.body;
  const userId = req.user._id;

  // Validate courseId
  if (!courseId) {
    throw new ApiError(400, 'Course ID is required');
  }

  // Find course
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (!course.isActive) {
    throw new ApiError(400, 'This course is not available for subscription');
  }

  // Check if already subscribed
  const existingSubscription = await Subscription.findOne({
    userId,
    courseId,
  });

  if (existingSubscription) {
    throw new ApiError(400, 'You are already subscribed to this course');
  }

  let pricePaid = course.price;
  let promoCodeUsed = null;
  let discountApplied = 0;

  // If course is paid, handle promo code
  if (course.price > 0) {
    // Promo code is required for paid courses
    if (!promoCode) {
      throw new ApiError(400, 'Promo code is required for paid courses');
    }

    // Validate promo code
    if (!isValidPromoCode(promoCode, PROMO_CODE)) {
      throw new ApiError(400, 'Invalid promo code');
    }

    // Apply discount
    discountApplied = DISCOUNT_PERCENTAGE;
    pricePaid = course.price * (1 - DISCOUNT_PERCENTAGE / 100);
    promoCodeUsed = promoCode.toUpperCase();
  }

  // Create subscription
  const subscription = await Subscription.create({
    userId,
    courseId,
    pricePaid,
    originalPrice: course.price,
    promoCodeUsed,
    discountApplied,
    subscribedAt: new Date(),
  });

  // Populate course details for response
  await subscription.populate('courseId');

  res.status(201).json({
    success: true,
    message: 'Successfully subscribed to course',
    subscription: {
      id: subscription._id,
      course: subscription.courseId,
      pricePaid: subscription.pricePaid,
      originalPrice: subscription.originalPrice,
      discountApplied: subscription.discountApplied,
      promoCodeUsed: subscription.promoCodeUsed,
      subscribedAt: subscription.subscribedAt,
    },
  });
});

/**
 * @desc    Get user's subscribed courses
 * @route   GET /api/my-courses
 * @access  Private
 */
const getMyCourses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscriptions = await Subscription.find({ userId })
    .populate('courseId')
    .sort({ subscribedAt: -1 });

  // Format response
  const myCourses = subscriptions.map((sub) => ({
    subscriptionId: sub._id,
    course: sub.courseId,
    pricePaid: sub.pricePaid,
    originalPrice: sub.originalPrice,
    discountApplied: sub.discountApplied,
    promoCodeUsed: sub.promoCodeUsed,
    subscribedAt: sub.subscribedAt,
  }));

  res.status(200).json({
    success: true,
    count: myCourses.length,
    courses: myCourses,
  });
});

/**
 * @desc    Validate promo code
 * @route   POST /api/validate-promo
 * @access  Public
 */
const validatePromo = asyncHandler(async (req, res) => {
  const { promoCode, courseId } = req.body;

  if (!promoCode) {
    throw new ApiError(400, 'Promo code is required');
  }

  const isValid = isValidPromoCode(promoCode, PROMO_CODE);

  if (!isValid) {
    return res.status(200).json({
      success: true,
      isValid: false,
      message: 'Invalid promo code',
    });
  }

  // If courseId provided, calculate discounted price
  let discountedPrice = null;
  let originalPrice = null;

  if (courseId) {
    const course = await Course.findById(courseId);
    if (course) {
      originalPrice = course.price;
      discountedPrice = course.price * (1 - DISCOUNT_PERCENTAGE / 100);
    }
  }

  res.status(200).json({
    success: true,
    isValid: true,
    discount: DISCOUNT_PERCENTAGE,
    message: `${DISCOUNT_PERCENTAGE}% discount applied!`,
    originalPrice,
    discountedPrice,
  });
});

/**
 * @desc    Check if user is subscribed to a course
 * @route   GET /api/subscription-status/:courseId
 * @access  Private
 */
const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const subscription = await Subscription.findOne({ userId, courseId });

  res.status(200).json({
    success: true,
    isSubscribed: !!subscription,
    subscription: subscription
      ? {
          id: subscription._id,
          pricePaid: subscription.pricePaid,
          subscribedAt: subscription.subscribedAt,
        }
      : null,
  });
});

module.exports = {
  subscribe,
  getMyCourses,
  validatePromo,
  getSubscriptionStatus,
};
