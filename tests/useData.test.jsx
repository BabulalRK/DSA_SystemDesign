import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDoc } from 'firebase/firestore';
import { useData } from '../src/hooks/useData';

// Dummy component to consume useData
const TestComponent = ({ documentId }) => {
  const { data, isLoading, error } = useData(documentId);

  if (isLoading) return <div data-testid="status">Loading...</div>;
  if (error) return <div data-testid="status">Error</div>;

  return (
    <div data-testid="status">
      Success: {data?.message}
    </div>
  );
};

describe('useData Caching Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // We cannot easily clear the local module cache inside useData.js between tests
    // because it's a module-level variable. In a real app we might export a clearCache() function.
    // For this test, we will use uniquely named documentIds to ensure a clean cache per test.
  });

  it('fetches from Firestore on first request and caches it for the second request', async () => {
    // Mock successful fetch
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ data: { message: 'Hello from Firestore' } })
    });

    const uniqueId = 'test-doc-123';

    // First render
    const { unmount } = render(<TestComponent documentId={uniqueId} />);

    // Wait for fetch to complete
    expect(await screen.findByTestId('status')).toHaveTextContent('Success: Hello from Firestore');
    expect(getDoc).toHaveBeenCalledTimes(1);

    // Unmount the component to simulate leaving the page
    unmount();

    // Re-render the same component (simulate returning to the page)
    render(<TestComponent documentId={uniqueId} />);

    // It should immediately show the cached success state
    expect(await screen.findByTestId('status')).toHaveTextContent('Success: Hello from Firestore');

    // getDoc should NOT have been called a second time because it was cached!
    expect(getDoc).toHaveBeenCalledTimes(1);
  });
});
