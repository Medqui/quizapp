import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface PremiumFeatureGuardProps {
  children: React.ReactNode;
}

export default function PremiumFeatureGuard({ children }: PremiumFeatureGuardProps) {
  const { userData } = useAuth();
  const isPremium = userData?.subscription?.status === 'premium';
  const isTrialing = userData?.subscription?.status === 'trial';

  if (isPremium || isTrialing) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
        <div className="text-center p-6">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Feature</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upgrade to Premium to access this feature
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Plans
          </Link>
        </div>
      </div>
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
    </div>
  );
}