import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from '../components/LoadingSpinner';
import useSEO from '../hooks/useSEO';
import { blogsData } from '../data/blogsData';

export default function BlogDetailPage() {
  const { id } = useParams();
  
  const blogMeta = blogsData.find(b => b.id === id);
  
  useSEO({
    title: blogMeta ? blogMeta.title : 'Blog Detail',
    description: blogMeta ? blogMeta.description : 'Read our latest engineering deep dives.'
  });
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.BASE_URL}blogs/${id}.md`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
        <button onClick={() => navigate('/blogs')} className="text-blue-400 hover:text-blue-300">
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={() => navigate('/blogs')} className="text-blue-400 hover:text-blue-300 mb-8 flex items-center transition-colors">
        <span className="mr-2">←</span> Back to Blogs
      </button>
      
      <article className="markdown-body bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl text-gray-300">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
