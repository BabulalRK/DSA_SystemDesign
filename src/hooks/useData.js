import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const documentCache = {};

export function useData(documentId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Return from cache immediately if available
      if (documentCache[documentId]) {
        setData(documentCache[documentId]);
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'staticData', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data().data;
          documentCache[documentId] = docData; // Save to cache
          setData(docData);
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
