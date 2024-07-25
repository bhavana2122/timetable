// src/components/Saturday.js
import React from 'react';
import { generateTimetable } from '../utils/timetable';
import { Table } from 'react-bootstrap';
import Timetable from './Timetable';

const timetable = generateTimetable(8, 16); // 8 AM to 4 PM

function Saturday() {
  return (
    <div>
      <h1>Saturday Page</h1>
      <p>This is the content for Saturday.</p>
      <h2>Timetable</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((time, index) => (
            <tr key={index}>
              <td>{time}</td>
              <td>Available</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Saturday;
