import React, { useState, useContext } from 'react';
import { db } from '../firebase';
import { Form, Button, Alert } from 'react-bootstrap';
import { StudentsContext } from '../contexts/StudentsContext';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
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
      const docRef = await db.collection('students').add({ name: studentName });
      setStudents([...students, { id: docRef.id, name: studentName }]);
      setStudentName('');
      setError(null);
      setSuccess('Student added successfully!');
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student');
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default AddStudent;
