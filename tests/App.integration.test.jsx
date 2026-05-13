import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../src/App';

describe('App Integration', () => {
  beforeEach(() => {
    // Set up the initial path to match the BrowserRouter basename
    window.history.pushState({}, 'Test page', '/DSA_SystemDesign/');
  });

  it('renders home page and navigates to DSA page', async () => {
    render(<App />);

    // Check Home page content
    expect(screen.getByRole('heading', { name: /Master DSA & System Design/i })).toBeInTheDocument();
    
    // Find the DSA card/link text
    const dsaLink = screen.getByText('Data Structures & Algorithms');
    expect(dsaLink).toBeInTheDocument();

    // Simulate clicking the link
    fireEvent.click(dsaLink);

    // After clicking, it should navigate and show the DSA page content
    expect(await screen.findByText('Top 20 DSA Patterns')).toBeInTheDocument();
  });
});
