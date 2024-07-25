// src/components/Friday.js
import React from 'react';
import { generateTimetable } from '../utils/timetable';
import { Table } from 'react-bootstrap';
import Timetable from './Timetable';

const timetable = generateTimetable(8, 16); // 8 AM to 4 PM

function Friday() {
  const isAdmin = true; // Set to true for the admin, otherwise false

  return (
    <div>
      <h1>Friday Page</h1>
      <p>This is the content for Friday.</p>
      <img src={"Sunday.jpg"} alt="logo192.png" />
      <Timetable timetable={timetable} isAdmin={isAdmin} />
    </div>
  );
}

export default Friday;
