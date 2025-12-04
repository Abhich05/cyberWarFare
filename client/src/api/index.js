import api from './axios';

/**
 * Auth API endpoints
 */
export const authAPI = {
  /**
   * Register a new user
   * @param {Object} data - { name, email, password }
   */
  signup: async (data) => {
    return api.post('/auth/signup', data);
  },

  /**
   * Login user
   * @param {Object} data - { email, password }
   */
  login: async (data) => {
    return api.post('/auth/login', data);
  },

  /**
   * Logout user
   */
  logout: async () => {
    return api.post('/auth/logout');
  },

  /**
   * Get current user profile
   */
  getMe: async () => {
    return api.get('/auth/me');
  },

  /**
   * Verify authentication status
   */
  verify: async () => {
    return api.get('/auth/verify');
  },
};

/**
 * Courses API endpoints
 */
export const coursesAPI = {
  /**
   * Get all courses
   */
  getAll: async () => {
    return api.get('/courses');
  },

  /**
   * Get course by ID
   * @param {string} id - Course ID
   */
  getById: async (id) => {
    return api.get(`/courses/${id}`);
  },

  /**
   * Seed courses (development)
   */
  seed: async () => {
    return api.post('/courses/seed');
  },
};

/**
 * Subscription API endpoints
 */
export const subscriptionAPI = {
  /**
   * Subscribe to a course
   * @param {Object} data - { courseId, promoCode? }
   */
  subscribe: async (data) => {
    return api.post('/subscribe', data);
  },

  /**
   * Get user's subscribed courses
   */
  getMyCourses: async () => {
    return api.get('/my-courses');
  },

  /**
   * Validate promo code
   * @param {Object} data - { promoCode, courseId? }
   */
  validatePromo: async (data) => {
    return api.post('/validate-promo', data);
  },

  /**
   * Check subscription status for a course
   * @param {string} courseId - Course ID
   */
  getStatus: async (courseId) => {
    return api.get(`/subscription-status/${courseId}`);
  },
};

export { api };
