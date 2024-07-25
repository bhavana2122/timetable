// src/components/Thursday.js
import React from 'react';
import { generateTimetable } from '../utils/timetable';
import { Table } from 'react-bootstrap';
import Timetable from './Timetable';

const timetable = generateTimetable(8, 16); // 8 AM to 4 PM

function Thursday() {
  const isAdmin = true; // Set to true for the admin, otherwise false

  return (
    <div>
      <h1>Thursday Page</h1>
      <p>This is the content for Thursday.</p>
      <img src={"Sunday.jpg"} alt="logo192.png" />
      <Timetable timetable={timetable} isAdmin={isAdmin} />
    </div>
  );
}
export default Thursday;
