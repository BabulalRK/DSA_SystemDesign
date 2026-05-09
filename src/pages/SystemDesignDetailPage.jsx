import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { systemDesignConcepts } from '../data/systemDesignData';
import { useProgress } from '../hooks/useProgress';

export default function SystemDesignDetailPage() {
  const { id } = useParams();
  
  // Search both LLD and HLD concepts for the matching ID
  const concept = systemDesignConcepts.lld.find(c => c.id === id) || 
                  systemDesignConcepts.hld.find(c => c.id === id);
  
  const { isCompleted, toggleItem } = useProgress('sd-progress');

  if (!concept) {
    return <Navigate to="/system-design" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/system-design" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to System Design
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-8 relative">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-indigo-700">{concept.name}</h1>
            <button 
              onClick={() => toggleItem(concept.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isCompleted(concept.id) 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill={isCompleted(concept.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isCompleted(concept.id) ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          <p className="text-slate-700 mt-4 text-lg leading-relaxed">{concept.summary}</p>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Deep Dive Explanation</h3>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl text-slate-700 leading-relaxed text-base">
              {concept.details}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Architecture / Flow Diagram</h3>
            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="text-blue-300 text-sm md:text-base font-mono whitespace-pre text-left">
                {concept.diagram}
              </pre>
            </div>
          </div>

          {/* Pros / Cons */}
          <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-4 border-b border-green-200 pb-2">Pros / Benefits</h3>
              <ul className="space-y-3">
                {concept.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="text-green-500 mr-3 text-lg leading-none mt-0.5">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-4 border-b border-red-200 pb-2">Cons / Challenges</h3>
              <ul className="space-y-3">
                {concept.cons.map((con, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="text-red-400 mr-3 text-lg leading-none mt-0.5">✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}