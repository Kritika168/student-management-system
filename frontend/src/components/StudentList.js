import React, { useState, useEffect } from 'react';

const StudentList = ({ students, onEdit, onDelete, loading, cacheSource }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.class.toLowerCase().includes(query) ||
          student.section.toLowerCase().includes(query) ||
          student.phoneNumber.includes(query)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Student List</h2>
        <div className="loading">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>
        Student List
        {cacheSource && (
          <span className={`cache-badge ${cacheSource}`}>
            {cacheSource === 'cache' ? 'From Cache' : 'From Database'}
          </span>
        )}
      </h2>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, ID, class, section, or phone..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <h3>No Students Found</h3>
          <p>
            {searchQuery
              ? 'No students match your search criteria'
              : 'Start by adding a new student using the form'}
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '10px', color: '#666' }}>
            Total Students: {filteredStudents.length}
          </div>
          <div className="student-list">
            {filteredStudents.map((student) => (
              <div key={student._id} className="student-card">
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>
                    <strong>Student ID:</strong> {student.studentId}
                  </p>
                  <p>
                    <strong>Class:</strong> {student.class}
                  </p>
                  <p>
                    <strong>Section:</strong> {student.section}
                  </p>
                  <p>
                    <strong>Phone:</strong> {student.phoneNumber}
                  </p>
                </div>
                <div className="student-actions">
                  <button
                    onClick={() => onEdit(student)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student._id, student.name)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;
