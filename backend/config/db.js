// MongoDB Atlas Cloud Database Connection
// Tech Stack: MongoDB Atlas (Cloud)
// DSAI Summer Internship 2026

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas cloud database
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
