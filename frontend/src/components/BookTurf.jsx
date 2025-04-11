import React, { useEffect, useState } from "react";
import axios from "axios";

const BookTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/turfs")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error("Error fetching turfs:", err));
  }, []);

  const handleBookingChange = (turfId, field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [turfId]: {
        ...prev[turfId],
        [field]: value,
      },
    }));
  };

  const handleBookNow = (turfId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book a turf.");
      return;
    }
  
    const booking = bookingData[turfId];
    if (!booking || !booking.date || !booking.timeSlot) {
      alert("Please select a date and time slot to book.");
      return;
    }
  
    const payload = {
      turfId,
      date: booking.date,
      timeSlot: booking.timeSlot,
    };
  
    axios.post("http://localhost:5000/api/bookings", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert("Booking submitted successfully!");
      })
      .catch((err) => {
        console.error("Booking error:", err);
        alert("Failed to book. Try again.");
      });
  };
  

  const timeSlots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM"
  ];

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Available Turfs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turfs.map((turf) => (
          <div
            key={turf._id}
            className="bg-[#0f3813] p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-green-300">{turf.turfName}</h2>
            <p className="mt-2 text-sm text-gray-300">📍 {turf.location}</p>
            <p className="text-sm">📞 {turf.contactNumber}</p>
            <p className="text-sm">💰 ₹{turf.pricePerHour}/hr</p>
            <p className="mt-1 text-sm italic">📝 {turf.description}</p>

            <div className="mt-4 space-y-2">
              <label className="block text-sm text-gray-200">Select Date:</label>
              <input
                type="date"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={bookingData[turf._id]?.date || ""}
                onChange={(e) =>
                  handleBookingChange(turf._id, "date", e.target.value)
                }
              />

              <label className="block text-sm mt-2 text-gray-200">Select Time Slot:</label>
              <select
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={bookingData[turf._id]?.timeSlot || ""}
                onChange={(e) =>
                  handleBookingChange(turf._id, "timeSlot", e.target.value)
                }
              >
                <option value="">-- Select Time Slot --</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleBookNow(turf._id)}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTurf;
