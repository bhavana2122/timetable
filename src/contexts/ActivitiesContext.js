// src/contexts/ActivitiesContext.js
import React, { createContext, useState } from 'react';
import { db } from '../firebase';

export const ActivitiesContext = createContext();

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async (day) => {
    try {
      const activitiesRef = db.collection('activities').doc(day);
      const doc = await activitiesRef.get();
      if (doc.exists) {
        setActivities(doc.data().activities || []);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities: ", error);
    }
  };

  const saveActivities = async (day, activities) => {
    try {
      await db.collection('activities').doc(day).set({ activities });
    } catch (error) {
      console.error("Error saving activities: ", error);
    }
  };

  return (
    <ActivitiesContext.Provider value={{ activities, fetchActivities, setActivities, saveActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export default ActivitiesProvider;
