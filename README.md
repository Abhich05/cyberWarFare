# 🎉 Black Friday Course Hub

A full-stack MERN (MongoDB, Express, React, Node.js) application for a mini course subscription platform with Black Friday promotional deals.

![Black Friday Course Hub](https://via.placeholder.com/1200x600/dc2626/ffffff?text=Black+Friday+Course+Hub)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Demo Credentials](#-demo-credentials)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)

## ✨ Features

### User Features
- 🔐 **Authentication**: Secure signup/login with JWT stored in HTTP-only cookies
- 📚 **Course Browsing**: View all available courses with details
- 💰 **Subscription**: Subscribe to free courses instantly
- 🏷️ **Promo Codes**: Apply "BFSALE25" for 50% discount on paid courses
- 📖 **My Courses**: View all subscribed courses with purchase history
- 🎨 **Modern UI**: Beautiful dark theme with responsive design

### Technical Features
- ✅ MVC Architecture
- ✅ JWT Authentication with HTTP-only cookies
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Form validation (frontend & backend)
- ✅ Toast notifications
- ✅ Loading skeletons
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Cookie Handling**: cookie-parser

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## 📁 Project Structure

```
cyberWarFare/
├── server/                    # Backend
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── constants.js      # App constants & mock data
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── subscriptionController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── commonMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   └── subscriptionRoutes.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── generateToken.js
│   │   └── validators.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── client/                    # Frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useForm.js
│   │   │   └── useFetch.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── MyCourses.jsx
│   │   │   └── NotFound.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cyberWarFare
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Create .env file (optional)
cp .env.example .env
```

4. **Run the Application**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

5. **Seed the Database**
```bash
cd server
npm run seed
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bf-course-hub
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=/api
```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/verify` | Verify auth status | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | No |
| GET | `/api/courses/:id` | Get course by ID | No |
| POST | `/api/courses/seed` | Seed mock courses | No |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/subscribe` | Subscribe to course | Yes |
| GET | `/api/my-courses` | Get user's courses | Yes |
| POST | `/api/validate-promo` | Validate promo code | No |
| GET | `/api/subscription-status/:courseId` | Check subscription | Yes |

### Request/Response Examples

#### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Response (201)
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Subscribe with Promo
```bash
POST /api/subscribe
Content-Type: application/json
Cookie: token=<jwt_token>

{
  "courseId": "...",
  "promoCode": "BFSALE25"
}

# Response (201)
{
  "success": true,
  "message": "Successfully subscribed to course",
  "subscription": {
    "id": "...",
    "course": {...},
    "pricePaid": 99.99,
    "originalPrice": 199.99,
    "discountApplied": 50,
    "promoCodeUsed": "BFSALE25",
    "subscribedAt": "2025-12-01T..."
  }
}
```

## 👤 Demo Credentials

| Email | Password | Description |
|-------|----------|-------------|
| demo@example.com | demo123 | Demo user account |
| test@example.com | test123 | Test user account |

**Promo Code**: `BFSALE25` (50% discount)

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
6. Deploy!

### Frontend (Netlify)

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import repository
4. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Add `_redirects` file in `client/public`:
   ```
   /*    /index.html   200
   ```
6. Add environment variables and deploy

### Backend (Render)

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-production-secret
   CLIENT_URL=https://your-frontend-url.com
   ```
6. Deploy!

### Backend (Railway)

1. Push code to GitHub
2. Go to [Railway](https://railway.app)
3. Create new project from GitHub
4. Select the server directory
5. Add environment variables
6. Deploy!

### Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all IPs)
5. Get connection string
6. Update MONGODB_URI in backend

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x500/27272a/ffffff?text=Home+Page)

### Course Detail
![Course Detail](https://via.placeholder.com/800x500/27272a/ffffff?text=Course+Detail)

### My Courses
![My Courses](https://via.placeholder.com/800x500/27272a/ffffff?text=My+Courses)

### Login/Signup
![Login](https://via.placeholder.com/800x500/27272a/ffffff?text=Login+Page)

## 🔮 Future Enhancements

- [ ] Real payment integration (Stripe/PayPal)
- [ ] Course video content hosting
- [ ] Progress tracking
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Course reviews & ratings
- [ ] Email notifications
- [ ] Social authentication (Google, GitHub)
- [ ] Course search & filters
- [ ] Wishlist feature
- [ ] Multiple promo codes support
- [ ] Course certificates

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<p align="center">
  Made with ❤️ for Black Friday Deals
</p>
