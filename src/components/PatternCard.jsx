import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from './Icons';

const PatternCard = memo(({ pattern, isCompleted, basePath = '/dsa', studyText = 'Study Pattern', reviewText = 'Review Pattern' }) => {
  const completed = isCompleted(pattern.id);
  
  return (
    <Link to={`${basePath}/${pattern.id}`} className="block group h-full">
      <div className={`bg-white rounded-xl shadow-sm border p-6 h-full flex flex-col transition-all duration-300 ${completed ? 'border-green-400 shadow-green-100 bg-green-50/30' : 'border-slate-200 hover:shadow-md hover:border-blue-300'}`}>
        <div className="flex justify-between items-start mb-3">
          <h2 className={`text-xl font-bold ${completed ? 'text-green-700' : 'text-blue-700 group-hover:text-blue-800'}`}>
            {pattern.name}
          </h2>
          {completed && (
            <span className="bg-green-100 text-green-700 p-1 rounded-full" title="Completed">
              <CheckIcon className="w-5 h-5" />
            </span>
          )}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
          {pattern.summary}
        </p>
        <div className={`mt-6 flex items-center text-sm font-medium ${completed ? 'text-green-600' : 'text-blue-600 group-hover:text-blue-800'}`}>
          {completed ? reviewText : studyText}
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
});

// Setting displayName is useful for React DevTools
PatternCard.displayName = 'PatternCard';

export default PatternCard;
