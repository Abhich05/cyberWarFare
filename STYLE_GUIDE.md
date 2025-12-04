# 📐 TOP-1% CODING STYLE GUIDE

## Purpose
This guide ensures **consistency, maintainability, and elite quality** across the codebase.

---

## 1️⃣ NAMING CONVENTIONS

### Variables & Functions
```javascript
// ✅ GOOD: camelCase, descriptive names
const userProfile = getUserProfile();
const isAuthenticated = checkAuth();
const totalPrice = calculateTotalPrice(items);

// ❌ BAD: unclear, abbreviations, single letters
const up = getUP();
const auth = check();
const total = calc(i);
```

### Constants
```javascript
// ✅ GOOD: UPPER_SNAKE_CASE for true constants
const MAX_LOGIN_ATTEMPTS = 5;
const API_BASE_URL = 'https://api.example.com';
const PROMO_CODE = 'BFSALE25';

// ✅ GOOD: camelCase for configuration objects
const rateLimitConfig = { windowMs: 15 * 60 * 1000, max: 100 };
```

### Components (React)
```javascript
// ✅ GOOD: PascalCase
const UserProfile = () => { ... };
const CourseCard = ({ course }) => { ... };
const LoadingSpinner = ({ size }) => { ... };

// ❌ BAD: lowercase
const userprofile = () => { ... };
```

### Files
```javascript
// ✅ GOOD: Match component/module name
CourseCard.jsx          // React component
authController.js       // Controller
userService.js          // Service layer
validateEnv.js          // Utility

// ❌ BAD: Generic names
component.jsx
controller.js
utils.js
```

---

## 2️⃣ CODE STRUCTURE

### Function Length
```javascript
// ✅ GOOD: Single responsibility, max 50 lines
const validatePromoCode = (code, validCode) => {
  if (!code) return false;
  return code.toUpperCase() === validCode.toUpperCase();
};

// ❌ BAD: Too long, multiple responsibilities
const processEverything = (data) => {
  // 200 lines of mixed logic
};
```

### Early Returns
```javascript
// ✅ GOOD: Guard clauses at the top
const getUserCourses = async (userId) => {
  if (!userId) throw new ApiError(400, 'User ID required');
  if (!mongoose.isValidObjectId(userId)) throw new ApiError(400, 'Invalid ID');
  
  const courses = await Subscription.find({ userId });
  return courses;
};

// ❌ BAD: Nested if statements
const getUserCourses = async (userId) => {
  if (userId) {
    if (mongoose.isValidObjectId(userId)) {
      const courses = await Subscription.find({ userId });
      return courses;
    }
  }
};
```

### DRY Principle (Don't Repeat Yourself)
```javascript
// ✅ GOOD: Extract reusable logic
const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

const signup = async (req, res) => {
  const user = await User.create(req.body);
  res.json({ success: true, user: formatUserResponse(user) });
};

// ❌ BAD: Duplicated logic
const signup = async (req, res) => {
  const user = await User.create(req.body);
  res.json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email }
  });
};

const login = async (req, res) => {
  // Same formatting logic duplicated
};
```

---

## 3️⃣ COMMENTS & DOCUMENTATION

### JSDoc for Functions
```javascript
/**
 * Subscribe user to a course with optional promo code
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.courseId - MongoDB course ID
 * @param {string} [req.body.promoCode] - Optional promo code
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @throws {ApiError} 404 if course not found
 * @throws {ApiError} 400 if already subscribed
 */
const subscribe = asyncHandler(async (req, res) => {
  // Implementation
});
```

### Inline Comments
```javascript
// ✅ GOOD: Explain WHY, not WHAT
// Prevent race condition when checking subscription status
const session = await mongoose.startSession();

// ❌ BAD: Stating the obvious
// Create variable for user ID
const userId = req.user._id;
```

### TODO Comments
```javascript
// ✅ GOOD: Actionable, dated, assigned
// TODO(2025-12-15, @john): Add email notification after subscription
// FIXME(2025-12-10, @sarah): Race condition in promo validation - need atomic operation

// ❌ BAD: Vague, no context
// TODO: fix this
// HACK: temporary solution
```

---

## 4️⃣ ERROR HANDLING

### Always Use Try-Catch with Async
```javascript
// ✅ GOOD: Wrapped in asyncHandler or try-catch
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.json({ success: true, courses });
});

// ❌ BAD: Unhandled promise rejection
const getCourses = async (req, res) => {
  const courses = await Course.find(); // Can throw error!
  res.json({ success: true, courses });
};
```

### Meaningful Error Messages
```javascript
// ✅ GOOD: Specific, actionable
throw new ApiError(400, 'Email is already registered. Please use a different email or login.');

// ❌ BAD: Generic, unhelpful
throw new Error('Invalid input');
```

### Don't Swallow Errors
```javascript
// ✅ GOOD: Log and handle
try {
  await sendEmail(user.email);
} catch (error) {
  logger.error('Failed to send welcome email:', error);
  // Continue without blocking signup
}

// ❌ BAD: Silent failure
try {
  await sendEmail(user.email);
} catch (error) {
  // Ignored!
}
```

---

## 5️⃣ REACT BEST PRACTICES

### Component Structure
```jsx
// ✅ GOOD: Consistent order
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CourseCard = ({ course, onEnroll }) => {
  // 1. Hooks
  const [loading, setLoading] = useState(false);
  
  // 2. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 3. Event handlers
  const handleClick = () => {
    // Logic
  };
  
  // 4. Early returns
  if (!course) return null;
  
  // 5. Render
  return (
    <div>{course.title}</div>
  );
};

// 6. PropTypes
CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  onEnroll: PropTypes.func,
};

export default CourseCard;
```

