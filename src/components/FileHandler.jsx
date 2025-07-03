import React, { useCallback } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';

const FileHandler = ({ onLoad, warning, setWarning }) => {

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      try {
        // Try parsing as JSON first
        const json = JSON.parse(content);
        onLoad(json, null);
      } catch (jsonError) {
        // If not JSON, assume HTML and look for a script tag
        const scriptTagRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
        const match = content.match(scriptTagRegex);
        if (match && match[1]) {
          try {
            const jsonFromScript = JSON.parse(match[1]);
            onLoad(jsonFromScript, null);
          } catch (scriptJsonError) {
            setWarning('Found a JSON-LD script tag, but its content is not valid JSON.');
            onLoad(null, 'Found a JSON-LD script tag, but its content is not valid JSON.');
          }
        } else {
          setWarning('No valid JSON or JSON-LD script tag found in the file.');
          onLoad(null, 'No valid JSON or JSON-LD script tag found in the file.');
        }
      }
    };
    reader.readAsText(file);
    // Reset file input to allow re-uploading the same file
    event.target.value = null; 
  }, [onLoad, setWarning]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        <Upload className="h-5 w-5 mr-2" />
        Load from File
      </h3>
      <input
        type="file"
        accept=".json,.jsonld,.html"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 dark:text-gray-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          dark:file:bg-blue-900 dark:file:text-blue-300
          hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
      />
      {warning && (
        <div className="mt-4 flex items-center p-3 rounded-md bg-yellow-100 dark:bg-yellow-900">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">{warning}</p>
        </div>
      )}
    </div>
  );
};

export default FileHandler;