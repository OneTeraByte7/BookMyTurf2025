import React, { useState } from 'react';

const HostEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit event details
    console.log('Event Details:', eventDetails);
  };

  return (
    <div className="h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f3813] p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400">Admin Panel</h2>
          <nav className="space-y-3 text-[15px]">
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              My Turf
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Payment History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Booking History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Host Event
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              AI Bot
            </button>
          </nav>
        </div>
        <div className="space-y-3">
          <button className="flex items-center gap-3 text-blue-400 hover:text-blue-500 transition">
            View Profile
          </button>
          <button className="flex items-center gap-3 text-red-400 hover:text-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-black text-white">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">Host an Event</h2>
        <form onSubmit={handleSubmit} className="mt-4 bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-green-400">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-sm font-medium text-green-400">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventDetails.eventDate}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventTime" className="block text-sm font-medium text-green-400">Event Time</label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              value={eventDetails.eventTime}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-sm font-medium text-green-400">Event Description</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={eventDetails.eventDescription}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Event</button>
        </form>
      </main>
    </div>
  );
};

export default HostEvent;
