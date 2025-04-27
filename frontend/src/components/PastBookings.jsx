import React from "react";

const PastBookings = () => {
  const dummyBookings = [
    {
      id: 1,
      turfName: "Green Valley Turf",
      date: "2025-04-20",
      timeSlot: "4:00 PM - 5:00 PM",
      status: "Completed",
    },
    {
      id: 2,
      turfName: "Sunrise Sports Arena",
      date: "2025-04-18",
      timeSlot: "6:00 PM - 7:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      turfName: "Downtown Football Ground",
      date: "2025-04-15",
      timeSlot: "8:00 PM - 9:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Your Past Bookings</h2>
      {dummyBookings.length === 0 ? (
        <p>No past bookings found.</p>
      ) : (
        <div className="space-y-4">
          {dummyBookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-green-800 rounded shadow-md">
              <h3 className="text-xl font-semibold">{booking.turfName}</h3>
              <p>Date: {booking.date}</p>
              <p>Time Slot: {booking.timeSlot}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastBookings;
