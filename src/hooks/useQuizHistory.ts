import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export interface QuizResult {
  courseName: string;
  year: number;
  score: number;
  totalQuestions: number;
  timestamp: string;
  answers: number[];
}

export function useQuizHistory() {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchQuizHistory() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const quizRef = collection(db, 'quizResults');
        const q = query(
          quizRef,
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as QuizResult[];
        
        setQuizHistory(history);
      } catch (error) {
        console.error('Error fetching quiz history:', error);
        toast.error('Failed to load quiz history');
      } finally {
        setLoading(false);
      }
    }

    fetchQuizHistory();
  }, [currentUser]);

  return { quizHistory, loading };
}