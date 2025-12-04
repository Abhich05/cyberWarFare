const { Course } = require('../models');
const { asyncHandler, ApiError } = require('../utils/errorHandler');

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isActive: true })
    .select('-__v')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id).select('-__v');

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (!course.isActive) {
    throw new ApiError(404, 'Course is not available');
  }

  res.status(200).json({
    success: true,
    course,
  });
});

/**
 * @desc    Create a new course (Admin only - for seeding)
 * @route   POST /api/courses
 * @access  Private/Admin
 */
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    duration,
    instructor,
    level,
    modules,
  } = req.body;

  const course = await Course.create({
    title,
    description,
    price,
    thumbnail,
    duration,
    instructor,
    level,
    modules,
  });

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    course,
  });
});

/**
 * @desc    Seed courses from mock data
 * @route   POST /api/courses/seed
 * @access  Public (for development)
 */
const seedCourses = asyncHandler(async (req, res) => {
  const { MOCK_COURSES } = require('../config/constants');

  // Check if courses already exist
  const existingCount = await Course.countDocuments();

  if (existingCount > 0) {
    return res.status(200).json({
      success: true,
      message: 'Courses already seeded',
      count: existingCount,
    });
  }

  // Seed courses
  const courses = await Course.insertMany(MOCK_COURSES);

  res.status(201).json({
    success: true,
    message: 'Courses seeded successfully',
    count: courses.length,
    courses,
  });
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  seedCourses,
};
