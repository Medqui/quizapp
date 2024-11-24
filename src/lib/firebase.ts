import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { seedQuestions } from '../services/questionService';

const firebaseConfig = {
  apiKey: "AIzaSyAkU8LoAXeg5GiwfhJFvANI8he8lKH5IhI",
  authDomain: "medquiz-15723.firebaseapp.com",
  projectId: "medquiz-15723",
  storageBucket: "medquiz-15723.firebasestorage.app",
  messagingSenderId: "1075020441968",
  appId: "1:1075020441968:web:6d9393932c9a1fd9a1c7b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Seed questions if they don't exist
async function initializeDatabase() {
  try {
    const questionsRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsRef);
    
    if (snapshot.empty) {
      await seedQuestions();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();