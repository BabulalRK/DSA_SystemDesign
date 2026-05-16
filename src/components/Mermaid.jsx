import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

const Mermaid = ({ chart, id = 'mermaid-chart' }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    if (chart && containerRef.current) {
      const renderChart = async () => {
        try {
          // Clear any previous error states
          mermaid.mermaidAPI.reset();
          
          // Generate a unique ID for this specific render to prevent conflicts
          const uniqueId = `${id}-${Math.random().toString(36).substring(2, 9)}`;
          
          const { svg } = await mermaid.render(uniqueId, chart);
          setSvgContent(svg);
        } catch (error) {
          console.error('Mermaid render error:', error);
          setSvgContent(`<div class="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
            <strong>Error rendering diagram:</strong> ${error.message}
          </div>`);
        }
      };

      renderChart();
    }
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
