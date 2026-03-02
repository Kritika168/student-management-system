# Deployment Guide - Student Database Management System

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Redis instance setup (Redis Cloud or hosting provider)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Environment variables documented

---

## 🔧 MongoDB Atlas Setup (Required)

### Step 1: Create Account & Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new **FREE** cluster (M0 tier)
4. Choose your preferred cloud provider and region

### Step 2: Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose authentication method: **Username and Password**
4. Create username and strong password
5. Set database user privileges to **"Read and Write to any database"**
6. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add your deployment platform's IP addresses
5. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** (Clusters page)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **Driver**: Node.js, **Version**: 4.1 or later
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `studentDB` (or your preferred name)

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentDB?retryWrites=true&w=majority
```

---

## ☁️ Redis Cloud Setup

### Option 1: Redis Cloud (Recommended for Production)

1. Go to [Redis Cloud](https://redis.com/try-free/)
2. Sign up for free account
3. Create new database (30MB free tier)
4. Note down:
   - Endpoint (host and port)
   - Password
5. Use these in your backend environment variables

### Option 2: Local Redis (Development Only)

**Windows:**
```powershell
# Using Chocolatey
choco install redis-64

# Or download from
# https://github.com/microsoftarchive/redis/releases
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

---

## 🚀 Backend Deployment

### Option A: Render (Recommended - Free Tier Available)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com/)
   - Sign up/Login with GitHub
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: student-management-backend
     - **Root Directory**: `backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables**
   - Click **"Environment"** tab
   - Add the following:
     ```
     MONGODB_URI=<your-mongodb-atlas-connection-string>
     PORT=5000
     REDIS_HOST=<your-redis-host>
     REDIS_PORT=<your-redis-port>
     REDIS_PASSWORD=<your-redis-password>
     ```

4. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment to complete
   - Note down the service URL (e.g., `https://your-app.onrender.com`)

### Option B: Railway

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables
6. Deploy

### Option C: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create your-app-name

# Add environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set REDIS_HOST="your-redis-host"
heroku config:set REDIS_PORT="your-redis-port"
heroku config:set REDIS_PASSWORD="your-redis-password"

# Deploy
git push heroku main
```

---

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended)

1. **Prepare Frontend**
   - Update `.env` file:
     ```bash
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Sign up/Login with GitHub
   - Click **"Add New"** → **"Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Add Environment Variable**
   - Go to **Settings** → **Environment Variables**
   - Add: `REACT_APP_API_URL` = `https://your-backend-url/api`

4. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment
   - Access your app at the provided URL

### Option B: Netlify

1. Go to [Netlify](https://netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

---

## ✅ Post-Deployment Verification

### 1. Test Backend API

Visit: `https://your-backend-url.com/`

Should see:
```json
{
  "message": "Student Database Management System API",
  "version": "1.0.0"
}
```

Test endpoints:
```bash
# Get all students
curl https://your-backend-url.com/api/students

# Create student (via Postman or frontend)
```

### 2. Test Frontend

1. Visit your frontend URL
2. Try adding a student
3. Verify it appears in the list
4. Test search functionality
5. Test edit and delete operations

### 3. Verify Redis Caching

1. Load students page (check badge shows "From Database")
2. Refresh within 3 minutes (should show "From Cache")
3. Add/Edit/Delete a student
4. Reload page (should show "From Database" again - cache invalidated)

---

## 🔍 Monitoring & Logs

### Render
- Dashboard → Your Service → **Logs** tab
- View real-time logs and errors

### Vercel
- Dashboard → Your Project → **Deployments** → **View Function Logs**

### Railway
- Dashboard → Your Project → **Logs**

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Error
**Solution**: Ensure backend has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue 2: MongoDB Connection Failed
**Solution**: 
- Check connection string format
- Verify password special characters are URL encoded
- Ensure IP whitelist includes deployment server

### Issue 3: Redis Connection Timeout
**Solution**:
- Verify Redis host and port
- Check firewall settings
- Ensure Redis password is correct

### Issue 4: Frontend can't reach backend
**Solution**:
- Verify `REACT_APP_API_URL` is set correctly
- Rebuild frontend after changing env variables
- Check browser console for errors

---

## 📊 Performance Optimization

1. **Enable Gzip Compression** (Backend)
2. **Use CDN** for static assets
3. **Database Indexing**: Add indexes on `studentId`
4. **Redis Connection Pooling**
5. **Frontend Code Splitting**

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong MongoDB passwords
- ✅ Rotate Redis passwords regularly
- ✅ Enable MongoDB Atlas IP whitelisting (production)
- ✅ Use HTTPS for all API calls
- ✅ Validate all input on both frontend and backend
- ✅ Implement rate limiting (optional)

---

## 📱 Testing Deployed Application

1. **Add Student**: Create 5+ test students
2. **Search**: Test search with different queries
3. **Edit**: Modify student details
4. **Delete**: Remove a student
5. **Cache**: Verify cache indicator changes
6. **Mobile**: Test on mobile devices

---

## 📝 Submission Checklist

- [ ] GitHub repository is public
- [ ] README.md is complete
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas configured
- [ ] Redis caching working
- [ ] All CRUD operations functional
- [ ] Error handling working
- [ ] Search functionality working
- [ ] Mobile responsive

---

## 🔗 Deployment URLs Template

```
GitHub Repository: https://github.com/yourusername/student-management-system
Backend API: https://your-backend.onrender.com
Frontend App: https://your-app.vercel.app
```

---

**Good luck with your DSAI Summer Internship 2026 submission! 🚀**
