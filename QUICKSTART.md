# Quick Start Guide

## ⚡ Getting Started in 5 Minutes

### 1️⃣ Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Edit .env with your MongoDB Atlas URI and Redis details

# Start server
npm start
```

**Backend ready at:** `http://localhost:5000`

---

### 2️⃣ Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

**Frontend ready at:** `http://localhost:3000`

---

### 3️⃣ Prerequisites

**MongoDB Atlas:**
- Create account at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in backend `.env`

**Redis:**
- **Windows**: Download from https://github.com/microsoftarchive/redis/releases
- **macOS**: `brew install redis && brew services start redis`
- **Linux**: `sudo apt install redis-server && sudo service redis-server start`

---

## 📋 Environment Variables

### Backend `.env`

create the file `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentDB?retryWrites=true&w=majority
PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Frontend `.env` (Optional)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Test the Application

1. **Open browser**: `http://localhost:3000`
2. **Add a student** with all details
3. **View** the student in the list
4. **Search** for the student
5. **Edit** student details
6. **Delete** the student

---

## 🔄 Redis Verification

1. Add a student → Check badge shows "From Database"
2. Refresh page → Badge shows "From Cache"
3. Edit/Delete student → Badge returns to "From Database"

---

## 📦 Project Structure

```
SummerInternship/
├── backend/           # Node.js + Express API
│   ├── config/        # DB and Redis connection
│   ├── controllers/   # Business logic
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   └── server.js      # Entry point
│
└── frontend/          # React application
    ├── src/
    │   ├── components/    # React components
    │   ├── services/      # API calls
    │   ├── App.js         # Main component
    │   └── App.css        # Styling
    └── public/
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check if Redis is running: Open Command Prompt → `redis-cli ping` (should return PONG)
- Verify MongoDB connection string
- Check if port 5000 is available

**Frontend shows error?**
- Ensure backend is running on port 5000
- Clear browser cache
- Check browser console for errors

**Redis not working?**
- Start Redis server
- Check REDIS_HOST and REDIS_PORT in .env

---

## 📝 Quick Commands

```bash
# Install all dependencies (run from root)
cd backend && npm install && cd ../frontend && npm install && cd ..

# Start backend only
cd backend && npm start

# Start backend with auto-reload (development)
cd backend && npm run dev

# Start frontend
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build
```

---

## ✅ Features Checklist

- ✅ Add new students with unique Student ID
- ✅ View all students in a responsive list
- ✅ Real-time search (no page reload)
- ✅ Edit student information
- ✅ Delete students with confirmation
- ✅ Form validation and error handling
- ✅ Redis caching (3-minute expiry)
- ✅ Automatic cache invalidation
- ✅ MongoDB Atlas integration
- ✅ Beautiful gradient UI

---

## 🚀 Next Steps

1. **Test locally** - Verify all features work
2. **Push to GitHub** - Create repository and push code
3. **Deploy Backend** - Use Render/Railway/Heroku
4. **Deploy Frontend** - Use Vercel/Netlify
5. **Submit** - Provide GitHub and deployment links

---

## 📞 API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/search/query?q=text` | Search students |

---

## 🎯 Key Requirements Met

✅ React components separated  
✅ Backend logic in separate files  
✅ Database config in separate file  
✅ Axios API calls (no page reload)  
✅ MongoDB Atlas (cloud database)  
✅ Redis caching implemented  
✅ Cache invalidation on CRUD  
✅ Unique Student ID validation  
✅ Comprehensive error handling  

---

**Happy Coding! 🎉**
