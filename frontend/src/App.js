// Student Database Management System - React Frontend
// Tech Stack: React 18.2 with Modern Hooks & Performance Optimization
// DSAI Summer Internship 2026

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/api';

function App() {
  // React state hooks for managing application data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [cacheSource, setCacheSource] = useState(null);

  // Fetch all students from backend API using useCallback
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllStudents();
      setStudents(response.data);
      setCacheSource(response.source);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // React useEffect hook - fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle add/update student with useCallback for performance
  const handleStudentAdded = useCallback(async (studentData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, studentData);
        setEditingStudent(null);
      } else {
        await createStudent(studentData);
      }
      await fetchStudents();
    } catch (err) {
      throw err;
    }
  }, [editingStudent, fetchStudents]);

  // Handle edit student selection
  const handleEditStudent = useCallback((student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setEditingStudent(null);
  }, []);

  // Handle delete student with confirmation
  const handleDeleteStudent = useCallback(async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteStudent(id);
        await fetchStudents();
      } catch (err) {
        alert(err.message || 'Failed to delete student');
        console.error('Error deleting student:', err);
      }
    }
  }, [fetchStudents]);

  // Memoized header for React 18 rendering optimization
  const headerContent = useMemo(() => (
    <header className="app-header">
      <h1>Student Database Management System</h1>
      <p>Manage your student records efficiently</p>
      {cacheSource && (
        <div className="cache-indicator">
          Data Source: {cacheSource === 'cache' ? '⚡ Redis Cache' : '🗄️ MongoDB'}
        </div>
      )}
    </header>
  ), [cacheSource]);

  // React JSX rendering
  return (
    <div className="App">
      {headerContent}

      {error && (
        <div className="alert alert-error">
          {error}
          <button
            onClick={fetchStudents}
            style={{
              marginLeft: '20px',
              padding: '5px 15px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div className="container">
        <StudentForm
          onStudentAdded={handleStudentAdded}
          editingStudent={editingStudent}
          onCancelEdit={handleCancelEdit}
        />

        <StudentList
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          loading={loading}
          cacheSource={cacheSource}
        />
      </div>
    </div>
  );
}

export default App;
