import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  courseId: string;
  departmentId: string;
}

export default function QuestionOfTheDay() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  async function fetchRandomQuestion() {
    try {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(query(questionsRef));
      const questions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setQuestion(questions[randomIndex]);
      }
    } catch (error) {
      toast.error('Failed to load question of the day');
    } finally {
      setLoading(false);
    }
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No questions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Question of the Day</h3>
      
      <div className="space-y-4">
        <p className="text-gray-800">{question.question}</p>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showAnswer && handleAnswerSelect(index)}
              disabled={showAnswer}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                showAnswer
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-50'
                  : 'bg-gray-50 hover:bg-gray-100'
              } ${
                showAnswer && 'cursor-default'
              } border`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showAnswer && index === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {showAnswer && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showAnswer && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}

        {showAnswer && (
          <button
            onClick={() => {
              setShowAnswer(false);
              setSelectedAnswer(null);
              fetchRandomQuestion();
            }}
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Another Question
          </button>
        )}
      </div>
    </div>
  );
}