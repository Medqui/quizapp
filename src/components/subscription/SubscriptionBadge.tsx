import React from 'react';
import { Crown, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { UserSubscription } from '../../types/subscription';

interface SubscriptionBadgeProps {
  subscription: UserSubscription;
}

export default function SubscriptionBadge({ subscription }: SubscriptionBadgeProps) {
  if (subscription.status === 'free') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Free Plan
      </span>
    );
  }

  if (subscription.status === 'trial') {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <Clock className="w-4 h-4 mr-1" />
        Trial ends {subscription.trialEnds && format(new Date(subscription.trialEnds), 'MMM d, yyyy')}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <Crown className="w-4 h-4 mr-1" />
      Premium until {subscription.subscriptionEnds && format(new Date(subscription.subscriptionEnds), 'MMM d, yyyy')}
    </div>
  );
}