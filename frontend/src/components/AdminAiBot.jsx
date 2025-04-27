import React, { useState } from 'react';

const AIBot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy response for AI Bot
    setResponse(`AI Bot Response to: "${query}"`);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-2xl font-semibold text-green-400">AI Bot</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Ask something..."
          className="p-2 w-full border border-gray-600 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="mt-2 bg-green-400 text-black py-2 px-4 rounded w-full hover:bg-green-500">
          Ask AI Bot
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium text-green-400">AI Bot Response</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIBot;
