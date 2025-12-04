const express = require('express');
const router = express.Router();
const { courseController } = require('../controllers');

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Seed route (for development/initialization)
router.post('/seed', courseController.seedCourses);

module.exports = router;
