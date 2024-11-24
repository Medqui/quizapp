import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trophy, Clock, BookOpen } from 'lucide-react';
import { useQuizHistory } from '../hooks/useQuizHistory';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { quizHistory, loading } = useQuizHistory();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quiz History</h2>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : quizHistory.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No quiz attempts yet</p>
                <button
                  onClick={() => navigate('/quiz')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Take a Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {quizHistory.map((quiz, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{quiz.courseName}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Year: {quiz.year}</p>
                        <p>Score: {quiz.score}/{quiz.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-green-600">
                        <Trophy className="h-5 w-5 mr-1" />
                        <span>{Math.round((quiz.score / quiz.totalQuestions) * 100)}%</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>{new Date(quiz.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}