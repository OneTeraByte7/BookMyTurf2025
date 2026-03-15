import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Landmark, MapPin, IndianRupee, Phone, List, FileText, Image, CheckCircle } from "lucide-react";

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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/turfs/register", formData);
      setSuccess(true);
      setFormData({
        turfName: "",
        location: "",
        pricePerHour: "",
        contactNumber: "",
        facilities: "",
        description: "",
        imageUrl: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Error registering turf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-turf-space text-white p-4 py-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-turf-alert/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-turf-alert/10 flex items-center justify-center mb-4 border border-turf-alert/30">
            <Landmark className="text-turf-alert" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading text-white tracking-widest uppercase text-center">
            Deploy New <span className="text-turf-alert drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]">Pitch</span>
          </h2>
          <p className="text-white/50 font-sans mt-2 text-center">Register a new turf facility to the intelligence grid.</p>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-turf-neon/20 border border-turf-neon/50 text-turf-neon p-4 mb-6 rounded-xl text-center font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} /> Turf Deployed Successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="turf-label flex items-center gap-2">
                <Landmark size={14} className="text-turf-alert" /> Turf Name
              </label>
              <input
                className="turf-input"
                name="turfName"
                placeholder="e.g. Anfield Arena"
                value={formData.turfName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="turf-label flex items-center gap-2">
                <MapPin size={14} className="text-turf-alert" /> Location
              </label>
              <input
                className="turf-input"
                name="location"
                placeholder="City, Area"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="turf-label flex items-center gap-2">
                <IndianRupee size={14} className="text-turf-alert" /> Price / Hour
              </label>
              <input
                className="turf-input"
                name="pricePerHour"
                type="number"
                placeholder="₹ Amount"
                value={formData.pricePerHour}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="turf-label flex items-center gap-2">
                <Phone size={14} className="text-turf-alert" /> Contact
              </label>
              <input
                className="turf-input"
                name="contactNumber"
                placeholder="+91..."
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <List size={14} className="text-turf-alert" /> Facilities
            </label>
            <input
              className="turf-input"
              name="facilities"
              placeholder="Floodlights, Washroom, Parking (comma separated)"
              value={formData.facilities}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <FileText size={14} className="text-turf-alert" /> Description
            </label>
            <textarea
              className="turf-input min-h-[100px] resize-y"
              name="description"
              placeholder="Details about the pitch..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <Image size={14} className="text-turf-alert" /> Image URL
            </label>
            <input
              className="turf-input"
              name="imageUrl"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 font-heading text-xl uppercase tracking-wider rounded-xl transition-all duration-300 flex justify-center items-center gap-2 ${loading
                ? "bg-turf-alert/50 text-white/50 cursor-not-allowed"
                : "bg-turf-alert text-white hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              }`}
          >
            {loading ? "Authorizing..." : <><CheckCircle size={20} /> Register Turf</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
