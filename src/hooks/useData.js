import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useData(documentId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'staticData', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().data);
        } else {
          setError('Document not found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [documentId]);

  return { data, isLoading, error };
}
