import { useCallback } from 'react';
import { PaystackPop } from '@paystack/inline-js';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PAYSTACK_PUBLIC_KEY = 'pk_test_c1eef30e3149fc33a4f9c8969b0e4acc4c7c8585';

interface PaymentData {
  email: string;
  amount: number;
  metadata: {
    userId: string;
    planId: string;
    interval: string;
  };
}

export function usePaystack() {
  const { currentUser } = useAuth();

  const initializePayment = useCallback(async (paymentData: PaymentData) => {
    try {
      const paystack = new PaystackPop();
      
      await paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: paymentData.email,
        amount: paymentData.amount,
        metadata: paymentData.metadata,
        onSuccess: (transaction: any) => {
          // Call your backend API to verify and update subscription
          verifyPayment(transaction.reference);
          toast.success('Payment successful! Your subscription is now active.');
        },
        onCancel: () => {
          toast.error('Payment cancelled');
        }
      });
    } catch (error) {
      toast.error('Failed to initialize payment');
      console.error('Payment initialization error:', error);
    }
  }, [currentUser]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference })
      });
      
      if (!response.ok) {
        throw new Error('Payment verification failed');
      }
      
      // Update user subscription status in Firebase
      // This will be handled by the backend
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Failed to verify payment');
    }
  };

  return { initializePayment };
}