import { Link } from 'react-router-dom';
import { CodeIcon, CubeIcon } from '../components/Icons';

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

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
        {/* DSA Card */}
        <Link to="/dsa" className="block group">
          <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all hover:shadow-md hover:border-blue-300">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CodeIcon className="w-6 h-6" />
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
              <CubeIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">System Design</h2>
            <p className="text-slate-600">
              Learn how to design scalable systems. Covers both Low-Level Design (LLD) and High-Level Design (HLD).
            </p>
          </div>
        </Link>

        {/* Gen AI Card */}
        <Link to="/gen-ai" className="block group md:col-span-1">
          <div className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-sm border border-purple-500/30 p-8 transition-all hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
            <div className="bg-purple-500/20 text-purple-300 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 border border-purple-400/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex items-center space-x-2 mb-3 relative z-10">
              <h2 className="text-2xl font-bold text-white">Gen AI Course</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-500 text-white rounded-full uppercase tracking-wider">New</span>
            </div>
            <p className="text-purple-200 relative z-10">
              Master Generative AI, Prompt Engineering, RAG, and Vector Databases through an exclusive curated video series.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}