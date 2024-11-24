import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../types/subscription';
import SubscriptionCard from '../components/subscription/SubscriptionCard';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start with a 7-day free trial. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <SubscriptionCard plan={SUBSCRIPTION_PLANS.MONTHLY} />
          <SubscriptionCard plan={SUBSCRIPTION_PLANS.YEARLY} isPopular />
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">What's included in the free trial?</h4>
              <p className="mt-2 text-gray-600">
                You get full access to all premium features for 7 days, including exam mode and performance analytics.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">Can I cancel my subscription?</h4>
              <p className="mt-2 text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">How do I get a refund?</h4>
              <p className="mt-2 text-gray-600">
                If you're not satisfied with your subscription, contact our support team within 14 days of purchase for a full refund.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">What payment methods do you accept?</h4>
              <p className="mt-2 text-gray-600">
                We accept all major credit/debit cards, bank transfers, and mobile money through our secure payment provider, Paystack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}