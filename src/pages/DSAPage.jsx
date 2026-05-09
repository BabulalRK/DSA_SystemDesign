import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dsaPatterns } from '../data/dsaPatterns';
import { useProgress } from '../hooks/useProgress';

export default function DSAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isCompleted, getProgressPercentage } = useProgress('dsa-progress');

  const filteredPatterns = dsaPatterns.filter(pattern => 
    pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progress = getProgressPercentage(dsaPatterns.length);

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200 pb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Top 20 DSA Patterns</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Mastering these 20 patterns will help you solve 80% of the questions asked in MAANG software engineering interviews.
          </p>
        </div>
        
        {/* Progress Tracker */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full md:w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">Your Progress</span>
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm"
          placeholder="Search patterns by name or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      {filteredPatterns.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatterns.map((pattern) => {
            const completed = isCompleted(pattern.id);
            return (
              <Link to={`/dsa/${pattern.id}`} key={pattern.id} className="block group h-full">
                <div className={`bg-white rounded-xl shadow-sm border p-6 h-full flex flex-col transition-all duration-300 ${completed ? 'border-green-400 shadow-green-100 bg-green-50/30' : 'border-slate-200 hover:shadow-md hover:border-blue-300'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className={`text-xl font-bold ${completed ? 'text-green-700' : 'text-blue-700 group-hover:text-blue-800'}`}>
                      {pattern.name}
                    </h2>
                    {completed && (
                      <span className="bg-green-100 text-green-700 p-1 rounded-full" title="Completed">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
                    {pattern.summary}
                  </p>
                  <div className={`mt-6 flex items-center text-sm font-medium ${completed ? 'text-green-600' : 'text-blue-600 group-hover:text-blue-800'}`}>
                    {completed ? 'Review Pattern' : 'Study Pattern'}
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No patterns found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}