import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import useSEO from '../hooks/useSEO';

const DEFAULT_CODE = `// Welcome to the JavaScript Playground!
// Write your code here and click "Run Code"

const nums = [5, 0, 1, 2, 3, 4];
const n = nums.length;

// Step 1: Encode values
for (let i = 0; i < n; i++) {
    nums[i] = nums[i] + (nums[nums[i]] % n) * n;
}

// Step 2: Extract values
for (let i = 0; i < n; i++) {
    nums[i] = Math.floor(nums[i] / n);
}

console.log("Transformed Array:", nums);
`;

export default function PlaygroundPage() {
  useSEO({
    title: 'JavaScript Playground',
    description: 'An interactive environment to test JavaScript code algorithms and data structures.'
  });

  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState([]);

  const runCode = useCallback(() => {
    setOutput([]);
    const logs = [];
    
    // Override console.log, warn, error
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
    };

    const captureLog = (type, ...args) => {
      const parsedArgs = args.map(arg => {
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg, null, 2);
            } catch(e) {
                return String(arg);
            }
        }
        return String(arg);
      }).join(' ');
      
      logs.push({ type, message: parsedArgs });
      originalConsole[type](...args); // Still log to real console
    };

    console.log = (...args) => captureLog('log', ...args);
    console.error = (...args) => captureLog('error', ...args);
    console.warn = (...args) => captureLog('warn', ...args);

    try {
      // Create a function from the code and execute it
      // Using a new Function is safer than eval, though still executes in the same context
      const executionFunc = new Function(code);
      executionFunc();
    } catch (err) {
      logs.push({ type: 'error', message: err.toString() });
    } finally {
      // Restore original console
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      setOutput([...logs]);
    }
  }, [code]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in flex flex-col h-[calc(100vh-140px)]">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">JavaScript Playground</h1>
        <p className="text-lg text-slate-600">Experiment with algorithms and test your code directly in the browser.</p>
      </div>

      <div className="flex-grow grid md:grid-cols-2 gap-6 min-h-0 pb-6">
        {/* Editor Pane */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Editor
            </h3>
            <button
              onClick={runCode}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Run Code
            </button>
          </div>
          <div className="flex-grow overflow-auto relative">
            <div className="absolute inset-0">
                <CodeMirror
                value={code}
                height="100%"
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setCode(value)}
                theme="light"
                className="h-full text-base font-mono code-mirror-wrapper"
                />
            </div>
          </div>
        </div>

        {/* Console Pane */}
        <div className="bg-slate-900 rounded-xl shadow-inner border border-slate-800 overflow-hidden flex flex-col">
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Output Console
            </h3>
            <button
              onClick={() => setOutput([])}
              className="text-slate-400 hover:text-white px-3 py-1 rounded text-xs transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex-grow p-4 overflow-auto font-mono text-sm">
            {output.length === 0 ? (
              <div className="text-slate-500 italic h-full flex items-center justify-center">
                No output yet. Click "Run Code" to execute.
              </div>
            ) : (
              <div className="space-y-2">
                {output.map((log, index) => (
                  <div 
                    key={index} 
                    className={`pb-2 border-b border-slate-800/50 whitespace-pre-wrap break-all ${
                      log.type === 'error' ? 'text-red-400' : 
                      log.type === 'warn' ? 'text-yellow-400' : 'text-green-300'
                    }`}
                  >
                    {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
