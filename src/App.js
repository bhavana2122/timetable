import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ParentPage from './components/ParentPage';
import TeacherPage from './components/TeacherPage';
import AdminPage from './components/AdminPage';
import Monday from './components/Monday';
import Tuesday from './components/Tuesday';
import Wednesday from './components/Wednesday';
import Thursday from './components/Thursday';
import Friday from './components/Friday';
import Saturday from './components/Saturday';
import Sunday from './components/Sunday';
import ActivityScheduler from './components/ActivityScheduler';
import WeeklyProgress from './components/WeeklyProgress';
import ProgressTracking from './components/ProgressTracking';
import TeacherDashboard from './components/TeacherDashboard';
import {db, auth, initializeDefaultActivitiesForUser } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        setUser({ uid: user.uid, ...userDoc.data() });

        // Initialize default activities if user is an Admin or Teacher
        if (userDoc.data().role === 'Admin' || userDoc.data().role === 'Teacher') {
          await initializeDefaultActivitiesForUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const showProgressButton = user && user.role !== 'Parent';

  return (
    <Router>
      <div className="App">
        {showProgressButton && (
          <div style={{ position: 'fixed', right: '10px', bottom: '10px' }}>
            <Link to="/progress">
              
            </Link>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/parentpage" element={<ParentPage />} />
          <Route path="/teacherpage" element={<TeacherPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/monday" element={<Monday user={user} />} />
          <Route path="/tuesday" element={<Tuesday user={user} />} />
          <Route path="/wednesday" element={<Wednesday user={user} />} />
          <Route path="/thursday" element={<Thursday user={user} />} />
          <Route path="/friday" element={<Friday user={user} />} />
          <Route path="/saturday" element={<Saturday user={user} />} />
          <Route path="/sunday" element={<Sunday user={user} />} />
          <Route path="/activity-scheduler" element={<ActivityScheduler />} />
          <Route path="/weekly-progress" element={<WeeklyProgress />} />
          <Route path="/progress" element={<ProgressTracking user={user} />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
