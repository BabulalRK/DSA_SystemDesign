import {  useState, useCallback  } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useProgress } from '../hooks/useProgress';
import Mermaid from '../components/Mermaid';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon } from '../components/Icons';

export default function DSADetailPage() {
  const { id } = useParams();
  const { data: dsaPatterns, isLoading } = useData('dsaPatterns');
  const pattern = dsaPatterns ? dsaPatterns.find(p => p.id === id) : null;
  const { isCompleted, toggleItem } = useProgress('dsa-progress');
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleAnswer = useCallback((idx) => {
    setRevealedAnswers(prev => ({...prev, [idx]: !prev[idx]}));
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!pattern) {
    return <Navigate to="/dsa" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/dsa" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
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
              <CheckIcon className="w-5 h-5 mr-2" fill={isCompleted(pattern.id) ? "currentColor" : "none"} />
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

          {/* LeetCode Style Questions */}
          {pattern.leetcodeQuestions && pattern.leetcodeQuestions.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center mb-6 border-b border-slate-200 pb-4">
                <svg className="w-8 h-8 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.222 5.204 5.204 0 0 0 2.247 3.32l9.043 5.42a2.82 2.82 0 0 0 2.85-.027 2.81 2.81 0 0 0 1.4-2.428V20.15l2.493-1.493a2.76 2.76 0 0 0 1.258-1.584 2.834 2.834 0 0 0 .048-1.954 2.793 2.793 0 0 0-1.125-1.564L15.932 9.8l.006-.004c.15-.098.307-.179.467-.24l1.37-.53a1.4 1.4 0 0 0 .867-1.748 1.408 1.408 0 0 0-1.767-.866l-1.428.552a4.34 4.34 0 0 0-2.316 2.05l-1.93 3.664-4.834-2.898L11.83 2.14a1.385 1.385 0 0 0 .22-1.52A1.376 1.376 0 0 0 11.026.042c-.084-.015-.17-.024-.256-.027h-.287zm-2.073 2.253l2.84 3.037-1.164 2.21-3.66-2.196 1.984-3.05zm5.54 8.78l3.195 1.916-2.227 1.334-1.638-.982L15.223 15l2.09 1.253-2.132 1.277-2.16-1.296L11.875 18l3.056 1.834a.974.974 0 0 1-.497.837.98.98 0 0 1-1.023.01L4.368 15.26c-.36-.216-.582-.596-.582-1.015s.222-.8.583-1.016L12.51 8.35a.86.86 0 0 1 .843.014c.264.155.434.426.467.728l-.004.032.004-.002zm-3.003 4.225l1.637.982-2.09-1.253 2.133-1.277-1.68-.99-3.055-1.835 1.144-2.17 4.887 2.93a1.642 1.642 0 0 1-.16 2.68l-2.818 1.687z"/>
                </svg>
                <h3 className="text-2xl font-bold text-slate-800">Practice Problems</h3>
              </div>
              
              <div className="space-y-6">
                {pattern.leetcodeQuestions.map((q, i) => {
                  let difficultyColor = 'text-[#00b8a3]';
                  let difficultyBg = 'bg-[#00b8a3]/10';
                  if (q.level === 'Medium') {
                    difficultyColor = 'text-[#ffc01e]';
                    difficultyBg = 'bg-[#ffc01e]/10';
                  } else if (q.level === 'Hard') {
                    difficultyColor = 'text-[#ff375f]';
                    difficultyBg = 'bg-[#ff375f]/10';
                  }
                  
                  return (
                    <div key={i} className="bg-[#282828] rounded-xl overflow-hidden shadow-lg border border-slate-700/50 transition-all duration-300 font-sans">
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-[#3e3e42] flex items-center justify-between bg-[#1e1e1e]">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-semibold text-gray-200">{q.id}. {q.title}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor} ${difficultyBg}`}>
                            {q.level}
                          </div>
                        </div>
                      </div>
                      
                      {/* Body */}
                      <div className="p-6">
                        <div className="prose prose-invert max-w-none mb-6">
                          <p className="text-gray-300 text-lg leading-relaxed">{q.question}</p>
                        </div>
                        
                        {/* Test Cases */}
                        {q.testCases && q.testCases.length > 0 && (
                          <div className="mb-6 space-y-3">
                            {q.testCases.map((tc, idx) => (
                              <div key={idx} className="bg-[#1e1e1e] border border-[#3e3e42] p-4 rounded-md font-mono text-sm">
                                <p className="text-gray-400 mb-1"><strong className="text-gray-200">Input:</strong> {tc.input}</p>
                                <p className="text-gray-400"><strong className="text-gray-200">Output:</strong> {tc.output}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Resolving Mechanism */}
                        <div className="mt-4">
                          <button 
                            onClick={() => toggleAnswer(i)}
                            className="flex items-center text-sm font-semibold text-[#3b82f6] hover:text-[#60a5fa] transition-colors bg-[#3b82f6]/10 px-4 py-2 rounded-md border border-[#3b82f6]/20"
                          >
                            <svg className={`w-4 h-4 mr-2 transform transition-transform duration-200 ${revealedAnswers[i] ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {revealedAnswers[i] ? 'Hide Solution Approach' : 'View Solution Approach'}
                          </button>
                          
                          <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${revealedAnswers[i] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-5">
                              <h4 className="text-gray-200 font-semibold mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-[#00b8a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Intuition & Approach
                              </h4>
                              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                                {q.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mental Model & Mermaid */}
          {(pattern.mentalModel || pattern.mermaidCode) && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
              <h3 className="text-sm font-bold text-purple-800 uppercase tracking-wider mb-3">Mental Model & Mind Map</h3>
              
              {pattern.mentalModel && (
                <p className="text-slate-800 text-lg leading-relaxed mb-6 italic">
                  "{pattern.mentalModel}"
                </p>
              )}
              
              {pattern.mermaidCode && (
                <div className="bg-white rounded-lg p-4 border border-purple-100 overflow-hidden mt-4">
                  <Mermaid chart={pattern.mermaidCode} id={`mermaid-${pattern.id}`} />
                </div>
              )}
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

          {/* Brute Force */}
          {pattern.bruteForce && (
            <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                The Naive / Brute Force Approach
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed mb-4">
                {pattern.bruteForce.explanation}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-rose-100 text-rose-800">
                  <span className="font-bold mr-2">Time:</span> {pattern.bruteForce.timeComplexity}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-rose-100 text-rose-800">
                  <span className="font-bold mr-2">Space:</span> {pattern.bruteForce.spaceComplexity}
                </span>
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
          
          {/* External Reference */}
          {pattern.reference && (
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended Reading</h3>
              <a 
                href={pattern.reference.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors border border-blue-200"
              >
                <ExternalLinkIcon className="w-5 h-5 mr-2" />
                {pattern.reference.name}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}