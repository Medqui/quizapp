import React, { useState, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import QuestionNav from '../components/QuestionNav';
import QuizResults from '../components/QuizResults';
import { GraduationCap, BookOpen, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { departments } from '../data/questions';
import { getQuestions } from '../services/questionService';
import toast from 'react-hot-toast';

function QuizApp() {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // Timer in seconds (default: 5 minutes) [MODIFICATION]
  const [isTimedMode, setIsTimedMode] = useState(false); // To determine if it's exam mode [MODIFICATION]
  const { logout } = useAuth();
  const navigate = useNavigate();

  const selectedDepartment = departments.find(d => d.id === selectedDept);
  const selectedCourseData = selectedDepartment?.courses.find(c => c.id === selectedCourse);

  useEffect(() => {
    async function loadQuestions() {
      if (selectedDept && selectedCourse && selectedYear) {
        setLoading(true);
        try {
          const fetchedQuestions = await getQuestions(selectedDept, selectedCourse, selectedYear as number);
          setQuestions(fetchedQuestions);
        } catch (error) {
          toast.error('Failed to load questions');
        } finally {
          setLoading(false);
        }
      }
    }

    loadQuestions();
  }, [selectedDept, selectedCourse, selectedYear]);

  // Timer Logic: Countdown and auto-submit when time reaches 0 [MODIFICATION]
  useEffect(() => {
    if (quizStarted && isTimedMode && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on unmount
    }

    if (timeRemaining === 0 && isTimedMode) {
      setShowResults(true); // Auto-submit when time ends
    }
  }, [timeRemaining, quizStarted, isTimedMode]);

  const formatTime = (time: number) => {
    // Format seconds to mm:ss [MODIFICATION]
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleStartQuiz = (timedMode = false) => {
    // Initialize quiz and timer based on mode [MODIFICATION]
    setQuizStarted(true);
    setIsTimedMode(timedMode); // Set whether this is a timed exam mode
    setScore(0);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setShowResults(false);
    setTimeRemaining(timedMode ? 300 : 0); // 5 minutes for timed mode
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(Boolean(answers[currentQuestionIndex - 1] !== null));
    }
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
    setShowExplanation(true);
    
    const correctAnswers = newAnswers.reduce((acc, answer, idx) => {
      if (answer === questions[idx]?.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(correctAnswers);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(Boolean(answers[index] !== null));
  };

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">UNICAL Medical Quiz</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : !quizStarted ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedCourse('');
                    setSelectedYear('');
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {selectedDept && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedYear('');
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a course</option>
                    {selectedDepartment?.courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a year</option>
                    {selectedCourseData?.years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-4">
                <button
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleStartQuiz(false)} // Normal mode [MODIFICATION]
                  disabled={!selectedYear || questions.length === 0}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Quiz (Normal Mode)
                </button>
                <button
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleStartQuiz(true)} // Timed mode [MODIFICATION]
                  disabled={!selectedYear || questions.length === 0}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Quiz (Exam Mode)
                </button>
              </div>
            </div>
          </div>
        ) : showResults ? (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            onRetry={handleStartQuiz}
            answers={answers}
            questions={questions}
            courseName={selectedCourseData?.name || ''}
            year={selectedYear as number}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="text-lg font-semibold text-indigo-600">
                Score: {score}/{questions.length}
              </div>
              {isTimedMode && ( // Show timer only in Exam Mode [MODIFICATION]
                <div className="text-lg font-semibold text-red-600">
                  Time Left: {formatTime(timeRemaining)}
                </div>
              )}
            </div>

            <QuestionNav
              totalQuestions={questions.length}
              currentQuestion={currentQuestionIndex}
              answers={answers}
              onQuestionSelect={handleQuestionSelect}
            />

            {questions.length > 0 && (
              <QuizCard
                question={questions[currentQuestionIndex]}
                selectedAnswer={answers[currentQuestionIndex]}
                onSelectAnswer={handleAnswerSelect}
                showExplanation={showExplanation}
              />
            )}

            <div className="flex justify-between">
              <button
                className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setQuizStarted(false);
                  setAnswers([]);
                  setShowExplanation(false);
                }}
              >
                Exit Quiz
              </button>

              <div className="space-x-4">
                <button
                  className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : answers[currentQuestionIndex] === null ? 'Skip' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default QuizApp;
