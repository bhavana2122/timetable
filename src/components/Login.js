// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();

      if (userData.role === 'Parent') {
        navigate('/parentpage');
      } else if (userData.role === 'Teacher') {
        navigate('/teacherpage');
      } else if (userData.role === 'Admin') {
        navigate('/adminpage');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', error); // Log the error for debugging
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
