import { useState, useEffect } from 'react';

export function useProgress(key) {
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(completedItems));
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