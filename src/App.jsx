import { useState, useCallback } from 'react';
import SchemaSelector from './components/SchemaSelector';
import JsonEditor from './components/JsonEditor';
import FileHandler from './components/FileHandler';
import OutputGenerator from './components/OutputGenerator';
import { schemaData } from './schemaData';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export default function App() {
  const [jsonLd, setJsonLd] = useState({
    "@context": "https://schema.org",
    "@type": "Person",
  });
  const [selectedSchema, setSelectedSchema] = useState("Person");
  const [validation, setValidation] = useState({ isValid: true, message: 'JSON-LD appears to be valid.' });
  const [fileWarning, setFileWarning] = useState('');

  const validateJsonLd = useCallback((json, schema) => {
    const errors = [];
    if (!json["@context"] || json["@context"] !== "https://schema.org") {
      errors.push('Error: @context must be "https://schema.org".');
    }
    if (!json["@type"] || json["@type"] !== schema) {
      errors.push(`Error: @type should be "${schema}".`);
    }

    const schemaProperties = schemaData[schema]?.properties || [];
    const propertyMap = new Map(schemaProperties.map(p => [p.name, p.type]));

    for (const key in json) {
      if (key === "@context" || key === "@type") continue;

      const value = json[key];
      if (!value) continue; // Skip empty values

      const expectedType = propertyMap.get(key);
      if (!expectedType) continue; // Property not in our schema definition

      let isValid = true;
      switch (expectedType) {
        case 'URL':
          try {
            new URL(value);
          } catch (_) {
            isValid = false;
          }
          break;
        case 'Date':
        case 'DateTime':
          isValid = !isNaN(new Date(value).getTime());
          break;
        case 'Number':
          isValid = !isNaN(parseFloat(value)) && isFinite(value);
          break;
        case 'Email':
          isValid = /\S+@\S+\.\S+/.test(value);
          break;
        // 'Text' type requires no specific format validation
        case 'Text':
        default:
          break;
      }

      if (!isValid) {
        errors.push(`Property '${key}' has an invalid format for type '${expectedType}'.`);
      }
    }

    if (errors.length > 0) {
      setValidation({ isValid: false, message: errors.join(' ') });
    } else {
      setValidation({ isValid: true, message: 'JSON-LD appears to be valid.' });
    }
  }, []);

  const handleSchemaChange = useCallback((schema) => {
    setSelectedSchema(schema);
    const newJsonLd = {
      "@context": "https://schema.org",
      "@type": schema,
    };
    setJsonLd(newJsonLd);
    validateJsonLd(newJsonLd, schema);
  }, [validateJsonLd]);

  const handleJsonChange = useCallback((newJson) => {
    setJsonLd(newJson);
    validateJsonLd(newJson, selectedSchema);
  }, [selectedSchema, validateJsonLd]);

  const handleFileLoad = useCallback((loadedJson, warning) => {
    if (loadedJson) {
      const schemaType = loadedJson["@type"] || "Thing";
      if (schemaData[schemaType]) {
        setSelectedSchema(schemaType);
        setJsonLd(loadedJson);
        validateJsonLd(loadedJson, schemaType);
        setFileWarning('');
      } else {
        setFileWarning(`Warning: Loaded schema type "${schemaType}" is not recognized. Falling back to Person.`);
        setSelectedSchema("Person");
        setJsonLd({ "@context": "https://schema.org", "@type": "Person" });
      }
    }
    if (warning) {
      setFileWarning(warning);
    }
  }, [validateJsonLd]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JSON-LD Schema Editor</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <FileHandler onLoad={handleFileLoad} warning={fileWarning} setWarning={setFileWarning} />
            <SchemaSelector
              selectedSchema={selectedSchema}
              onSchemaChange={handleSchemaChange}
              schemas={Object.keys(schemaData)}
            />
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Validation Status</h3>
              <div className={`flex items-start p-3 rounded-md ${validation.isValid ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                {validation.isValid ?
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" /> :
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                }
                <p className={`text-sm ${validation.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                  {validation.message}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                <HelpCircle className="h-5 w-5 mr-2" />
                How to Use
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Select a schema type from the dropdown.</li>
                <li>Fill in the properties. The editor will validate the format (e.g., for URLs, Dates).</li>
                <li>Upload an existing file to edit its JSON-LD data.</li>
                <li>Use the <code>Raw JSON</code> tab for direct editing.</li>
                <li>Copy the script or download the file.</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <JsonEditor
              schema={selectedSchema}
              jsonLd={jsonLd}
              onJsonChange={handleJsonChange}
            />
            <OutputGenerator jsonLd={jsonLd} />
          </div>
        </div>
      </main>
    </div>
  );
}
