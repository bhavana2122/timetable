// src/components/ActivityScheduler.js
import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { ActivitiesContext } from '../contexts/ActivitiesContext';

const generateTimeSlots = (start, end, interval) => {
  const timeSlots = [];
  let current = start;
  while (current < end) {
    const next = new Date(current.getTime() + interval * 60000);
    timeSlots.push({
      start: current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      end: next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    current = next;
  }
  return timeSlots;
};

const ActivityScheduler = ({ day, isAdmin }) => {
  const { activities, fetchActivities, setActivities, saveActivities } = useContext(ActivitiesContext);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchActivities(day);
  }, [day, fetchActivities]);

  const startTime = new Date();
  startTime.setHours(8, 0, 0, 0); // 8:00 AM
  const endTime = new Date();
  endTime.setHours(16, 0, 0, 0); // 4:00 PM
  const interval = 30; // 30 minutes

  const timeSlots = generateTimeSlots(startTime, endTime, interval);

  const handleSave = async () => {
    await saveActivities(day, activities);
    setEditMode(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{day} Activity Scheduler</h1>
      {isAdmin && (
        <>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Save' : 'Edit'}
          </Button>
          {editMode && (
            <Button onClick={handleSave}>Save Changes</Button>
          )}
        </>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.start} - {slot.end}</td>
              <td>
                {editMode ? (
                  <input
                    value={activities[index]?.activity || ''}
                    onChange={(e) => {
                      const newActivities = [...activities];
                      newActivities[index] = { ...newActivities[index], activity: e.target.value };
                      setActivities(newActivities);
                    }}
                  />
                ) : (
                  activities[index]?.activity || ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ActivityScheduler;
