import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabaseClient';

const ForgotPassword = ({ onBack, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        // Handle specific error cases
        if (error.message.includes('rate limit')) {
          setError('Too many requests. Please wait a moment before trying again.');
        } else if (error.message.includes('not found')) {
          setError('No account found with this email address.');
        } else if (error.message.includes('invalid email')) {
          setError('Please enter a valid email address.');
        } else {
          setError(error.message);
        }
      } else {
        setMessage('Password reset email sent! Check your inbox.');
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Email Sent!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. 
            Check your inbox and follow the instructions to reset your password.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={onBack}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700"
    >
      <div className="mb-6">
        <Button
          onClick={onBack}
          className="mb-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-sm text-green-600 dark:text-green-400">{message}</span>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={loading || !email.trim()}
          className="w-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Remember your password?{' '}
          <button
            onClick={onBack}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
          >
            Back to Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;

