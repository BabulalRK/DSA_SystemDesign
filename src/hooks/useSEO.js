import { useEffect } from 'react';

/**
 * A custom hook to dynamically update the document title and meta description.
 * Ensures the web app is SEO friendly and provides accurate context for crawlers and browser tabs.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    // 1. Update Title Tag
    if (title) {
      document.title = `${title} | StudyHub`;
    } else {
      document.title = 'StudyHub';
    }

    // 2. Update Meta Description Tag
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.content = description;
    }
  }, [title, description]);
}
