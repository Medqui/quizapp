import React from 'react';
import { Question } from '../data/questions';
import { Trophy, RefreshCw, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveQuizResult } from '../services/quizService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  answers: (number | null)[];
  questions: Question[];
  courseName: string;
  year: number;
}

export default function QuizResults({
  score,
  totalQuestions,
  onRetry,
  answers,
  questions,
  courseName,
  year,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function saveResult() {
      if (!currentUser) return;

      try {
        await saveQuizResult({
          userId: currentUser.uid,
          courseName,
          year,
          score,
          totalQuestions,
          answers: answers.map(a => a ?? -1),
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        toast.error('Failed to save quiz result');
      }
    }

    saveResult();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
          <Trophy className="h-8 w-8 text-indigo-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
        
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {percentage}%
        </div>
        
        <p className="text-xl text-gray-600 mb-8">
          You scored {score} out of {totalQuestions} questions correctly
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          >
            <User className="mr-2 h-5 w-5" />
            View Profile
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Question Review</h3>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                answers[index] === question.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-medium mb-2">{question.question}</p>
              <p className="text-sm">
                <span className="font-medium">Your answer: </span>
                {answers[index] !== null
                  ? question.options[answers[index]]
                  : 'Skipped'}
              </p>
              <p className="text-sm">
                <span className="font-medium">Correct answer: </span>
                {question.options[question.correctAnswer]}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                {question.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}