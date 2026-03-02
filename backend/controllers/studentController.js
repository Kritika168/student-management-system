const Student = require('../models/Student');
const { getRedisClient } = require('../config/redis');

const CACHE_KEY = 'students:all';
const CACHE_EXPIRY = 180; // 3 minutes (between 2-5 minutes as per requirement)

// Helper function to invalidate cache
const invalidateCache = async () => {
  try {
    const redisClient = getRedisClient();
    if (redisClient) {
      await redisClient.del(CACHE_KEY);
      console.log('Cache invalidated');
    }
  } catch (error) {
    console.error('Error invalidating cache:', error.message);
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getAllStudents = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    // Check Redis cache first
    if (redisClient) {
      const cachedData = await redisClient.get(CACHE_KEY);
      if (cachedData) {
        console.log('Returning data from Redis cache');
        return res.status(200).json({
          success: true,
          source: 'cache',
          data: JSON.parse(cachedData),
        });
      }
    }

    // If no cache, fetch from MongoDB
    console.log('Fetching data from MongoDB');
    const students = await Student.find().sort({ createdAt: -1 });

    // Store in Redis cache
    if (redisClient) {
      await redisClient.setEx(CACHE_KEY, CACHE_EXPIRY, JSON.stringify(students));
      console.log('Data cached in Redis');
    }

    res.status(200).json({
      success: true,
      source: 'database',
      data: students,
    });
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message,
    });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error('Error fetching student:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
      error: error.message,
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    const { studentId, name, class: studentClass, section, phoneNumber } = req.body;

    // Validate required fields
    if (!studentId || !name || !studentClass || !section || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if student ID already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student ID already exists. Please use a unique Student ID.',
      });
    }

    // Create new student
    const student = await Student.create({
      studentId,
      name,
      class: studentClass,
      section,
      phoneNumber,
    });

    // Invalidate cache
    await invalidateCache();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error creating student:', error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student ID already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message,
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res) => {
  try {
    const { studentId, name, class: studentClass, section, phoneNumber } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Check if updating studentId and if it conflicts with existing
    if (studentId && studentId !== student.studentId) {
      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists. Please use a unique Student ID.',
        });
      }
    }

    // Update fields
    student.studentId = studentId || student.studentId;
    student.name = name || student.name;
    student.class = studentClass || student.class;
    student.section = section || student.section;
    student.phoneNumber = phoneNumber || student.phoneNumber;

    const updatedStudent = await student.save();

    // Invalidate cache
    await invalidateCache();

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    console.error('Error updating student:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message,
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    await student.deleteOne();

    // Invalidate cache
    await invalidateCache();

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message,
    });
  }
};

// @desc    Search students
// @route   GET /api/students/search/query
// @access  Public
const searchStudents = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const students = await Student.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { studentId: { $regex: q, $options: 'i' } },
        { class: { $regex: q, $options: 'i' } },
        { section: { $regex: q, $options: 'i' } },
        { phoneNumber: { $regex: q, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('Error searching students:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to search students',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
};
