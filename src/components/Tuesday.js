import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { db } from '../firebase';

const generateTimetable = (startHour, endHour) => {
  const times = [];
  for (let hour = startHour; hour < endHour; hour++) {
    times.push(`${hour}:00 AM`);
    times.push(`${hour}:30 AM`);
  }
  return times;
};

const timetable = generateTimetable(8, 16); // 8 AM to 4 PM

function Tuesday({ user }) {
  const [activities, setActivities] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [currentActivities, setCurrentActivities] = useState({});
  const isAdmin = user?.role === 'Admin';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const doc = await db.collection('activities').doc('Tuesday').get();
        if (doc.exists) {
          setActivities(doc.data().activities);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleEdit = (index) => {
    setEditMode({ ...editMode, [index]: true });
    setCurrentActivities({ ...currentActivities, [index]: activities[index] });
  };

  const handleSave = async (index) => {
    try {
      const newActivities = [...activities];
      newActivities[index] = currentActivities[index];
      await db.collection('activities').doc('Tuesday').set({ activities: newActivities });
      setActivities(newActivities);
      setEditMode({ ...editMode, [index]: false });
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleChange = (index, value) => {
    setCurrentActivities({ ...currentActivities, [index]: value });
  };

  return (
    <div>
      <h1>Tuesday Page</h1>
      <p>This is the content for Tuesday.</p>
      <img src={"Sunday.jpg"} alt="logo192.png" />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Activity</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {timetable.map((time, index) => (
            <tr key={time}>
              <td>{time}</td>
              <td>
                {editMode[index] ? (
                  <Form.Control
                    type="text"
                    value={currentActivities[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ) : (
                  activities[index] || ''
                )}
              </td>
              {isAdmin && (
                <td>
                  {editMode[index] ? (
                    <Button onClick={() => handleSave(index)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tuesday;
