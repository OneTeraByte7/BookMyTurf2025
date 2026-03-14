import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const MyTurf = () => {
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
            <Link to="/admin/ai-bot" className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
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

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-black text-white">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">My Turf</h2>
        <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-green-400">Turf Details</h3>
          <p>Name: Turf A</p>
          <p>Location: Location X</p>
          <p>Available Time: 10:00 AM - 6:00 PM</p>
          <p>Price: $50 per hour</p>
        </div>
      </main>
    </div>
  );
};

export default MyTurf;
