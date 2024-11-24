import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Clock, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveQuizResult } from '../services/quizService';
import toast from 'react-hot-toast';

interface ExamResultsState {
  score: number;
  totalQuestions: number;
  questions: any[];
  answers: (number | null)[];
  timeSpent: number;
  courseName: string;
  year: number;
}

export default function ExamResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const state = location.state as ExamResultsState;

  useEffect(() => {
    if (!state) {
      navigate('/dashboard');
      return;
    }

    async function saveResult() {
      if (!currentUser) return;

      try {
        await saveQuizResult({
          userId: currentUser.uid,
          courseName: state.courseName,
          year: state.year,
          score: state.score,
          totalQuestions: state.totalQuestions,
          answers: state.answers.map(a => a ?? -1),
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        toast.error('Failed to save exam result');
      }
    }

    saveResult();
  }, []);

  if (!state) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const percentage = Math.round((state.score / state.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <Trophy className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h1>
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>Time taken: {formatTime(state.timeSpent)}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-indigo-600 mb-2">{percentage}%</div>
            <p className="text-xl text-gray-600">
              You scored {state.score} out of {state.totalQuestions} questions correctly
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
            <div className="space-y-6">
              {state.questions.map((question, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    state.answers[index] === question.correctAnswer
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className="font-medium mb-2">{question.question}</p>
                  <p className="text-sm">
                    <span className="font-medium">Your answer: </span>
                    {state.answers[index] !== null
                      ? question.options[state.answers[index]]
                      : 'Not answered'}
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

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/quiz?mode=exam')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Take Another Exam
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}