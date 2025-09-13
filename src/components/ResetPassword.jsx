import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a valid session for password reset
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate passwords
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password updated successfully!');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
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
              Password Updated!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
            
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600"
            >
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
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
            disabled={loading}
            className="w-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