### Custom Hooks
```javascript
// ✅ GOOD: Prefix with 'use', return consistent shape
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Usage
const debouncedSearch = useDebounce(searchTerm, 500);
```

### Avoid Prop Drilling
```jsx
// ✅ GOOD: Use Context for deeply nested data
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ❌ BAD: Passing props through 5 levels
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />
    </GrandChild>
  </Child>
</Parent>
```

---

## 6️⃣ DATABASE QUERIES

### Use Lean Queries
```javascript
// ✅ GOOD: lean() for read-only data (faster)
const courses = await Course.find().lean();

// ❌ BAD: Full Mongoose documents when not needed
const courses = await Course.find(); // Returns heavy objects
```

### Select Only Needed Fields
```javascript
// ✅ GOOD: Project only required fields
const users = await User.find().select('name email').lean();

// ❌ BAD: Select everything including password
const users = await User.find();
```

### Use Indexes
```javascript
// ✅ GOOD: Index frequently queried fields
userSchema.index({ email: 1 });
subscriptionSchema.index({ userId: 1, courseId: 1 });

// ❌ BAD: No indexes, slow queries at scale
```

---

## 7️⃣ SECURITY RULES

### Never Trust User Input
```javascript
// ✅ GOOD: Validate and sanitize
const sanitizeInput = (input) => input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');

const createUser = async (req, res) => {
  const name = sanitizeInput(req.body.name);
  const email = sanitizeInput(req.body.email);
  // ...
};

// ❌ BAD: Direct use of user input
const createUser = async (req, res) => {
  const user = await User.create(req.body); // Vulnerable!
};
```

### Secrets in Environment Variables
```javascript
// ✅ GOOD: Use .env
const JWT_SECRET = process.env.JWT_SECRET;

// ❌ BAD: Hardcoded secrets
const JWT_SECRET = 'my-secret-key-123'; // NEVER DO THIS!
```

### Secure Password Hashing
```javascript
// ✅ GOOD: bcrypt with 12+ rounds
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash(password, salt);

// ❌ BAD: Low salt rounds or plain text
const hashedPassword = await bcrypt.hash(password, 4); // Too weak!
```

---

## 8️⃣ GIT COMMIT MESSAGES

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting, missing semi-colons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests
- **chore**: Updating build tasks, package manager configs, etc.
- **security**: Security-related changes

### Examples
```bash
# ✅ GOOD: Clear, descriptive
feat(auth): add JWT refresh token rotation
fix(courses): resolve race condition in promo validation
security(auth): upgrade bcrypt to prevent timing attacks
perf(db): add compound indexes on Subscription model

# ❌ BAD: Vague, unhelpful
update stuff
fix bug
changes
WIP
```

---

## 9️⃣ TESTING STANDARDS

### Test File Naming
```
src/
├── controllers/
│   └── authController.js
└── __tests__/
    └── authController.test.js  ✅ GOOD: Matches source file
```

### Test Structure
```javascript
describe('authController', () => {
  describe('signup', () => {
    it('should create user with valid input', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@example.com', password: 'Test1234' };
      
      // Act
      const result = await authController.signup(userData);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.user.email).toBe('test@example.com');
    });
    
    it('should reject weak passwords', async () => {
      const userData = { name: 'Test', email: 'test@example.com', password: '123' };
      
      await expect(authController.signup(userData))
        .rejects
        .toThrow('Password must be at least 8 characters');
    });
  });
});
```

---

## 🔟 DEPLOYMENT CHECKLIST

### Before Every Deploy
- [ ] All tests passing
- [ ] No console.log in production code
- [ ] Environment variables validated
- [ ] Database migrations run
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Error tracking active (Sentry)
- [ ] Logs properly configured
- [ ] Health check endpoint working
- [ ] README updated with new features

---

## 📊 CODE REVIEW CHECKLIST

### Before Submitting PR
- [ ] Code follows style guide
- [ ] Tests added for new features
- [ ] No commented-out code
- [ ] No debug statements (console.log)
- [ ] Error handling in place
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance optimized
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] Responsive design tested

### As Reviewer
- [ ] Code logic is clear and correct
- [ ] Tests cover edge cases
- [ ] No obvious security flaws
- [ ] Performance implications considered
- [ ] Code reusability maximized
- [ ] Naming conventions followed
- [ ] Error messages are helpful
- [ ] Database queries optimized

---

## 🎯 QUALITY METRICS

### Code Coverage
- **Minimum:** 70%
- **Target:** 80%
- **Excellent:** 90%+

### Bundle Size (Frontend)
- **Excellent:** < 200KB initial
- **Good:** < 400KB initial
- **Needs Optimization:** > 500KB

### API Response Time
- **Excellent:** < 100ms
- **Good:** < 300ms
- **Needs Optimization:** > 500ms

### Lighthouse Score
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 90+

---

## 💡 REMEMBER

1. **"Code is read more than it's written"** - Optimize for readability
2. **"Premature optimization is the root of all evil"** - Make it work, then make it fast
3. **"If it's not tested, it's broken"** - Write tests
4. **"Security is not a feature, it's a requirement"** - Always validate input
5. **"Document the why, not the what"** - Comments should explain reasoning

---

<p align="center">
  <strong>Follow this guide to maintain top-1% code quality!</strong>
</p>
