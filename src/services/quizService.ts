import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Question } from '../data/questions';

export interface QuizResultData {
  userId: string;
  courseName: string;
  year: number;
  score: number;
  totalQuestions: number;
  answers: number[];
  timestamp: string;
}

export async function saveQuizResult(data: QuizResultData) {
  try {
    const quizRef = collection(db, 'quizResults');
    await addDoc(quizRef, data);
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
}