import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressGraph = ({ student }) => {
  const generateProgressData = (student) => {
    // Example data. Replace with actual data from your application.
    const progress = [
      [true, false, true, true, false, true, false, true, true, true, false, true, false, true, true, false], // Monday
      [true, true, true, true, false, true, false, true, false, true, false, true, false, true, true, false], // Tuesday
      [true, false, true, true, false, true, false, true, true, true, false, true, false, true, true, false], // Wednesday
      [true, false, true, true, false, true, false, true, false, true, false, true, false, true, true, false], // Thursday
      [true, false, true, true, false, true, false, true, true, true, false, true, false, true, true, false], // Friday
      [true, false, true, true, false, true, false, true, false, true, false, true, false, true, true, false], // Saturday
      [true, false, true, true, false, true, false, true, true, true, false, true, false, true, true, false], // Sunday
    ];

    return progress.map((dayProgress, dayIndex) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex],
      // Replace with actual activities
      activity1: dayProgress[0] ? 1 : 0,
      activity2: dayProgress[1] ? 1 : 0,
      // Add more activities as needed
    }));
  };

  const data = generateProgressData(student);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Add more lines based on activities */}
        <Line type="monotone" dataKey="activity1" stroke="#8884d8" />
        <Line type="monotone" dataKey="activity2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressGraph;
