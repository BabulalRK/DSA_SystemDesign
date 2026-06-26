import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import LoadingSpinner from '../components/LoadingSpinner';
import useSEO from '../hooks/useSEO';
import { blogsData } from '../data/blogsData';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: 'transparent'
  },
  securityLevel: 'loose',
});

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart)
      .then((result) => setSvg(result.svg))
      .catch((e) => console.error('Mermaid render error:', e));
  }, [chart]);
  return <div className="mermaid flex justify-center my-8 overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blogMeta = blogsData.find(b => b.id === id);
  
  useSEO({
    title: blogMeta ? blogMeta.title : 'Blog Detail',
    description: blogMeta ? blogMeta.description : 'Read our latest engineering deep dives.'
  });
  
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

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><LoadingSpinner /></div>;

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
        <button onClick={() => navigate('/blogs')} className="text-blue-500 hover:text-blue-400 font-medium">
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-fade-in px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/blogs')} 
        className="text-zinc-500 hover:text-zinc-900 mb-8 md:mb-12 flex items-center text-sm font-medium transition-colors font-sans"
      >
        <span className="mr-2">←</span> Back
      </button>
      
      {/* Responsive Minimalist Header */}
      {blogMeta && (
        <header className="mb-10 md:mb-14 font-sans">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-4 md:mb-6 leading-tight tracking-tight">
            {blogMeta.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 font-light leading-snug mb-6 md:mb-8">
            {blogMeta.description}
          </p>
          
          <div className="flex flex-wrap items-center text-sm text-zinc-500 border-b border-zinc-200 pb-6 md:pb-8">
            <span>By StudyHub Engineering</span>
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="w-full sm:w-auto mt-1 sm:mt-0">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>
      )}

      {/* Article Content - Responsive Typography */}
      <article className="prose prose-zinc prose-base md:prose-lg max-w-none font-serif text-zinc-800 prose-headings:font-sans prose-headings:font-bold prose-headings:text-zinc-900 prose-a:text-blue-600 prose-strong:text-zinc-900">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              if (!inline && match && match[1] === 'mermaid') {
                return <Mermaid chart={String(children).replace(/\n$/, '')} />
              }
              return <code className={className} {...props}>{children}</code>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
