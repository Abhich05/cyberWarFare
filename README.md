# 🛡️ CyberWarFare Labs

A full-stack MERN application for a cybersecurity course subscription platform featuring Black Friday promotional deals.

![CyberWarFare Labs](https://img.shields.io/badge/CyberWarFare-Labs-red?style=for-the-badge&logo=shield&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [cyber-war-fare.vercel.app](https://cyber-war-fare.vercel.app) |
| **Backend API** | [cyberwarfare.onrender.com](https://cyberwarfare.onrender.com) |

> ⚠️ **Note**: Backend is hosted on Render's free tier and may take ~30 seconds to wake up on first request.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)

---

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT with HTTP-only cookies + Authorization header fallback
- 📚 **Course Catalog** - Browse cybersecurity courses from CyberWarFare Labs
- 🎥 **Video Previews** - YouTube video integration for course previews
- 💰 **Instant Subscription** - Subscribe to free courses instantly
- 🏷️ **Promo Codes** - Apply `BFSALE25` for 50% off paid courses
- 📖 **My Courses** - Track subscribed courses with purchase history
- 🍪 **Cookie Consent** - GDPR-compliant cookie notice
- 🎨 **Premium UI** - Dark theme with animations (Framer Motion)

### Technical Features
- ✅ MVC Architecture with clean separation of concerns
- ✅ Dual auth system (cookies + localStorage fallback)
- ✅ Password hashing with bcrypt (8+ chars, complexity rules)
- ✅ Protected API routes with middleware
- ✅ Form validation (frontend & backend)
- ✅ Toast notifications (react-hot-toast)
- ✅ Loading skeletons for better UX
- ✅ Fully responsive design
- ✅ Error boundaries for graceful failures

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router v6 | Routing |
| Axios | HTTP Client |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 18+ | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| cookie-parser | Cookie Handling |

### Deployment
| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhich05/cyberWarFare.git
cd cyberWarFare

# Setup Backend
cd server
npm install

# Setup Frontend
cd ../client
npm install
```

### Run Locally

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

**Seed Database:**
```bash
cd server
npm run seed
```

Access the app at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🔧 Environment Variables

### Server (`server/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cyberwarfare
JWT_SECRET=your-64-char-secret-key
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)
```env
VITE_API_URL=/api
```

---

## 📖 API Documentation

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/verify` | Verify token | ✅ |

### Courses
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses` | Get all courses | ❌ |
| GET | `/api/courses/:id` | Get course by ID | ❌ |
| POST | `/api/courses/seed` | Seed courses | ❌ |

### Subscriptions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/subscribe` | Subscribe to course | ✅ |
| GET | `/api/my-courses` | Get user's courses | ✅ |
| POST | `/api/validate-promo` | Validate promo code | ❌ |
| GET | `/api/subscription-status/:id` | Check subscription | ✅ |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/healthz` | Render health check |
| GET | `/api/health` | API health status |

---

## 📁 Project Structure

```
cyberWarFare/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── api/              # Axios config & API calls
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Auth context
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   └── utils/            # Helper functions
│   ├── vercel.json           # Vercel config
│   └── package.json
│
├── server/                    # Express Backend
│   ├── config/               # DB & constants
│   ├── controllers/          # Route handlers
│   ├── middlewares/          # Auth & CORS
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── utils/                # Helpers & validators
│   ├── render.yaml           # Render config
│   └── package.json
│
└── README.md
```

---

## 👤 Demo

**Promo Code**: `BFSALE25` (50% discount on paid courses)

Create a new account or use the app to browse courses!

---

## 📄 License

MIT License - feel free to use for learning or production.

---

<p align="center">
  <strong>CyberWarFare Labs</strong> — Premium Cybersecurity Education
</p>
