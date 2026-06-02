import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export function useProgress(key) {
  const { user, isAuthenticated } = useAuth();
  const [completedItems, setCompletedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      if (!isAuthenticated || !user) {
        setCompletedItems([]);
        setIsLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.progress && data.progress[key]) {
            setCompletedItems(data.progress[key]);
          } else {
            setCompletedItems([]);
          }
        } else {
          setCompletedItems([]);
        }
      } catch (error) {
        console.error("Error loading progress: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProgress();
  }, [user, isAuthenticated, key]);

  const toggleItem = async (id) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(item => item !== id)
      : [...completedItems, id];

    setCompletedItems(newItems);

    if (user && isAuthenticated) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, {
          progress: {
            [key]: newItems
          }
        }, { merge: true });
      } catch (error) {
        console.error("Error saving progress: ", error);
      }
    }
  };

  const isCompleted = (id) => completedItems.includes(id);

  const getProgressPercentage = (totalItems) => {
    if (totalItems === 0) return 0;
    return Math.round((completedItems.length / totalItems) * 100);
  };

  return { completedItems, toggleItem, isCompleted, getProgressPercentage, isLoading };
}