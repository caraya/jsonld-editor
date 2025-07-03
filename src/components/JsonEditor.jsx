import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { schemaData } from '../schemaData';
import { Edit, Code } from 'lucide-react';

const JsonEditor = ({ schema, jsonLd, onJsonChange }) => {
  const [activeTab, setActiveTab] = useState('form');
  const [rawJson, setRawJson] = useState(JSON.stringify(jsonLd, null, 2));

  useEffect(() => {
    // Update raw editor only if it's not the source of the change
    // This prevents the cursor from jumping during raw text editing
    try {
        if (JSON.stringify(jsonLd) !== JSON.stringify(JSON.parse(rawJson))) {
            setRawJson(JSON.stringify(jsonLd, null, 2));
        }
    } catch (e) {
        // If rawJson is not valid JSON, update it from the valid jsonLd state
        setRawJson(JSON.stringify(jsonLd, null, 2));
    }
  }, [jsonLd, rawJson]);

  const handleFormFieldChange = useCallback((prop, value) => {
    const newJsonLd = { ...jsonLd, [prop]: value };
    if (value === '') {
      delete newJsonLd[prop];
    }
    onJsonChange(newJsonLd);
  }, [jsonLd, onJsonChange]);
  
  const handleRawJsonChange = (e) => {
    const newRawJson = e.target.value;
    setRawJson(newRawJson);
    try {
      const parsedJson = JSON.parse(newRawJson);
      onJsonChange(parsedJson);
    } catch (error) {
      // Ignore parse errors while typing, the main validation will catch it
    }
  };

  const renderFormFields = () => {
    const properties = schemaData[schema]?.properties || [];
    return properties.map((propDef) => (
      <div key={propDef.name} className="mb-4">
        <label htmlFor={propDef.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {propDef.name} <span className="text-xs text-gray-500">({propDef.type})</span>
        </label>
        <input
          type="text"
          id={propDef.name}
          name={propDef.name}
          value={jsonLd[propDef.name] || ''}
          onChange={(e) => handleFormFieldChange(propDef.name, e.target.value)}
          placeholder={`Enter ${propDef.name}...`}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4 p-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('form')}
            className={`${
              activeTab === 'form'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Edit className="h-4 w-4 mr-2" /> Form Editor
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`${
              activeTab === 'raw'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Code className="h-4 w-4 mr-2" /> Raw JSON
          </button>
        </nav>
      </div>
      <div className="p-6">
        {activeTab === 'form' ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">@type</label>
              <input type="text" value={schema} readOnly className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed"/>
            </div>
            {renderFormFields()}
          </div>
        ) : (
          <textarea
            value={rawJson}
            onChange={handleRawJsonChange}
            className="w-full h-96 p-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          />
        )}
      </div>
    </div>
  );
};

JsonEditor.propTypes = {
  schema: PropTypes.string.isRequired,
  jsonLd: PropTypes.object.isRequired,
  onJsonChange: PropTypes.func.isRequired,
};

export default JsonEditor;
