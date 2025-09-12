import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          setError('Invalid verification link');
          setVerificationStatus('error');
          return;
        }

        // Verify the email with Supabase
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (verifyError) {
          console.error('Verification error:', verifyError);
          setError(verifyError.message);
          setVerificationStatus('error');
        } else {
          setVerificationStatus('success');
          // Auto redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-saddle border border-chardonnay dark:border-twine rounded-2xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eastern-blue mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verifying your email...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we confirm your email address.
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-2xl shadow-sm p-8 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || 'There was an error verifying your email address.'}
          </p>
          <div className="space-y-3">
            <Link
              to="/signup"
              className="block w-full bg-eastern-blue hover:bg-kimberly text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Try Signing Up Again
            </Link>
            <Link
              to="/login"
              className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Email Verified Successfully! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your email address has been confirmed. You can now sign in to your account.
        </p>
        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In Now
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You will be automatically redirected to the dashboard in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
