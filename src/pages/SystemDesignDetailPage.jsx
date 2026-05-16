import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { systemDesignConcepts } from '../data/systemDesignData';
import { useProgress } from '../hooks/useProgress';
import Mermaid from '../components/Mermaid';

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

          {/* Use Cases */}
          {concept.useCases && concept.useCases.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Real-World Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {concept.useCases.map((useCase, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mind Map Section */}
          {concept.mindMap && (
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold text-purple-800 uppercase tracking-wider mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Mental Hook & Analogy
              </h3>
              <p className="text-slate-800 text-lg leading-relaxed mb-6 italic">
                "{concept.mindMap.analogy}"
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-purple-100 overflow-hidden">
                <Mermaid chart={concept.mindMap.mermaidCode} id={`mermaid-${concept.id}`} />
              </div>
            </div>
          )}

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
          
          {/* External Reference */}
          {concept.reference && (
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended Reading</h3>
              <a 
                href={concept.reference.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors border border-indigo-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {concept.reference.name}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}