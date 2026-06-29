import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { blogsData } from '../data/blogsData';

export default function BlogsPage() {
  useSEO({
    title: 'Engineering Blogs',
    description: 'Deep dives into advanced topics for the MEAN stack, System Design, and DevOps.'
  });
  // Group blogs by category
  const groupedBlogs = blogsData.reduce((acc, blog) => {
    const category = blog.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {});

  // Define category order, putting Data Structures prominently
  const categories = Object.keys(groupedBlogs).sort((a, b) => {
    if (a === 'Data Structures') return -1;
    if (b === 'Data Structures') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Engineering Blogs & Guides</h1>
        <p className="text-lg text-slate-600 max-w-2xl">Deep dives into advanced topics for the MEAN stack, System Design, and DevOps.</p>
      </div>
      
      {categories.map(category => (
        <div key={category} className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedBlogs[category].map(blog => (
              <Link key={blog.id} to={`/blogs/${blog.id}`} className="group bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-blue-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-800 mb-2">{blog.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{blog.description}</p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800">
                  Read Article
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
