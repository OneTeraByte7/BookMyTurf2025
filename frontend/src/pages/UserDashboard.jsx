import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <UserSidebar />
      <main className="flex-1 p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Welcome to BookMyTurf!</h1>
        <p className="text-lg text-gray-300 max-w-xl text-center">
          Explore turfs, view your booking history, check upcoming events, and interact with our AI bot. All in one place!
        </p>
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
