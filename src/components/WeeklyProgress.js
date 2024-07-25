// src/components/WeeklyProgress.js
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { students, activities } from '../data';

const WeeklyProgress = () => {
  const navigate = useNavigate();
  
  // Initialize progress data
  const initialProgress = students.reduce((acc, student) => {
    acc[student.id] = {
      name: student.name,
      progress: Array(7).fill(activities.map(() => false)), // 7 days, 16 activities per day
    };
    return acc;
  }, {});

  const [progress, setProgress] = React.useState(initialProgress);

  const handleToggleProgress = (studentId, dayIndex, activityIndex) => {
    const newProgress = { ...progress };
    newProgress[studentId].progress[dayIndex][activityIndex] = !newProgress[studentId].progress[dayIndex][activityIndex];
    setProgress(newProgress);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weekly Progress</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student</th>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {progress[student.id].progress.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day.map((completed, activityIndex) => (
                    <div
                      key={activityIndex}
                      style={{
                        textDecoration: completed ? 'line-through' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleToggleProgress(student.id, dayIndex, activityIndex)}
                    >
                      {activities[activityIndex]}
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => navigate('/student-progress')}>Weekly Progress</Button>
    </div>
  );
};

export default WeeklyProgress;
