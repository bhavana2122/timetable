// src/components/TeacherPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherPage = () => {
  return (
    <div>
      <h1>TeacherPage</h1>
      <nav>
        <Link to="/monday">Monday</Link> | 
        <Link to="/tuesday">Tuesday</Link> | 
        <Link to="/wednesday">Wednesday</Link> | 
        <Link to="/thursday">Thursday</Link> | 
        <Link to="/friday">Friday</Link> | 
        <Link to="/saturday">Saturday</Link> | 
        <Link to="/sunday">Sunday</Link>
        <Link to="/add-student">Add Student</Link> {/* Add link to add student */}
      </nav>
    </div>
  );
};

export default TeacherPage;
