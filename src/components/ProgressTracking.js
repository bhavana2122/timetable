import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Form, Button } from 'react-bootstrap';

const ProgressTracking = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsSnapshot = await db.collection('students').get();
      const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      const fetchProgress = async () => {
        const progressSnapshot = await db.collection('progress').doc(selectedStudent).get();
        if (progressSnapshot.exists) {
          setProgress(progressSnapshot.data());
        }
      };
      fetchProgress();
    }
  }, [selectedStudent]);

  const handleSaveProgress = async () => {
    await db.collection('progress').doc(selectedStudent).set(progress);
  };

  return (
    <div>
      <h1>Weekly Progress</h1>
      <Form.Group controlId="selectStudent">
        <Form.Label>Select Student</Form.Label>
        <Form.Control as="select" onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">Select...</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {selectedStudent && (
        <div>
          {/* Replace this with your progress form */}
          <Button onClick={handleSaveProgress}>Save Progress</Button>
        </div>
      )}
    </div>
  );
};

export default ProgressTracking;
