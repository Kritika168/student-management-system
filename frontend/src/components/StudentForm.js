// StudentForm React Component - Add/Edit Student Form
// Tech Stack: React 18.2 with Hooks
// DSAI Summer Internship 2026

import React, { useState, useEffect } from 'react';

const StudentForm = ({ onStudentAdded, editingStudent, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    class: '',
    section: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        studentId: editingStudent.studentId || '',
        name: editingStudent.name || '',
        class: editingStudent.class || '',
        section: editingStudent.section || '',
        phoneNumber: editingStudent.phoneNumber || '',
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    setError('');
  };

  const validateForm = () => {
    if (!formData.studentId.trim()) {
      setError('Student ID is required');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.class.trim()) {
      setError('Class is required');
      return false;
    }
    if (!formData.section.trim()) {
      setError('Section is required');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone Number is required');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      setError('Phone Number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onStudentAdded(formData);
      setSuccess(
        editingStudent
          ? 'Student updated successfully!'
          : 'Student added successfully!'
      );
      
      // Reset form only if not editing
      if (!editingStudent) {
        setFormData({
          studentId: '',
          name: '',
          class: '',
          section: '',
          phoneNumber: '',
        });
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      studentId: '',
      name: '',
      class: '',
      section: '',
      phoneNumber: '',
    });
    setError('');
    setSuccess('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="card">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student ID *</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter unique student ID"
            disabled={loading || !!editingStudent}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="class">Class *</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Enter class (e.g., 10th)"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section *</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Enter section (e.g., A)"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
