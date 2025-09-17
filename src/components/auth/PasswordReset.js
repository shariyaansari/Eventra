import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUtils } from '../../config/api';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await apiUtils.post('/api/auth/password-reset', { email });
      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link sent! Check your email.');
        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
      } else {
        setError(data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // UPDATED: Main page background
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 mt-10">
      {/* UPDATED: Form card background and border */}
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg">
        {/* UPDATED: Title text */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {/* UPDATED: Label text */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email address"
              // UPDATED: Input styles
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 disabled:bg-gray-50 dark:disabled:bg-gray-700/50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            // UPDATED: Error message styles
            <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          {message && (
            // UPDATED: Success message styles
            <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-md text-sm">
              {message}
            </div>
          )}

          {/* Primary button works on both themes */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center">
          {/* UPDATED: Link color */}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;