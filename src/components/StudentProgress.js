import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { db } from '../firebase';
import ProgressGraph from './ProgressGraph';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await db.collection('students').get();
      const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  const handleStudentChange = (event) => {
    const studentId = event.target.value;
    const student = students.find((s) => s.id === studentId);
    setSelectedStudent(student);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Progress</h1>
      <Form>
        <Form.Group controlId="studentSelect">
          <Form.Label>Select Student</Form.Label>
          <Form.Control as="select" onChange={handleStudentChange}>
            <option value="">Select a student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {selectedStudent && <ProgressGraph student={selectedStudent} />}
    </div>
  );
};

export default StudentProgress;
