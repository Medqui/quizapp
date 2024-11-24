import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Brain, Award, Clock, CheckCircle, Users, Zap, Shield, X, Menu } from 'lucide-react';

export default function LandingPage() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">UNICAL MedQuiz</span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </a>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="/login"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>
          <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <Link
              to="/login"
              className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link
              to="/signup"
              className="block w-full px-5 py-3 text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>

      <main>
        {/* Hero Section */}
        <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Master Medical Knowledge</span>
                <span className="block text-indigo-600">With Past Questions</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Practice with real past questions from UNICAL Medical School. Enhance your understanding with detailed explanations and track your progress.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  to="/quiz"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Practicing Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Why Choose UNICAL MedQuiz?</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-indigo-600" />}
                title="Comprehensive Coverage"
                description="Access questions from both Pre-clinical and Clinical years across multiple courses."
              />
              <FeatureCard
                icon={<Award className="h-6 w-6 text-indigo-600" />}
                title="Detailed Explanations"
                description="Learn from detailed explanations for each question to understand core concepts better."
              />
              <FeatureCard
                icon={<Clock className="h-6 w-6 text-indigo-600" />}
                title="Practice at Your Pace"
                description="Skip questions, come back later, and track your progress as you learn."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-indigo-600" />}
                title="Community Support"
                description="Join a community of medical students to discuss questions and share insights."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-indigo-600" />}
                title="Performance Analytics"
                description="Get detailed insights into your performance and identify areas for improvement."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-indigo-600" />}
                title="Up-to-Date Content"
                description="Our questions are regularly updated to reflect the latest medical knowledge and exam patterns."
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <PricingCard
                title="Basic"
                price="Free"
                features={[
                  "Access to 100+ practice questions",
                  "Basic performance tracking",
                  "Community forum access"
                ]}
                ctaText="Get Started"
                ctaLink="/signup"
              />
              <PricingCard
                title="Pro"
                price="₦2,500/month"
                features={[
                  "Unlimited access to all questions",
                  "Detailed explanations and study notes",
                  "Advanced performance analytics",
                  "Priority community support"
                ]}
                ctaText="Go Pro"
                ctaLink="/signup-pro"
                highlighted={true}
              />
              <PricingCard
                title="Institution"
                price="Custom"
                features={[
                  "Everything in Pro plan",
                  "Custom question sets",
                  "Integration with school LMS",
                  "Dedicated support manager"
                ]}
                ctaText="Contact Sales"
                ctaLink="/contact"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">About</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-500">© 2024 UNICAL MedQuiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, ctaText, ctaLink, highlighted = false }: { 
  title: string; 
  price: string; 
  features: string[]; 
  ctaText: string; 
  ctaLink: string; 
  highlighted?: boolean; 
}) {
  return (
    <div className={`relative p-8 bg-white rounded-xl shadow-sm border ${highlighted ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'} transition-all duration-300 hover:shadow-md`}>
      {highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            Most Popular
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-4xl font-extrabold text-gray-900 mb-6">{price}</p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to={ctaLink}
        className={`mt-8 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
          highlighted
            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
            : 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200'
        }`}
      >
        {ctaText}
      </Link>
    </div>
  );
}

