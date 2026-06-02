import { useState, useEffect, useRef } from 'react';

export function useProgress(key) {
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(completedItems));
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [completedItems, key]);

  const toggleItem = (id) => {
    setCompletedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isCompleted = (id) => completedItems.includes(id);

  const getProgressPercentage = (totalItems) => {
    if (totalItems === 0) return 0;
    return Math.round((completedItems.length / totalItems) * 100);
  };

  return { completedItems, toggleItem, isCompleted, getProgressPercentage };
}