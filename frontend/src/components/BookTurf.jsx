import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, Phone, IndianRupee, Info, Clock, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BookTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [bookedTurfs, setBookedTurfs] = useState(new Set()); // Track booked turfs
  const navigate = useNavigate();

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

  const handleBookNow = async (turfId) => {
    try {
      const token = localStorage.getItem("token");
      let userId = null;
      if (token) {
        try { userId = jwtDecode(token).id; } catch (e) { /* ignore */ }
      }

      const response = await axios.post('http://localhost:5000/api/bookings', {
        turfId: turfId,
        date: bookingData[turfId]?.date,
        timeSlot: bookingData[turfId]?.timeSlot,
        userId: userId,
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      console.log("Booking created:", response.data);
      setBookedTurfs((prev) => new Set(prev).add(turfId));

      // If booking returned, navigate to payment page to complete payment
      if (response.data.booking) {
        navigate('/payment', { state: { booking: response.data.booking } });
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
          DOMINATE <span className="text-turf-neon neon-text-glow">THE TURF</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Select your battleground and book your slot.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {turfs.map((turf) => {
          const isBooked = bookedTurfs.has(turf._id);

          return (
            <motion.div
              key={turf._id}
              variants={cardVariants}
              whileHover={!isBooked ? { y: -10, scale: 1.02 } : {}}
              className={`relative rounded-3xl overflow-hidden glass-panel border ${isBooked ? 'border-turf-alert/50' : 'border-white/10 hover:border-turf-neon/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]'} transition-all duration-300 flex flex-col`}
            >
              {/* Card Header Background Graphic */}
              <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-0"></div>
              {/* Optional: Add a texture or image here */}
              <div className={`absolute top-0 right-0 w-40 h-40 ${isBooked ? 'bg-turf-alert/20' : 'bg-turf-neon/20'} rounded-full blur-[60px] pointer-events-none`}></div>

              <div className="p-6 relative z-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-heading text-white uppercase tracking-wider leading-none drop-shadow-md">{turf.turfName}</h2>
                  {isBooked && (
                    <span className="px-3 py-1 bg-turf-alert/20 border border-turf-alert rounded-full text-turf-alert text-xs font-bold uppercase tracking-widest animate-pulse">
                      Booked
                    </span>
                  )}
                </div>

                <div className="space-y-3 font-sans text-sm text-white/80 mb-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-turf-blue" size={18} />
                    <span>{turf.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-turf-blue" size={18} />
                    <span>{turf.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee className="text-turf-neon" size={18} />
                    <span className="font-bold text-lg text-white">₹{turf.pricePerHour}<span className="text-sm font-normal text-white/50">/hr</span></span>
                  </div>
                  <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5">
                    <Info className="text-white/40 mt-1 shrink-0" size={16} />
                    <span className="text-white/60 italic leading-relaxed">{turf.description}</span>
                  </div>
                </div>

                {/* Booking Controls */}
                <div className="space-y-4 bg-black/40 p-5 rounded-2xl border border-white/5">
                  <div>
                    <label className="turf-label flex items-center gap-2">
                      <CalendarIcon size={14} className="text-turf-neon" /> Match Date
                    </label>
                    <input
                      type="date"
                      className="turf-input"
                      value={bookingData[turf._id]?.date || ""}
                      onChange={(e) => handleBookingChange(turf._id, "date", e.target.value)}
                      disabled={isBooked}
                    />
                  </div>

                  <div>
                    <label className="turf-label flex items-center gap-2 mt-4">
                      <Clock size={14} className="text-turf-neon" /> Kickoff Time
                    </label>
                    <div className="relative">
                      <select
                        className="turf-input appearance-none"
                        value={bookingData[turf._id]?.timeSlot || ""}
                        onChange={(e) => handleBookingChange(turf._id, "timeSlot", e.target.value)}
                        disabled={isBooked}
                      >
                        <option value="" className="bg-turf-dark text-white/50">-- Select Slot --</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-turf-dark text-white">
                            {slot}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 z-10 mt-auto">
                <button
                  onClick={() => handleBookNow(turf._id)}
                  className={`w-full py-4 font-heading text-xl md:text-2xl uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isBooked
                      ? 'bg-turf-alert/20 border-2 border-turf-alert/50 text-turf-alert/50 cursor-not-allowed'
                      : 'bg-turf-neon/10 border-2 border-turf-neon text-turf-neon hover:bg-turf-neon hover:text-black hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                    }`}
                  disabled={isBooked}
                >
                  {isBooked ? "Slot Unavailable" : "Deploy Squad"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BookTurf;
