import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Needed for Sidebar links

const AIBot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy AI Bot response
    setResponse(`AI Bot Response to: "${query}"`);
  };

  return (
    <div className="h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f3813] p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400">Admin Panel</h2>
          <nav className="space-y-3 text-[15px]">
            <Link to="/admin/myturf" className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              My Turf
            </Link>
            <Link to="/admin/payment-history" className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Payment History
            </Link>
            <Link to="/admin/booking-history" className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Booking History
            </Link>
            <Link to="/admin/host-event" className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Host Event
            </Link>
            <Link to="/admin/ai-bot" className="flex items-center gap-3 w-full text-left text-green-400 hover:text-green-300 transition">
              AI Bot
            </Link>
          </nav>
        </div>
        <div className="space-y-3">
          <Link to="/admin/profile" className="flex items-center gap-3 text-blue-400 hover:text-blue-500 transition">
            View Profile
          </Link>
          <Link to="/logout" className="flex items-center gap-3 text-red-400 hover:text-red-600 transition">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-black text-white">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">AI Bot</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Ask something..."
            className="p-2 w-full border border-gray-600 bg-gray-800 text-white rounded"
          />
          <button type="submit" className="mt-4 bg-green-400 text-black py-2 px-4 rounded w-full hover:bg-green-500">
            Ask AI Bot
          </button>
        </form>
        {response && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-green-400">AI Bot Response</h3>
            <p>{response}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIBot;
