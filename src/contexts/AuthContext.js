// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        setUser({ uid: user.uid, ...userDoc.data() });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
