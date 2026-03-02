// Student Routes - Express.js REST API Endpoints
// Tech Stack: Express.js Router
// DSAI Summer Internship 2026

const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
} = require('../controllers/studentController');

// GET all students
router.get('/', getAllStudents);

// GET student by ID
router.get('/:id', getStudentById);

// POST create new student
router.post('/', createStudent);

// PUT update student
router.put('/:id', updateStudent);

// DELETE student
router.delete('/:id', deleteStudent);

// GET search students
router.get('/search/query', searchStudents);

module.exports = router;
