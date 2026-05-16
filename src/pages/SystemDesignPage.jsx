import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { systemDesignConcepts } from '../data/systemDesignData';
import { useProgress } from '../hooks/useProgress';
import PatternCard from '../components/PatternCard';

export default function SystemDesignPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isCompleted, getProgressPercentage } = useProgress('sd-progress');

  const filterConcepts = (concepts) => {
    return concepts.filter(concept => 
      concept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredLLD = filterConcepts(systemDesignConcepts.lld);
  const filteredHLD = filterConcepts(systemDesignConcepts.hld);
  
  const totalConcepts = systemDesignConcepts.lld.length + systemDesignConcepts.hld.length;
  const progress = getProgressPercentage(totalConcepts);

  const renderConceptCard = (concept) => (
    <PatternCard 
      key={concept.id} 
      pattern={concept} 
      isCompleted={isCompleted} 
      basePath="/system-design" 
      studyText="Deep Dive" 
      reviewText="Review Concept" 
    />
  );

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200 pb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">System Design Masterclass</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Deep dive into the core principles of software architecture, covering both Low-Level object-oriented design patterns and High-Level distributed systems.
          </p>
        </div>
        
        {/* Progress Tracker */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full md:w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">Your Progress</span>
            <span className="text-sm font-bold text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
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
          className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow shadow-sm"
          placeholder="Search concepts by name or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredLLD.length === 0 && filteredHLD.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No concepts found matching "{searchTerm}"</p>
        </div>
      )}

      {filteredLLD.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Low-Level Design (LLD)</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLLD.map(renderConceptCard)}
          </div>
        </div>
      )}

      {filteredHLD.length > 0 && (
        <div className={`mt-16 ${filteredLLD.length > 0 ? 'pt-8 border-t border-slate-200' : ''}`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">High-Level Design (HLD)</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHLD.map(renderConceptCard)}
          </div>
        </div>
      )}
    </div>
  );
}