// Student Database Management System - React Frontend
// Tech Stack: React 18.2
// DSAI Summer Internship 2026

import React, { useState, useEffect } from 'react';
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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [cacheSource, setCacheSource] = useState(null);

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
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
  };

  const handleStudentAdded = async (studentData) => {
    try {
      if (editingStudent) {
        // Update existing student
        await updateStudent(editingStudent._id, studentData);
        setEditingStudent(null);
      } else {
        // Create new student
        await createStudent(studentData);
      }
      // Refresh student list
      await fetchStudents();
    } catch (err) {
      throw err;
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    // Scroll to top to show form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteStudent(id);
        // Refresh student list
        await fetchStudents();
      } catch (err) {
        alert(err.message || 'Failed to delete student');
        console.error('Error deleting student:', err);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Database Management System</h1>
        <p>Manage your student records efficiently</p>
      </header>

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
