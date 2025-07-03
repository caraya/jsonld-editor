import React, { useState } from 'react';
import { Download, Copy, ClipboardCheck } from 'lucide-react';

const OutputGenerator = ({ jsonLd }) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const jsonString = JSON.stringify(jsonLd, null, 2);
    const blob = new Blob([jsonString], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jsonLd['@type'] || 'schema'}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const jsonString = JSON.stringify(jsonLd, null, 2);
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    
    // Use a temporary textarea to copy to clipboard
    const textArea = document.createElement("textarea");
    textArea.value = scriptTag;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Export JSON-LD</h3>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleDownload}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Download .jsonld File
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {copied ? (
            <>
              <ClipboardCheck className="h-5 w-5 mr-2 text-green-500" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" /> Copy &lt;script&gt; Tag
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OutputGenerator;
