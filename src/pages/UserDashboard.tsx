import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { BookOpen, Clock, Trophy, LogOut, Timer } from 'lucide-react';
import QuestionOfTheDay from '../components/QuestionOfTheDay';
import StudyPlan from '../components/StudyPlan';

export default function UserDashboard() {
  const { currentUser, userData, logout } = useAuth();
  const { quizHistory, loading } = useQuizHistory();
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {userData?.name}!
                  </h1>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  to="/quiz"
                  className="bg-indigo-50 p-6 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Practice Mode
                      </h2>
                      <p className="text-sm text-gray-500">
                        Take your time to practice and learn
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/exam"
                  className="bg-green-50 p-6 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Timer className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Exam Mode
                      </h2>
                      <p className="text-sm text-gray-500">
                        Test yourself under time pressure
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Question of the Day */}
            <QuestionOfTheDay />

            {/* Recent Quiz History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Quiz History
              </h2>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : quizHistory.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No quiz attempts yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizHistory.slice(0, 5).map((quiz, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {quiz.courseName}
                        </h3>
                        <div className="text-sm text-gray-500">
                          <p>Year: {quiz.year}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(quiz.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-green-600">
                          <Trophy className="h-5 w-5 mr-1" />
                          <span>
                            {Math.round(
                              (quiz.score / quiz.totalQuestions) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Study Plan */}
          <div className="lg:col-span-1">
            <StudyPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
