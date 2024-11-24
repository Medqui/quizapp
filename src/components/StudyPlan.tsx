import React from 'react';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { BookOpen, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface CoursePerformance {
  courseName: string;
  attempts: number;
  averageScore: number;
}

export default function StudyPlan() {
  const { quizHistory, loading } = useQuizHistory();

  const calculateCoursePerformance = (): CoursePerformance[] => {
    const courseStats: Record<string, { totalScore: number; attempts: number }> = {};

    quizHistory.forEach(quiz => {
      if (!courseStats[quiz.courseName]) {
        courseStats[quiz.courseName] = { totalScore: 0, attempts: 0 };
      }
      courseStats[quiz.courseName].totalScore += (quiz.score / quiz.totalQuestions) * 100;
      courseStats[quiz.courseName].attempts += 1;
    });

    return Object.entries(courseStats).map(([courseName, stats]) => ({
      courseName,
      attempts: stats.attempts,
      averageScore: stats.totalScore / stats.attempts
    })).sort((a, b) => a.averageScore - b.averageScore);
  };

  const getRecommendations = (performance: CoursePerformance[]) => {
    const recommendations = [];
    
    // Find weakest subjects (below 60%)
    const weakSubjects = performance.filter(p => p.averageScore < 60);
    if (weakSubjects.length > 0) {
      recommendations.push({
        title: 'Priority Focus Areas',
        courses: weakSubjects.map(s => s.courseName),
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        description: 'These subjects need immediate attention. Focus on understanding core concepts.'
      });
    }

    // Find subjects that need improvement (60-75%)
    const improvementSubjects = performance.filter(p => p.averageScore >= 60 && p.averageScore < 75);
    if (improvementSubjects.length > 0) {
      recommendations.push({
        title: 'Areas for Improvement',
        courses: improvementSubjects.map(s => s.courseName),
        icon: <TrendingUp className="h-5 w-5 text-yellow-500" />,
        description: 'You\'re doing okay, but there\'s room for improvement. Practice more questions.'
      });
    }

    // Strong subjects (above 75%)
    const strongSubjects = performance.filter(p => p.averageScore >= 75);
    if (strongSubjects.length > 0) {
      recommendations.push({
        title: 'Strong Areas',
        courses: strongSubjects.map(s => s.courseName),
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        description: 'Keep up the good work! Consider helping others or exploring advanced topics.'
      });
    }

    return recommendations;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (quizHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Complete some quizzes to get personalized study recommendations</p>
        </div>
      </div>
    );
  }

  const performance = calculateCoursePerformance();
  const recommendations = getRecommendations(performance);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Study Plan</h3>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              {rec.icon}
              <h4 className="ml-2 font-medium text-gray-900">{rec.title}</h4>
            </div>
            <ul className="list-disc list-inside mb-2 text-gray-600">
              {rec.courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">{rec.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-2">Study Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>Focus on understanding concepts rather than memorizing</li>
          <li>Take regular breaks to maintain concentration</li>
          <li>Review explanations for both correct and incorrect answers</li>
          <li>Practice questions daily to build consistency</li>
        </ul>
      </div>
    </div>
  );
}