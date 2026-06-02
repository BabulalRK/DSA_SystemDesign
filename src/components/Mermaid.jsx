import React, { useEffect, useRef, useState } from 'react';

let mermaidInstance = null;

const getMermaid = async () => {
  if (!mermaidInstance) {
    const mermaidModule = await import('mermaid');
    mermaidInstance = mermaidModule.default;
    mermaidInstance.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }
  return mermaidInstance;
};

const Mermaid = ({ chart, id = 'mermaid-chart' }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    let isMounted = true;

    if (chart && containerRef.current) {
      const renderChart = async () => {
        try {
          const mermaid = await getMermaid();
          mermaid.mermaidAPI.reset();
          
          const uniqueId = `${id}-${Math.random().toString(36).substring(2, 9)}`;
          
          const { svg } = await mermaid.render(uniqueId, chart);
          if (isMounted) {
            setSvgContent(svg);
          }
        } catch (error) {
          console.error('Mermaid render error:', error);
          if (isMounted) {
            setSvgContent(`<div class="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
              <strong>Error rendering diagram:</strong> ${error.message}
            </div>`);
          }
        }
      };

      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid-wrapper flex justify-center w-full overflow-x-auto my-4"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default Mermaid;
