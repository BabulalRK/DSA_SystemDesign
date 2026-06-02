import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmailPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (user.emailVerified) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleResend = async () => {
    if (!user) return;
    setIsResending(true);
    setMessage('');
    setError('');
    
    try {
      await sendEmailVerification(user);
      setMessage('Verification email sent! Please check your inbox and spam folder.');
    } catch (err) {
      console.error('Error resending verification:', err);
      if (err.code === 'auth/too-many-requests') {
        setError('We recently sent an email. Please wait a bit before requesting another.');
      } else {
        setError('Failed to resend verification email. Please try again later.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleRefresh = async () => {
    if (!user) return;
    // Force reload the user data from Firebase to get updated emailVerified status
    await user.reload();
    if (user.emailVerified) {
      navigate('/', { replace: true });
    } else {
      setError('Email is still not verified. Please click the link in the email we sent you.');
      setMessage('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-xl shadow-2xl text-center">
        <div>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            We've sent an email to <span className="font-bold text-white">{user.email}</span>. 
            Please click the link inside to verify your account and get started.
          </p>
        </div>

        {message && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 pt-4">
          <button
            onClick={handleRefresh}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            I've verified my email
          </button>
          
          <button
            onClick={handleResend}
            disabled={isResending}
            className={`w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors ${
              isResending ? 'bg-slate-700 text-slate-400 border-slate-600 cursor-not-allowed' : 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700'
            }`}
          >
            {isResending ? 'Sending...' : 'Resend verification email'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-sm text-slate-400 hover:text-white transition-colors pt-4"
          >
            Use a different account
          </button>
        </div>
      </div>
    </div>
  );
}
