// src/components/Sunday.js
import React, { useContext } from 'react';
import ActivityScheduler from './ActivityScheduler';
import { AuthContext } from '../contexts/AuthContext';

function Sunday() {
  const { user } = useContext(AuthContext);
  const isAdmin = user && (user.role === 'admin' || user.role === 'teacher'); // Adjust based on your role naming

  return (
    <div>
      <h1>Sunday Schedule</h1>
      <ActivityScheduler day="Sunday" isAdmin={isAdmin} />
      <img src={"Sunday.jpg"} alt="Sunday" />
    </div>
  );
}

export default Sunday;
