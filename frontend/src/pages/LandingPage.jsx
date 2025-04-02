import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <header className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500">
          BookMyTurf
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-3">
          Find & book the best sports turfs near you!
        </p>
      </header>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="px-6 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition">
          Login
        </button>
        <button className="px-6 py-2 bg-transparent border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-500 hover:text-black transition">
          Sign Up
        </button>
      </div>

      {/* Info Section */}
      <section className="mt-10 text-center max-w-3xl">
        <h2 className="text-2xl text-green-400 font-semibold">Why Choose Us?</h2>
        <p className="text-gray-400 mt-2">
          We provide the most convenient way to book sports turfs with real-time availability, event management, and AI-powered recommendations.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BookMyTurf. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
