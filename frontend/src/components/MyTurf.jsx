import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyTurf = () => {
  const [turf, setTurf] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const adminId = decoded.id;

      axios
        .get(`http://localhost:5000/api/turfs/admin/${adminId}`)
        .then((res) => setTurf(res.data))
        .catch((err) => console.error("Error fetching turf:", err));
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  if (!turf) {
    return (
      <div className="text-white text-xl p-10">
        You haven’t registered a turf yet.
      </div>
    );
  }

  return (
    <div className="p-10 text-white space-y-4">
      <h2 className="text-3xl font-bold text-green-400 mb-4">My Turf Details</h2>
      <img
        src={turf.imageUrl}
        alt="Turf"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
      <p><strong className="text-green-300">Name:</strong> {turf.turfName}</p>
      <p><strong className="text-green-300">Location:</strong> {turf.location}</p>
      <p><strong className="text-green-300">Contact:</strong> {turf.contactNumber}</p>
      <p><strong className="text-green-300">Price/Hour:</strong> ₹{turf.pricePerHour}</p>
      <p><strong className="text-green-300">Available Slots:</strong></p>
      <ul className="list-disc ml-6">
        {turf.availableSlots.map((slot, i) => (
          <li key={i}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTurf;
