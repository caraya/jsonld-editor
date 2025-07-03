import React from 'react';
import { BookOpen } from 'lucide-react';

const SchemaSelector = ({ selectedSchema, onSchemaChange, schemas }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <label htmlFor="schema-select" className="flex items-center text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        <BookOpen className="h-5 w-5 mr-2" />
        Select Schema Type
      </label>
      <select
        id="schema-select"
        value={selectedSchema}
        onChange={(e) => onSchemaChange(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
      >
        {schemas.map((schemaName) => (
          <option key={schemaName} value={schemaName}>
            {schemaName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(SchemaSelector);
