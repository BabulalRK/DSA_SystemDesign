import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { dsaPatterns } from '../data/dsaPatterns';
import { useProgress } from '../hooks/useProgress';
import PatternCard from '../components/PatternCard';
import { SearchIcon } from '../components/Icons';

export default function DSAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isCompleted, getProgressPercentage } = useProgress('dsa-progress');

  const filteredPatterns = useMemo(() =>
    dsaPatterns.filter(pattern => 
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
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
          <SearchIcon className="h-5 w-5 text-slate-400" />
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
          {filteredPatterns.map((pattern) => (
            <PatternCard 
              key={pattern.id} 
              pattern={pattern} 
              isCompleted={isCompleted} 
              basePath="/dsa" 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No patterns found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}