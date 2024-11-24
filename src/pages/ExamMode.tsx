import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clock, AlertCircle } from 'lucide-react';
import { departments } from '../data/questions';
import { getQuestions } from '../services/questionService';
import toast from 'react-hot-toast';

interface ExamSettings {
  duration: number; // in minutes
  questionCount: number;
}

export default function ExamMode() {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const [examSettings, setExamSettings] = useState<ExamSettings>({
    duration: 45, // default 45 minutes
    questionCount: 60, // default 60 questions
  });
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const selectedDepartment = departments.find(d => d.id === selectedDept);
  const selectedCourseData = selectedDepartment?.courses.find(c => c.id === selectedCourse);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = async () => {
    if (!selectedDept || !selectedCourse || !selectedYear) {
      toast.error('Please select all fields');
      return;
    }

    setLoading(true);
    try {
      const fetchedQuestions = await getQuestions(selectedDept, selectedCourse, selectedYear as number);
      if (fetchedQuestions.length < examSettings.questionCount) {
        toast.error('Not enough questions available for the selected exam settings');
        return;
      }
      
      // Randomly select questions based on questionCount
      const shuffled = fetchedQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, examSettings.questionCount));
      setAnswers(new Array(examSettings.questionCount).fill(null));
      setTimeRemaining(examSettings.duration * 60); // Convert minutes to seconds
      setExamStarted(true);
    } catch (error) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
  };

  const handleSubmitExam = () => {
    const score = answers.reduce((acc, answer, idx) => {
      if (answer === questions[idx]?.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    navigate('/exam-results', {
      state: {
        score,
        totalQuestions: questions.length,
        questions,
        answers,
        timeSpent: examSettings.duration * 60 - timeRemaining,
        courseName: selectedCourseData?.name || '',
        year: selectedYear,
      },
    });
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Exam Mode</h1>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Settings
              </button>
            </div>

            {showSettings && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={examSettings.duration}
                      onChange={(e) => setExamSettings(prev => ({
                        ...prev,
                        duration: parseInt(e.target.value) || 45
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={examSettings.questionCount}
                      onChange={(e) => setExamSettings(prev => ({
                        ...prev,
                        questionCount: parseInt(e.target.value) || 60
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedCourse('');
                    setSelectedYear('');
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {selectedDept && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedYear('');
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Course</option>
                    {selectedDepartment?.courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Year</option>
                    {selectedCourseData?.years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This is a timed exam mode. Once started:
                    </p>
                    <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                      <li>You cannot pause or restart the exam</li>
                      <li>Answers cannot be changed once submitted</li>
                      <li>Explanations will only be shown after completion</li>
                      <li>The exam will auto-submit when time runs out</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartExam}
                disabled={loading || !selectedDept || !selectedCourse || !selectedYear}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Start Exam'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Timer and Progress */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className={`text-xl font-bold ${
                timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {questions[currentQuestionIndex]?.question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestionIndex]?.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answers[currentQuestionIndex] !== null}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    answers[currentQuestionIndex] === index
                      ? 'bg-indigo-100 border-indigo-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } border ${
                    answers[currentQuestionIndex] !== null ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-8 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
                    currentQuestionIndex === index
                      ? 'bg-indigo-600 text-white'
                      : answers[index] !== null
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}