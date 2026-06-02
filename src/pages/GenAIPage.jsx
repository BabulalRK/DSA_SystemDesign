import { useState, useCallback, memo, useEffect } from 'react';
import { useData } from '../hooks/useData';
import { PlayIcon, ClockIcon, DownloadIcon, ListIcon } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';

const SessionItem = memo(({ session, index, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(session)}
      className={`w-full text-left p-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 flex items-start space-x-4 ${
        isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' : 'border-l-4 border-transparent'
      }`}
    >
      <div className="flex-shrink-0 mt-1">
          {isActive ? (
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
            <PlayIcon className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-200 dark:border-slate-700">
            {index + 1}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold truncate ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
          {session.title}
        </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            {session.duration}
          </p>
      </div>
    </button>
  );
});

export default function GenAIPage() {
  const { data: genAiSessions, isLoading } = useData('genAiSessions');
  const [activeSession, setActiveSession] = useState(null);

  // Set initial active session once data loads
  useEffect(() => {
    if (genAiSessions && genAiSessions.length > 0 && !activeSession) {
      setActiveSession(genAiSessions[0]);
    }
  }, [genAiSessions, activeSession]);

  const handleSelectSession = useCallback((session) => {
    setActiveSession(session);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!genAiSessions || genAiSessions.length === 0) return <div className="text-center py-12 text-red-500">Failed to load GenAI sessions.</div>;
  if (!activeSession) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden border border-indigo-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-32 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold border border-indigo-400/30 backdrop-blur-sm">
              NEW COURSE
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-400/30 backdrop-blur-sm">
              Gen AI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Generative AI Masterclass
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl leading-relaxed">
            Master the fundamentals of Large Language Models, Prompt Engineering, RAG, and Vector Databases through this exclusive curated video series.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Video Player Area (Takes 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
            {/* 16:9 Aspect Ratio Container for iframe */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={activeSession.videoUrl} 
                title={activeSession.title}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeSession.title}</h2>
                  <div className="flex items-center text-sm text-indigo-400 font-medium">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    {activeSession.duration}
                  </div>
                </div>
                
                {activeSession.downloadUrl && (
                  <a 
                    href={activeSession.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap"
                  >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download Video
                  </a>
                )}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {activeSession.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist / Sidebar (Takes 1 column) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <ListIcon className="w-5 h-5 mr-2 text-indigo-500" />
                Course Content
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{genAiSessions.length} Sessions Available</p>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50 max-h-[600px] overflow-y-auto custom-scrollbar">
              {genAiSessions.map((session, index) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  index={index}
                  isActive={activeSession.id === session.id}
                  onSelect={handleSelectSession}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
