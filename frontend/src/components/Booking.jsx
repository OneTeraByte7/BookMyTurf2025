import React, { useEffect, useState } from "react";

const BookTurf = () => {
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const today = new Date();

    // Dummy bookings
    const dummyData = [
      {
        _id: "1",
        turfName: "Green Field Arena",
        date: "2024-12-15",
        timeSlot: "5:00 PM - 6:00 PM",
        price: 500,
      },
      {
        _id: "2",
        turfName: "Royal Turf",
        date: "2025-03-12",
        timeSlot: "6:00 PM - 7:00 PM",
        price: 600,
      },
      {
        _id: "3",
        turfName: "Elite Arena",
        date: "2025-04-10",
        timeSlot: "7:00 PM - 8:00 PM",
        price: 700,
      },
      {
        _id: "4",
        turfName: "Victory Ground",
        date: "2025-04-25",
        timeSlot: "4:00 PM - 5:00 PM",
        price: 550,
      },
    ];

    const filteredPastBookings = dummyData.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate < today;
    });

    setPastBookings(filteredPastBookings);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Past Booked Turfs</h2>

      {pastBookings.length === 0 ? (
        <p className="text-gray-400">No past bookings found.</p>
      ) : (
        <div className="space-y-4">
          {pastBookings.map((booking) => (
            <div key={booking._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-300">{booking.turfName}</h3>
              <p>📅 Date: {booking.date}</p>
              <p>⏰ Time Slot: {booking.timeSlot}</p>
              <p>💰 Paid: ₹{booking.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookTurf;
