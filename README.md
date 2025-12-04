# 🛡️ CyberWarFare Labs

Hey there! 👋 Welcome to **CyberWarFare Labs** — a sleek course platform I built to learn and showcase full-stack development with the MERN stack.

This project simulates a cybersecurity course marketplace with Black Friday deals, user authentication, and course subscriptions. It's deployed and live, so feel free to play around!

![CyberWarFare Labs](https://img.shields.io/badge/CyberWarFare-Labs-red?style=for-the-badge&logo=shield&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

---

## 🚀 Try It Live!

| What | Where |
|------|-------|
| 🌐 **Live App** | [cyber-war-fare.vercel.app](https://cyber-war-fare.vercel.app) |
| 🔗 **API** | [cyberwarfare.onrender.com](https://cyberwarfare.onrender.com) |

> 💡 **Heads up**: The backend is on Render's free tier, so it might take ~30 seconds to wake up if it's been idle. Grab a coffee ☕

**Want to test?** Use promo code `BFSALE25` for 50% off!

---

## ✨ What Can You Do?

**As a User:**
- 🔐 Sign up & log in securely
- 📚 Browse cybersecurity courses
- 🎥 Watch video previews (YouTube integration)
- 🛒 Subscribe to courses (free ones are instant!)
- 🏷️ Apply promo codes for discounts
- 📖 Track your enrolled courses

**Under the Hood:**
- Clean MVC architecture
- JWT auth that actually works cross-domain (took me a while to figure that out 😅)
- Smooth animations with Framer Motion
- Responsive dark theme that looks great on mobile
- GDPR-friendly cookie consent

---

---

## 🛠️ Built With

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, Axios, Lucide Icons

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

**Deployed on:** Vercel (frontend) + Render (backend) + MongoDB Atlas

---

## 🏃‍♂️ Run It Yourself

Want to tinker with it locally? Here's how:

```bash
# Clone it
git clone https://github.com/Abhich05/cyberWarFare.git
cd cyberWarFare

# Install backend dependencies
cd server && npm install

# Install frontend dependencies  
cd ../client && npm install
```

Then open two terminals:

```bash
# Terminal 1 - Start the backend
cd server && npm run dev

# Terminal 2 - Start the frontend
cd client && npm run dev
```

Don't forget to seed the database:
```bash
cd server && npm run seed
```

Now visit http://localhost:5173 and you're good to go! 🎉

---

## ⚙️ Environment Setup

Create these `.env` files:

**`server/.env`**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cyberwarfare
JWT_SECRET=make-this-something-long-and-random
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_URL=/api
```

---

## 📚 API Endpoints

Here's what the backend can do:

| What | How | Where |
|------|-----|-------|
| Sign up | POST | `/api/auth/signup` |
| Log in | POST | `/api/auth/login` |
| Log out | POST | `/api/auth/logout` |
| Get courses | GET | `/api/courses` |
| Subscribe | POST | `/api/subscribe` |
| My courses | GET | `/api/my-courses` |
| Check promo | POST | `/api/validate-promo` |

---

## 📂 How It's Organized

```
cyberWarFare/
├── client/          → React frontend
│   ├── src/
│   │   ├── api/         → API calls
│   │   ├── components/  → UI components
│   │   ├── context/     → Auth state
│   │   ├── pages/       → Route pages
│   │   └── hooks/       → Custom hooks
│
├── server/          → Express backend
│   ├── controllers/     → Business logic
│   ├── models/          → Database schemas
│   ├── routes/          → API routes
│   └── middlewares/     → Auth, CORS, etc.
```

---

## 🤝 Contributing

Found a bug? Have an idea? Feel free to open an issue or submit a PR. I'd love to hear from you!

---

## 📄 License

MIT — do whatever you want with it! Just maybe give a ⭐ if you found it useful.

---

<p align="center">
  Built with ❤️ and mass ☕ by <a href="https://github.com/Abhich05">Abhich05</a>
</p>
