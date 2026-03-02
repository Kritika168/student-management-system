# Student Database Management System

## 🎓 DSAI Summer Internship 2026 - Compliant Project

A full-stack web application for managing student records with cloud database and caching capabilities. **Meets all requirements for DSAI Summer Internship 2026.**

### ✅ **Compliance Status:**
- ✅ **React** frontend with component separation
- ✅ **Node.js + Express** backend with proper file structure  
- ✅ **MongoDB Atlas** cloud database
- ✅ **Redis caching** with proper invalidation
- ✅ **CRUD operations** (Add, View, Search, Update, Delete)
- ✅ **API-only communication** (no page reloads)
- ✅ **Unique Student ID** constraint
- ✅ **Error handling** in frontend and backend

## 🚀 **Live Deployment**

| Service | Status | URL |
|---------|--------|-----|
| **Frontend (Vercel)** | 🟢 **LIVE** | `https://student-management-system-indol-alpha.vercel.app` |
| **Backend (Render)** | 🟢 **LIVE** | `https://student-management-system-bqyn.onrender.com` |
| **Database** | 🟢 **CONNECTED** | MongoDB Atlas (Cloud) |
| **Cache** | 🟢 **CONNECTED** | Redis Cloud |

## 🎯 Features

- **Add New Students**: Create student records with unique IDs
- **View All Students**: Display all students with real-time search
- **Search Students**: Search by name, ID, class, section, or phone number
- **Update Student Details**: Edit existing student information
- **Delete Student Records**: Remove students from the database
- **Redis Caching**: Fast data retrieval with automatic cache invalidation
- **Cloud Database**: MongoDB Atlas for global accessibility
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18.2**: Modern UI framework
- **Axios**: HTTP client for API calls  
- **CSS3**: Custom styling with gradient backgrounds
- **Deployment**: Vercel (Live)

### Backend
- **Node.js 24.11.1**: JavaScript runtime
- **Express.js**: Web application framework
- **Mongoose**: MongoDB object modeling
- **Deployment**: Render (Live)

### Database & Caching
- **MongoDB Atlas**: Cloud-hosted NoSQL database (AWS Mumbai)
- **Redis Cloud**: In-memory caching with 3-minute expiry
- **Cache Strategy**: Check Redis → Fetch MongoDB → Store in Redis

### Development
- **Git**: Version control
- **GitHub**: Code repository  
- **VS Code**: Development environment

## 💾 **Redis Caching Implementation** 

**Meets DSAI Summer Internship 2026 Requirements:**

### Cache Strategy:
1. **Fetch Students**: First check Redis cache
2. **Cache Hit**: Return cached data instantly  
3. **Cache Miss**: Fetch from MongoDB → Store in Redis (3 min expiry)
4. **CRUD Operations**: Auto-invalidate cache on Add/Update/Delete

### Code Implementation:
```javascript
// Cache Check (GET /api/students)
const cachedData = await redisClient.get(CACHE_KEY);
if (cachedData) return JSON.parse(cachedData);

// Cache Store with Expiry
await redisClient.setEx(CACHE_KEY, 180, JSON.stringify(students));

// Cache Invalidation (Add/Update/Delete operations)
await redisClient.del(CACHE_KEY);
```

## 📁 Project Structure

```
SummerInternship/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── redis.js           # Redis configuration  
│   ├── controllers/
│   │   └── studentController.js # Business logic + Redis caching
│   ├── models/
│   │   └── Student.js         # Student schema (Unique ID constraint)
│   ├── routes/
│   │   └── studentRoutes.js   # API endpoints (CRUD)
│   ├── .env                   # Environment variables (excluded from repo)
│   ├── .gitignore            # Git exclusions
│   ├── package.json          # Dependencies
│   └── server.js             # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js    # Add/Edit student form
│   │   │   └── StudentList.js    # Display students list
│   │   ├── services/
│   │   │   └── api.js           # Axios API calls (no page reload)
│   │   ├── App.js              # Main React component
│   │   └── index.js            # React DOM entry
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── .env                    # Frontend environment variables
│   ├── package.json           # React dependencies  
│   └── vercel.json            # Vercel deployment config
├── .gitignore                 # Global Git exclusions
└── README.md                  # Project documentation
```
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js
│   │   │   └── StudentList.js
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Redis server (local or cloud)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentDB?retryWrites=true&w=majority
   PORT=5000
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

