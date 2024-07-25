import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';

export const StudentsContext = createContext();

const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await db.collection('students').get();
      const studentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    };

    fetchStudents();
  }, []);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
