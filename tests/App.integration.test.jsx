import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { onAuthStateChanged } from 'firebase/auth';
import App from '../src/App';

describe('App Integration & Routing', () => {
  beforeEach(() => {
    // Reset path
    window.history.pushState({}, 'Test page', '/DSA_SystemDesign/');
    vi.clearAllMocks();
  });

  it('redirects unauthenticated users to the login page', async () => {
    // Mock onAuthStateChanged to simulate an unauthenticated user
    onAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(null); // Not logged in
      return () => {};
    });

    await act(async () => {
      render(<App />);
    });

    // Check that we are on the login page by looking for the "Sign in to StudyHub" heading
    expect(await screen.findByRole('heading', { name: /Sign in to StudyHub/i })).toBeInTheDocument();
  });

  it('allows authenticated and verified users to view the Home page', async () => {
    // Mock onAuthStateChanged to simulate a verified user
    onAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback({ uid: 'test-user-123', emailVerified: true });
      return () => {};
    });

    await act(async () => {
      render(<App />);
    });

    // Check Home page content is rendered successfully
    expect(await screen.findByRole('heading', { name: /Master DSA & System Design/i })).toBeInTheDocument();
  });
});
