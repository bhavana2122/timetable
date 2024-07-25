// src/components/Timetable.js
import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const Timetable = ({ timetable, isAdmin }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [activities, setActivities] = useState(timetable);

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleChange = (event, index) => {
    const newActivities = [...activities];
    newActivities[index] = event.target.value;
    setActivities(newActivities);
  };

  const handleSave = () => {
    setEditingIndex(null);
    // Save the new activities to the backend or localStorage
    // For now, we're just updating the state
    console.log("Activities saved:", activities);  // You can remove or replace this with actual save logic
  };

  return (
    <div>
      <h2>Timetable</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Activity</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{index % 2 === 0 ? `${Math.floor(index / 2) + 8}:00 AM` : `${Math.floor(index / 2) + 8}:30 AM`}</td>
              <td>
                {editingIndex === index ? (
                  <Form.Control
                    type="text"
                    value={activity}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  <a href={activity.startsWith('http') ? activity : '#'} target="_blank" rel="noopener noreferrer">
                    {activity || 'Available'}
                  </a>
                )}
              </td>
              {isAdmin && (
                <td>
                  {editingIndex === index ? (
                    <Button variant="success" onClick={handleSave}>Save</Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleEditClick(index)}>Edit</Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Timetable;
