import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { blogsData } from '../data/blogsData';

export default function BlogsPage() {
  useSEO({
    title: 'Engineering Blogs',
    description: 'Deep dives into advanced topics for the MEAN stack, System Design, and DevOps.'
  });
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Engineering Blogs & Guides</h1>
        <p className="text-gray-400">Deep dives into advanced topics for the MEAN stack, System Design, and DevOps.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogsData.map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 shadow-lg flex flex-col h-full transform hover:-translate-y-1">
            <h2 className="text-xl font-bold text-white mb-2">{blog.title}</h2>
            <p className="text-gray-400 flex-grow">{blog.description}</p>
            <div className="mt-4 text-blue-400 font-medium text-sm flex items-center">
              Read Article <span className="ml-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
