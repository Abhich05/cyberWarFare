const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    pricePaid: {
      type: Number,
      required: [true, 'Price paid is required'],
      min: [0, 'Price paid cannot be negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original price is required'],
    },
    promoCodeUsed: {
      type: String,
      default: null,
    },
    discountApplied: {
      type: Number,
      default: 0,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index to prevent duplicate subscriptions
subscriptionSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Performance: Index for faster lookups
subscriptionSchema.index({ userId: 1, subscribedAt: -1 }); // User's courses sorted by date
subscriptionSchema.index({ courseId: 1 }); // Course subscribers count

// Virtual for discount percentage
subscriptionSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice === 0) return 0;
  return Math.round(((this.originalPrice - this.pricePaid) / this.originalPrice) * 100);
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
