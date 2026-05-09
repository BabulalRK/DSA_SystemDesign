import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
        Master <span className="text-blue-600">DSA</span> & <span className="text-indigo-600">System Design</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl">
        Your ultimate hub for preparing for top-tier software engineering interviews. 
        Structured learning for algorithms, data structures, and architecture.
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mt-8">
        {/* DSA Card */}
        <Link to="/dsa" className="block group">
          <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all hover:shadow-md hover:border-blue-300">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Data Structures & Algorithms</h2>
            <p className="text-slate-600">
              Build a strong foundation in problem-solving. Practice Arrays, Trees, Dynamic Programming, and more.
            </p>
          </div>
        </Link>

        {/* System Design Card */}
        <Link to="/system-design" className="block group">
          <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all hover:shadow-md hover:border-indigo-300">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">System Design</h2>
            <p className="text-slate-600">
              Learn how to design scalable systems. Covers both Low-Level Design (LLD) and High-Level Design (HLD).
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}