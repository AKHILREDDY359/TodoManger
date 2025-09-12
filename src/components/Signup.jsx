import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        // If email confirmations are disabled, Supabase returns a session and we can redirect now.
        if (data.session) {
          alert('✅ Account created and signed in!');
          navigate('/dashboard');
        } else {
          // If confirmations are enabled, user needs to check email
          alert('✅ Account created! Please check your email to confirm your account, then you can sign in.');
          navigate('/login');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-saddle border border-chardonnay dark:border-twine rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create an account</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Start managing your tasks</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-eastern-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-eastern-blue focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eastern-blue hover:bg-kimberly disabled:opacity-60 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-eastern-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
