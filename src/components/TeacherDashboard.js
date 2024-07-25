import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { StudentsContext } from '../contexts/StudentsContext';
import { addStudent, addActivity } from '../firebase'; // Import functions

const TeacherDashboard = () => {
  const [studentName, setStudentName] = useState('');
  const [activity, setActivity] = useState('');
  const [day, setDay] = useState('Monday');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { students, setStudents } = useContext(StudentsContext);

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentName) {
      setError('Student name is required');
      return;
    }

    try {
      await addStudent({ name: studentName });
      setStudents([...students, { name: studentName }]);
      setStudentName('');
      setError(null);
      setSuccess('Student added successfully!');
    } catch (err) {
      setError('Failed to add student');
      console.error('Error adding student:', err);
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    if (!activity) {
      setError('Activity is required');
      return;
    }

    try {
      await addActivity(day, activity);
      setActivity('');
      setError(null);
      setSuccess('Activity added successfully!');
    } catch (err) {
      setError('Failed to add activity');
      console.error('Error adding activity:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Teacher Dashboard</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleStudentSubmit}>
        <Form.Group controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Student</Button>
      </Form>

      <Form onSubmit={handleActivitySubmit} style={{ marginTop: '20px' }}>
        <Form.Group controlId="daySelect">
          <Form.Label>Select Day</Form.Label>
          <Form.Control as="select" value={day} onChange={(e) => setDay(e.target.value)}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="activity">
          <Form.Label>Activity</Form.Label>
          <Form.Control
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Enter activity"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Activity</Button>
      </Form>
    </div>
  );
};

export default TeacherDashboard;
