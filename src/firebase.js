import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import defaultActivities from './defaultActivities';

const firebaseConfig = {
  apiKey: "AIzaSyCHtjgV7D6VAYRuh0al6hJ4H9jz-891670",
  authDomain: "learningtt-a077c.firebaseapp.com",
  projectId: "learningtt-a077c",
  storageBucket: "learningtt-a077c.appspot.com",
  messagingSenderId: "331441197689",
  appId: "1:331441197689:web:f394c17d21272cc1a9faa8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

const addStudent = async (student) => {
  await db.collection('students').add(student);
};

const addActivity = async (day, activity) => {
  try {
    const activitiesRef = db.collection('activities').doc(day);
    const doc = await activitiesRef.get();
    if (doc.exists) {
      const currentActivities = doc.data().activities || [];
      await activitiesRef.update({ activities: [...currentActivities, activity] });
    } else {
      await activitiesRef.set({ activities: [activity] });
    }
  } catch (error) {
    console.error('Error adding activity:', error);
  }
};

const initializeDefaultActivitiesForUser = async (user) => {
  if (user) {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      const role = userDoc.data().role;
      if (['Admin', 'Teacher'].includes(role)) {
        const days = Object.keys(defaultActivities);
        for (const day of days) {
          const activitiesRef = db.collection('activities').doc(day);
          const doc = await activitiesRef.get();
          if (!doc.exists) {
            await activitiesRef.set({ activities: defaultActivities[day] });
          }
        }
      }
    }
  }
};

export { db, auth, addStudent, addActivity, initializeDefaultActivitiesForUser };
