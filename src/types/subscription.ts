export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  discount?: string;
}

export interface UserSubscription {
  status: 'free' | 'trial' | 'premium';
  plan?: string;
  trialEnds?: string;
  subscriptionEnds?: string;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  MONTHLY: {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 1200,
    interval: 'monthly',
    features: [
      'Unlimited Practice Questions',
      'Exam Mode Access',
      'Performance Analytics',
      'Priority Support'
    ]
  },
  YEARLY: {
    id: 'yearly',
    name: 'Yearly Premium',
    price: 12000,
    interval: 'yearly',
    discount: '17%',
    features: [
      'All Monthly Features',
      'Study Group Access',
      'Offline Access',
      'Premium Study Resources'
    ]
  }
};