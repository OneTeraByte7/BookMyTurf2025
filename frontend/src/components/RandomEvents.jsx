import React from "react";

const RandomEvents = () => {
  const dummyEvents = [
    {
      id: 1,
      title: "Summer Football Tournament",
      date: "2025-05-10",
      location: "Green Valley Turf",
      description: "Join the biggest summer football tournament in the city!",
    },
    {
      id: 2,
      title: "Midnight Turf Challenge",
      date: "2025-05-18",
      location: "Sunrise Sports Arena",
      description: "Play thrilling midnight football matches and win prizes!",
    },
    {
      id: 3,
      title: "Kids Soccer Camp",
      date: "2025-06-01",
      location: "Downtown Football Ground",
      description: "Special coaching camp for kids aged 6-14. Limited slots!",
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Upcoming Events</h2>
      {dummyEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="space-y-4">
          {dummyEvents.map((event) => (
            <div key={event.id} className="p-4 bg-green-800 rounded shadow-md">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="mt-1">Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p className="mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomEvents;
