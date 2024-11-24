import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { usePaystack } from '../../hooks/usePaystack';
import { useAuth } from '../../contexts/AuthContext';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
}

export default function SubscriptionCard({ plan, isPopular }: SubscriptionCardProps) {
  const { initializePayment } = usePaystack();
  const { currentUser } = useAuth();

  const handleSubscribe = async () => {
    if (!currentUser) return;

    const paymentData = {
      email: currentUser.email!,
      amount: plan.price * 100, // Convert to kobo
      metadata: {
        userId: currentUser.uid,
        planId: plan.id,
        interval: plan.interval
      }
    };

    initializePayment(paymentData);
  };

  return (
    <div className={`relative p-8 bg-white rounded-xl shadow-sm border ${
      isPopular ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <p className="mt-4 text-5xl font-extrabold text-gray-900">
          ₦{plan.price.toLocaleString()}
          <span className="text-xl font-medium text-gray-500">/{plan.interval}</span>
        </p>
        {plan.discount && (
          <p className="mt-1 text-sm text-green-600">Save {plan.discount}</p>
        )}
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 shrink-0" />
            <span className="ml-3 text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        className={`mt-8 w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
          isPopular
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-800 hover:bg-gray-900'
        }`}
      >
        Subscribe Now
      </button>
    </div>
  );
}