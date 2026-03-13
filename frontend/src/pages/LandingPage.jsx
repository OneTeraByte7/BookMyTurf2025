import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <header className="text-center px-6 mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500">
          BookMyTurf
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-3">
          Find & book the best sports turfs near you!
        </p>
      </header>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          className="px-6 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-2 bg-transparent border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-500 hover:text-black transition"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Features Section */}
      <section className="mt-16 text-center max-w-4xl px-6">
        <h2 className="text-3xl text-green-400 font-semibold">Why Choose Us?</h2>
        <p className="text-gray-400 mt-2">
          We provide a seamless booking experience with real-time availability, event management, and AI-powered recommendations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-green-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-green-400 font-bold">Real-Time Booking</h3>
            <p className="text-gray-300">See live turf availability and book instantly.</p>
          </div>
          <div className="bg-green-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-green-400 font-bold">AI-Powered Suggestions</h3>
            <p className="text-gray-300">Get recommendations based on your preferences.</p>
          </div>
          <div className="bg-green-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-green-400 font-bold">Event Hosting</h3>
            <p className="text-gray-300">Easily create and manage sports events.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-16 text-center max-w-3xl px-6">
        <h2 className="text-3xl text-green-400 font-semibold">What Our Users Say</h2>
        <p className="text-gray-400 mt-2 italic">
          "Booking a turf has never been easier! The AI recommendations are spot on."
        </p>
        <p className="text-gray-400 mt-2 italic">
          "I hosted a football tournament, and everything went smoothly. 10/10 experience!"
        </p>
      </section>

      {/* Contact */}
      <section className="mt-16 text-center max-w-3xl px-6">
        <h2 className="text-3xl text-green-400 font-semibold">Get in Touch</h2>
        <p className="text-gray-400 mt-2">
          Have questions? Reach out to us at <span className="text-green-400">support@bookmyturf.com</span>
        </p>
      </section>

      {/* Custom Grass Effect */}
      <div className="relative w-full mt-16">
        <div className="w-full h-14 bg-green-600 rounded-t-full"></div>
        <div className="w-full h-12 bg-green-700 rounded-t-full mt-[-8px]"></div>
        <div className="w-full h-10 bg-green-800 rounded-t-full mt-[-6px]"></div>
      </div>

      {/* Footer */}
      <footer className="mt-6 mb-8 text-gray-500 text-sm">
        © 2025 BookMyTurf. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
