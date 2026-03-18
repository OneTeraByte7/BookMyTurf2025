import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, XCircle, IndianRupee } from 'lucide-react';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-6 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider mb-2">
          RESERVATION <span className="text-turf-neon neon-text-glow">RECORDS</span>
        </h1>
        <p className="text-white/50 font-sans">Track all current and past turf allocations.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="glass-panel p-4 md:p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-turf-neon/30 transition-all duration-500">
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-turf-neon/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-turf-neon/10 transition-all duration-500"></div>

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <Calendar className="text-turf-neon" size={24} />
            </div>
            <div>
              <h3 className="text-xs font-heading tracking-widest text-turf-neon uppercase mb-1">Database Queries</h3>
              <h2 className="text-xl font-heading text-white uppercase tracking-wide">All Bookings</h2>
            </div>
          </div>

          <div className="overflow-x-auto relative z-10 custom-scroll pb-2">
            {loading ? (
              <div className="text-center py-12 text-white/40 font-sans">
                Loading bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-white/40 font-sans">
                No bookings established in the system yet.
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
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Date</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Turf</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Location</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">User</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Time Slot</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Amount</th>
                    <th className="py-3 px-4 text-xs font-heading tracking-widest text-white/40 uppercase whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <motion.tr
                      key={booking._id}
                      variants={itemVariants}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group/row"
                    >
                      <td className="py-4 px-4 font-sans text-white/80 whitespace-nowrap text-sm">
                        {new Date(booking.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-4 px-4 font-sans whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-turf-blue/70 shrink-0" />
                          <span className="text-white text-sm">{booking.turfId?.turfName || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-sans text-white/60 text-sm whitespace-nowrap">
                        {booking.turfId?.location || '—'}
                      </td>
                      <td className="py-4 px-4 font-sans text-white/80 text-sm whitespace-nowrap">
                        {booking.userId?.name || 'Guest'}
                        {booking.userId?.email && (
                          <p className="text-white/30 text-xs">{booking.userId.email}</p>
                        )}
                      </td>
                      <td className="py-4 px-4 font-sans text-white/80 text-sm whitespace-nowrap">
                        {booking.timeSlot}
                      </td>
                      <td className="py-4 px-4 font-sans whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <IndianRupee size={14} className="text-turf-neon" />
                          <span className="text-white font-bold text-sm">{booking.totalPrice || '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 flex items-center w-max gap-2 text-xs font-bold uppercase tracking-widest rounded-full border ${booking.status === 'confirmed' || booking.status === 'completed'
                            ? 'bg-turf-neon/10 border-turf-neon/30 text-turf-neon shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                            : booking.status === 'cancelled'
                              ? 'bg-turf-alert/10 border-turf-alert/30 text-turf-alert shadow-[0_0_10px_rgba(255,51,102,0.2)]'
                              : 'bg-white/5 border-white/20 text-white/70'
                          }`}>
                          {(booking.status === 'confirmed' || booking.status === 'completed') && <CheckCircle size={11} />}
                          {booking.status === 'cancelled' && <XCircle size={11} />}
                          {booking.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingHistory;
