import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// A dummy component to consume the AuthContext methods
const DummyComponent = () => {
  const { login, signup, logout } = useAuth();
  const [result, setResult] = React.useState(null);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    setResult(res);
  };

  const handleSignup = async (email, password) => {
    const res = await signup(email, password);
    setResult(res);
  };

  return (
    <div>
      <div data-testid="result">{JSON.stringify(result)}</div>
      <button onClick={() => handleLogin('test@example.com', 'password')}>Login Unverified</button>
      <button onClick={() => handleLogin('verified@example.com', 'password')}>Login Verified</button>
      <button onClick={() => handleLogin('admin@example.com', 'password')}>Login Admin</button>
      <button onClick={() => handleSignup('new@example.com', 'password')}>Signup</button>
    </div>
  );
};

const renderWithContext = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <DummyComponent />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AuthContext Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('blocks unverified users from logging in', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com', emailVerified: false, uid: '123' }
    });
    getDoc.mockResolvedValueOnce({
      exists: () => false,
      data: () => ({})
    });

    await act(async () => {
      renderWithContext();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Login Unverified'));
    });

    expect(screen.getByTestId('result')).toHaveTextContent('Please check your inbox and verify your email before logging in.');
  });

  it('allows verified users to log in', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'verified@example.com', emailVerified: true, uid: '123' }
    });

    await act(async () => {
      renderWithContext();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Login Verified'));
    });

    expect(screen.getByTestId('result')).toHaveTextContent('{"success":true}');
  });

  it('allows unverified admins to log in via bypass', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'admin@example.com', emailVerified: false, uid: 'admin-123' }
    });
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ isAdmin: true })
    });

    await act(async () => {
      renderWithContext();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Login Admin'));
    });

    expect(screen.getByTestId('result')).toHaveTextContent('{"success":true}');
  });

  it('handles signup and sends verification email', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'new@example.com', uid: 'new-123' }
    });
    sendEmailVerification.mockResolvedValueOnce(true);

    await act(async () => {
      renderWithContext();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Signup'));
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(sendEmailVerification).toHaveBeenCalled();
    expect(screen.getByTestId('result')).toHaveTextContent('{"success":true}');
  });
});
