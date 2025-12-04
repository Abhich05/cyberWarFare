# 🚀 Free Deployment Guide

Deploy CyberWarFare Labs for **$0/month** using these free services:

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Vercel** | Frontend (React) | Unlimited sites, 100GB bandwidth |
| **Render** | Backend (Node.js) | 750 hours/month, auto-sleep |
| **MongoDB Atlas** | Database | 512MB storage, shared cluster |

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. Accounts on: [Vercel](https://vercel.com), [Render](https://render.com), [MongoDB Atlas](https://mongodb.com/atlas)

---

## Step 1: Database (MongoDB Atlas) - 5 minutes

### 1.1 Create Free Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Login
3. Click **"Build a Database"**
4. Select **FREE - Shared** (M0 Sandbox)
5. Choose region closest to your users
6. Click **"Create Cluster"**

### 1.2 Configure Access
1. **Database Access** → Add Database User
   - Username: `cyberwarfare_user`
   - Password: Generate secure password (save it!)
   - Role: `Read and write to any database`

2. **Network Access** → Add IP Address
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to Render's IPs

### 1.3 Get Connection String
1. Click **"Connect"** → **"Connect your application"**
2. Copy the connection string:
   ```
   mongodb+srv://cyberwarfare_user:<password>@cluster0.xxxxx.mongodb.net/cyberwarfare?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your actual password

---

## Step 2: Backend (Render) - 10 minutes

### 2.1 Prepare Backend

Add health check endpoint to `server/server.js`:

```javascript
// Health check for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### 2.2 Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `cyberwarfare-api`
   - **Region:** Oregon (or closest)
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 2.3 Set Environment Variables

In Render dashboard → Environment:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://...` (from Atlas) |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `CORS_ORIGIN` | `https://your-app.vercel.app` (update after Vercel deploy) |
| `PORT` | `10000` |

### 2.4 Deploy
Click **"Create Web Service"** - Render will build and deploy automatically.

Your API URL: `https://cyberwarfare-api.onrender.com`

⚠️ **Free tier note:** Service sleeps after 15 min of inactivity. First request after sleep takes ~30 seconds.

---

## Step 3: Frontend (Vercel) - 5 minutes

### 3.1 Prepare Frontend

Create `client/.env.production`:

```env
VITE_API_URL=https://cyberwarfare-api.onrender.com/api
```

### 3.2 Deploy to Vercel

**Option A: Vercel CLI (Recommended)**
```bash
cd client
npm i -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.3 Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://cyberwarfare-api.onrender.com/api` |

### 3.4 Deploy
Click **"Deploy"** - Vercel will build and deploy automatically.

Your frontend URL: `https://your-app.vercel.app`

---

## Step 4: Update CORS - 2 minutes

Now that you have your Vercel URL, update Render:

1. Go to Render → Your Service → Environment
2. Update `CORS_ORIGIN` to `https://your-app.vercel.app`
3. Click **"Save Changes"** (triggers redeploy)

---

## 🔄 Continuous Deployment

Both Vercel and Render auto-deploy when you push to `main`:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
# Both frontend and backend redeploy automatically!
```

---

## 🛠️ Troubleshooting

### Backend not responding?
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string
- Ensure `CORS_ORIGIN` matches your Vercel URL exactly

### Frontend API calls failing?
- Check browser console for CORS errors
- Verify `VITE_API_URL` is correct
- Make sure backend is awake (not sleeping)

### Database connection issues?
- Whitelist `0.0.0.0/0` in Atlas Network Access
- Check username/password in connection string
- Verify database user has correct permissions

### Slow initial load?
- Free Render tier sleeps after 15 min - first request wakes it
- Consider Render paid tier ($7/mo) for always-on
- Or add a cron job to ping your API every 14 minutes

---

## 📊 Free Tier Limits

| Service | Limit | What happens |
|---------|-------|--------------|
| **Vercel** | 100GB bandwidth/month | Overage charges apply |
| **Render** | 750 hours/month, sleeps after 15 min | Service pauses until next month |
| **MongoDB Atlas** | 512MB storage | Upgrade required |

---

## 🚀 Upgrade Path (When Ready)

| Current (Free) | Upgrade To | Cost |
|----------------|------------|------|
| Render Free | Render Starter | $7/mo (always-on) |
| Atlas M0 | Atlas M2 | $9/mo (2GB) |
| Vercel Hobby | Vercel Pro | $20/mo (team features) |

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] CORS_ORIGIN updated with Vercel URL
- [ ] Test login/signup flow
- [ ] Test course enrollment
- [ ] Test video playback

---

## 🔐 Production Security Checklist

- [ ] Generate strong JWT_SECRET (64+ bytes)
- [ ] Use HTTPS only (automatic on Vercel/Render)
- [ ] Restrict MongoDB IP access for production
- [ ] Enable MongoDB Atlas alerts
- [ ] Set up Sentry for error tracking
- [ ] Add rate limiting (already configured in security.js)

---

**Total setup time: ~20 minutes**
**Monthly cost: $0** 🎉
