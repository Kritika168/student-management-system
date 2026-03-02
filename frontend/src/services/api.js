// API Service Layer - Axios HTTP Client
// Tech Stack: Axios for API communication (no page reloads)
// DSAI Summer Internship 2026

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch students' };
  }
};

// Get student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch student' };
  }
};

// Create new student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create student' };
  }
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update student' };
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete student' };
  }
};

// Search students
export const searchStudents = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/students/search/query?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search students' };
  }
};
