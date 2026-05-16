import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { dsaPatterns } from '../data/dsaPatterns';
import { useProgress } from '../hooks/useProgress';

export default function DSADetailPage() {
  const { id } = useParams();
  const pattern = dsaPatterns.find(p => p.id === id);
  const { isCompleted, toggleItem } = useProgress('dsa-progress');

  if (!pattern) {
    return <Navigate to="/dsa" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/dsa" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to DSA Patterns
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-8 relative">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-blue-700">{pattern.name}</h1>
            <button 
              onClick={() => toggleItem(pattern.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isCompleted(pattern.id) 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill={isCompleted(pattern.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isCompleted(pattern.id) ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          <p className="text-slate-700 mt-4 text-lg leading-relaxed max-w-3xl">{pattern.summary}</p>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          {/* When To Use */}
          {pattern.whenToUse && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">When to Use</h3>
              <p className="text-slate-700 text-lg leading-relaxed">{pattern.whenToUse}</p>
            </div>
          )}

          {/* Real World Scenario */}
          {pattern.realWorldProblem && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Real-World Scenario</h3>
              <p className="text-slate-700 text-lg leading-relaxed italic">
                "{pattern.realWorldProblem}"
              </p>
            </div>
          )}

          {/* Mental Model */}
          {pattern.mentalModel && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
              <h3 className="text-sm font-bold text-purple-800 uppercase tracking-wider mb-2">Mental Model</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {pattern.mentalModel}
              </p>
            </div>
          )}

          {/* Common Problems */}
          {pattern.commonProblems && pattern.commonProblems.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Common Problems</h3>
              <div className="flex flex-wrap gap-2">
                {pattern.commonProblems.map((problem, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                    {problem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Code Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">JavaScript Example</h3>
            <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto shadow-inner">
              <pre className="text-green-400 text-sm md:text-base font-mono leading-relaxed">
                <code>{pattern.code}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Code Explanation</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl text-slate-700 leading-relaxed">
              {pattern.codeExplanation}
            </div>
          </div>

          {/* Diagram */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Data Movement Diagram</h3>
            <div className="bg-slate-100 rounded-xl p-5 overflow-x-auto border border-slate-200">
              <pre className="text-indigo-600 text-sm md:text-base font-mono whitespace-pre text-left">
                {pattern.diagram}
              </pre>
            </div>
          </div>

          {/* Complexity */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Complexity Analysis</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100 flex flex-col justify-center items-center text-center">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Time Complexity</h4>
                <p className="text-red-700 font-mono font-bold text-2xl">{pattern.timeComplexity}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100 flex flex-col justify-center items-center text-center">
                <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-2">Space Complexity</h4>
                <p className="text-yellow-700 font-mono font-bold text-2xl">{pattern.spaceComplexity}</p>
              </div>
            </div>
            <p className="text-slate-600 italic leading-relaxed text-center">{pattern.complexityExplanation}</p>
          </div>

          {/* Pros / Cons */}
          <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-4 border-b border-green-200 pb-2">Pros / Advantages</h3>
              <ul className="space-y-3">
                {pattern.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="text-green-500 mr-3 text-lg leading-none mt-0.5">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-4 border-b border-red-200 pb-2">Cons / Limitations</h3>
              <ul className="space-y-3">
                {pattern.cons.map((con, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="text-red-400 mr-3 text-lg leading-none mt-0.5">✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pitfalls */}
          {pattern.pitfalls && pattern.pitfalls.length > 0 && (
            <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
              <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-4 border-b border-orange-200 pb-2">Common Pitfalls & Gotchas</h3>
              <ul className="space-y-3">
                {pattern.pitfalls.map((pitfall, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="text-orange-500 mr-3 text-lg leading-none mt-0.5">⚠️</span> {pitfall}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}