// src/components/Home.js
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const today = new Date().getDay(); // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)

  const days = [
    { name: 'Sunday', path: '/sunday' },
    { name: 'Monday', path: '/monday' },
    { name: 'Tuesday', path: '/tuesday' },
    { name: 'Wednesday', path: '/wednesday' },
    { name: 'Thursday', path: '/thursday' },
    { name: 'Friday', path: '/friday' },
    { name: 'Saturday', path: '/saturday' }
  ];

  return (
    <div>
      <h1>Learning is fun : Navigation</h1>
      <ButtonGroup aria-label="Days of the Week">
        {days.map((day, index) => (
          <Button
            key={index}
            variant={index === today ? "primary" : "secondary"}
            as={Link}
            to={day.path}
            //disabled={index !== today}   
            //remove teh double slash in above line  before demo
          >
            {day.name}
            
          </Button>
        ))}
      </ButtonGroup>
      <img src={"policevet.jpg"} alt="logo192.png" />
      <img src={"Monday.jpg"} alt="logo192.png" />
    </div>
  );
}

export default Home;
