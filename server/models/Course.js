const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Course price is required'],
      min: [0, 'Price cannot be negative'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Course thumbnail is required'],
    },
    duration: {
      type: String,
      required: [true, 'Course duration is required'],
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    modules: {
      type: Number,
      required: [true, 'Number of modules is required'],
      min: [1, 'Course must have at least 1 module'],
    },
    videoUrl: {
      type: String,
      default: null,
    },
    previewVideoId: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for checking if course is free
courseSchema.virtual('isFree').get(function () {
  return this.price === 0;
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