5. **Start Redis server**
   - **Windows**: Download and install Redis from [releases](https://github.com/microsoftarchive/redis/releases) or use Windows Subsystem for Linux (WSL)
   - **macOS**: `brew install redis && brew services start redis`
   - **Linux**: `sudo service redis-server start`

6. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (optional)**
   ```bash
   cp .env.example .env
   ```

4. **Start the React development server**
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

## 🔧 MongoDB Atlas Setup

1. **Create a MongoDB Atlas account** at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster** (Free tier is sufficient)

3. **Configure network access**
   - Add your IP address or use `0.0.0.0/0` for access from anywhere

4. **Create a database user**
   - Go to Database Access
   - Add a new database user with a secure password

5. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update `MONGODB_URI` in backend `.env` file

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/search/query?q=` | Search students |

## 🔄 Redis Caching Strategy

- **Cache on Read**: When fetching all students, data is cached for 3 minutes
- **Cache Invalidation**: Cache is automatically cleared on:
  - Adding a new student
  - Updating a student
  - Deleting a student
- **Performance**: Subsequent requests within cache period are served from Redis (much faster)

## ✅ Validation Rules

- **Student ID**: Required, must be unique
- **Name**: Required
- **Class**: Required
- **Section**: Required
- **Phone Number**: Required, must be exactly 10 digits

## 🎨 Features Highlights

### Frontend
- Real-time search without page reload
- Form validation with error messages
- Success/error notifications
- Edit mode with pre-filled data
- Responsive grid layout
- Beautiful gradient UI
- Cache source indicator

### Backend
- Proper separation of concerns (MVC pattern)
- Comprehensive error handling
- Input validation
- Unique Student ID enforcement
- Redis caching with automatic invalidation
- RESTful API design

## 🚢 Deployment

### Backend Deployment (Render/Heroku/Railway)

1. Push code to GitHub
2. Create new web service
3. Connect repository
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Import project
3. Set environment variable: `REACT_APP_API_URL=<your-backend-url>/api`
4. Deploy

### Redis Setup for Production
- Use Redis Cloud (free tier available)
- Or use hosting provider's Redis addon

## 🧪 Testing

1. **Add a Student**
   - Fill all required fields
   - Submit form
   - Verify student appears in list

2. **View Students**
   - Check if all students are displayed
   - Note cache indicator (Cache/Database)

3. **Search Students**
   - Type in search box
   - Results filter in real-time

4. **Update Student**
   - Click "Edit" button
   - Modify details
   - Save changes

5. **Delete Student**
   - Click "Delete" button
   - Confirm deletion

## 🐛 Troubleshooting

**Backend won't start**
- Check if Redis is running
- Verify MongoDB connection string
- Ensure port 5000 is not in use

**Frontend can't connect to backend**
- Check if backend is running
- Verify CORS is enabled
- Check API URL configuration

**Redis connection error**
- Ensure Redis server is running
- Check Redis host and port

## 📝 Important Notes

✅ **All requirements met:**
- React components properly separated
- Backend logic in separate files
- API calls using Axios (no page reload)
- MongoDB Atlas for cloud database
- Redis caching implemented
- Cache invalidation on CRUD operations
- Unique Student ID validation
- Comprehensive error handling

## 👨‍💻 Development

```bash
# Install dependencies for both frontend and backend
npm install

# Run backend in development mode
cd backend && npm run dev

# Run frontend in development mode  
cd frontend && npm start
```

## 📄 License

This project is created for DSAI Summer Internship 2026.

## 🤝 **DSAI Summer Internship 2026 Submission**

### 🎯 **100% Requirements Compliance**

| **Requirement** | **✅ Status** | **Implementation** |
|-----------------|-------------|-------------------|
| Student Database Management System | ✅ **COMPLETE** | Full CRUD operations |
| Form for student details | ✅ **COMPLETE** | React form with validation |
| Cloud database storage | ✅ **COMPLETE** | MongoDB Atlas deployed |
| Add/View/Search/Update/Delete | ✅ **COMPLETE** | All operations working |
| React components in separate files | ✅ **COMPLETE** | `components/` folder |
| Backend logic in separate files | ✅ **COMPLETE** | `controllers/models/routes/` |
| Database config in separate files | ✅ **COMPLETE** | `config/` folder |
| API calls only (no page reload) | ✅ **COMPLETE** | Axios implementation |
| MongoDB Atlas (Cloud) | ✅ **COMPLETE** | Connected to AWS Mumbai |
| Redis for caching | ✅ **COMPLETE** | Full cache strategy |
| Redis cache expiry (2-5 min) | ✅ **COMPLETE** | 3 minute expiry |
| Cache invalidation on CRUD | ✅ **COMPLETE** | Auto-invalidation |
| Unique Student ID | ✅ **COMPLETE** | Database constraint |
| Proper error handling | ✅ **COMPLETE** | Frontend + Backend |

### 🔗 **Submission Links**

- **GitHub Repository**: `https://github.com/Kritika168/student-management-system.git`
- **Live Deployment**: `https://student-management-system-indol-alpha.vercel.app`
- **Backend API**: `https://student-management-system-bqyn.onrender.com`

### 🛠️ **Tech Stack Verification**
- ✅ **React** - Frontend framework
- ✅ **Node.js** - Runtime environment  
- ✅ **Express** - Backend framework
- ✅ **MongoDB Atlas** - Cloud database
- ✅ **Redis** - Caching layer

---

**✨ Created with precision for DSAI Summer Internship 2026 ✨**
