import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Users, BookOpen, LogOut, BarChart } from 'lucide-react';
import QuestionForm from '../components/admin/QuestionForm';
import UsersList from '../components/admin/UsersList';
import QuestionsList from '../components/admin/QuestionsList';
import CoursesList from '../components/admin/CoursesList';

type Tab = 'questions' | 'users' | 'add-question' | 'courses' | 'analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('questions');
  const { logout, userData } = useAuth();
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
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {userData?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('questions')}
                className={`${
                  activeTab === 'questions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Questions
              </button>
              <button
                onClick={() => setActiveTab('add-question')}
                className={`${
                  activeTab === 'add-question'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Question
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`${
                  activeTab === 'courses'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Courses
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <Users className="h-5 w-5 mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`${
                  activeTab === 'analytics'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BarChart className="h-5 w-5 mr-2" />
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'questions' && <QuestionsList />}
        {activeTab === 'add-question' && <QuestionForm />}
        {activeTab === 'courses' && <CoursesList />}
        {activeTab === 'users' && <UsersList />}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics Dashboard</h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}