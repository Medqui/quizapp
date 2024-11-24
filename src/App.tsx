import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import AdminGuard from './components/AdminGuard';
import LandingPage from './pages/LandingPage';
import QuizApp from './pages/QuizApp';
import ExamMode from './pages/ExamMode';
import ExamResults from './pages/ExamResults';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminSignup from './pages/AdminSignup';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminsignup" element={<AdminSignup />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <UserDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/quiz"
          element={
            <AuthGuard>
              <QuizApp />
            </AuthGuard>
          }
        />
        <Route
          path="/exam"
          element={
            <AuthGuard>
              <ExamMode />
            </AuthGuard>
          }
        />
        <Route
          path="/exam-results"
          element={
            <AuthGuard>
              <ExamResults />
            </AuthGuard>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
