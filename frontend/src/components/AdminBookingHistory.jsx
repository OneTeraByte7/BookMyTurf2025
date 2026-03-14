import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
          RESERVATION <span className="text-turf-neon neon-text-glow">RECORDS</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Track all current and past turf allocations.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-5xl"
      >
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-turf-neon/30 transition-all duration-500">
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-turf-neon/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-turf-neon/10 transition-all duration-500"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <Calendar className="text-turf-neon" size={28} />
            </div>
            <div>
              <h3 className="text-sm font-heading tracking-widest text-turf-neon uppercase mb-1">Database Queries</h3>
              <h2 className="text-2xl font-heading text-white uppercase tracking-wide">All Bookings</h2>
            </div>
          </div>

          <div className="overflow-x-auto relative z-10 custom-scrollbar pb-4">
            {loading ? (
              <div className="text-center py-12 text-white/40 font-sans">
                Loading bookings...
              </div>
            ) : (
              <motion.table
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full text-left border-collapse"
            >
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Date</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Deployed At</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">User</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Time Slot</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    variants={itemVariants}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group/row"
                  >
                    <td className="py-5 px-6 font-sans text-white/80">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-6 font-sans">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-turf-blue/70" />
                        <span className="text-white text-lg">{booking.turfId?.turfName || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-sans text-white/80">
                      {booking.userId?.name || 'Guest'}
                    </td>
                    <td className="py-5 px-6 font-sans text-white/80">
                      {booking.timeSlot}
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1 flex items-center w-max gap-2 text-xs font-bold uppercase tracking-widest rounded-full border ${booking.status === 'confirmed' || booking.status === 'completed'
                          ? 'bg-turf-neon/10 border-turf-neon/30 text-turf-neon shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                          : booking.status === 'cancelled'
                            ? 'bg-turf-alert/10 border-turf-alert/30 text-turf-alert shadow-[0_0_10px_rgba(255,51,102,0.2)]'
                            : 'bg-white/5 border-white/20 text-white/70'
                        }`}>
                        {(booking.status === 'confirmed' || booking.status === 'completed') && <CheckCircle size={12} />}
                        {booking.status === 'cancelled' && <XCircle size={12} />}
                        {booking.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
            )}

            {!loading && bookings.length === 0 && (
              <div className="text-center py-12 text-white/40 font-sans">
                No bookings established in the system yet.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingHistory;
