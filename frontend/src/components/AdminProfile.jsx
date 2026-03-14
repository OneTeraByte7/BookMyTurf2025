import React, { useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    turfName: "",
    location: "",
    pricePerHour: "",
    contactNumber: "",
    facilities: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/turfs/register", formData);
      alert("Turf registered successfully!");
      setFormData({
        turfName: "",
        location: "",
        pricePerHour: "",
        contactNumber: "",
        facilities: "",
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      alert("Error registering turf");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f3813] p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">
          Register Your Turf
        </h2>

        <input
          name="turfName"
          placeholder="Turf Name"
          value={formData.turfName}
          onChange={handleChange}
          required
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <input
          name="pricePerHour"
          placeholder="Price per Hour"
          value={formData.pricePerHour}
          onChange={handleChange}
          required
          type="number"
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <input
          name="facilities"
          placeholder="Facilities (Comma separated)"
          value={formData.facilities}
          onChange={handleChange}
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-3 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mb-6 p-3 w-full bg-black border border-gray-600 rounded text-white"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 w-full rounded"
        >
          Register Turf
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
