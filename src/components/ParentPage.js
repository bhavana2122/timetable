// src/components/ParentPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ParentPage = () => {
  return (
    <div>
      <h1>ParentPage</h1>
      <nav>
        <Link to="/monday">Monday</Link> | 
        <Link to="/tuesday">Tuesday</Link> | 
        <Link to="/wednesday">Wednesday</Link> | 
        <Link to="/thursday">Thursday</Link> | 
        <Link to="/friday">Friday</Link> | 
        <Link to="/saturday">Saturday</Link> | 
        <Link to="/sunday">Sunday</Link>
      </nav>
    </div>
  );
};
export default ParentPage;
