import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        const allEvents = res.data;
        const shuffled = [...allEvents].sort(() => 0.5 - Math.random());
        setEvents(shuffled.slice(0, 4)); // Show 4 random events
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="bg-[#0f3813] p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-300">{event.eventName}</h3>
            <p className="text-sm text-gray-300 mb-2">📍 {event.turfName}</p>
            <p className="text-sm text-gray-400">
              🗓 {event.date} | 🕒 {event.time}
            </p>
            <p className="mt-2 text-gray-200">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
