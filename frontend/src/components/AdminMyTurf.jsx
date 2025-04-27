import React from 'react';

const MyTurf = () => {
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
        <h2 className="text-2xl font-semibold text-green-400 mb-6">My Turf</h2>
        <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-green-400">Turf Details</h3>
          <p>Name: Turf A</p>
          <p>Location: Location X</p>
          <p>Available Time: 10:00 AM - 6:00 PM</p>
          <p>Price: $50 per hour</p>
          {/* More Turf details can be added */}
        </div>
      </main>
    </div>
  );
};

export default MyTurf;
