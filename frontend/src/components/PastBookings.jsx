import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, CalendarCheck, Clock } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PastBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const [bookRes, payRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/bookings/my-bookings/${userId}`),
          axios.get(`http://localhost:5000/api/payments/user/${userId}`),
        ]);

        setBookings(bookRes.data || []);
        setPayments(payRes.data || []);
      } catch (error) {
        console.error("Error fetching bookings/payments:", error);
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
    <div className="p-4 md:p-6 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
          <History className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider mb-1">
            MATCH <span className="text-white/50">HISTORY</span>
          </h1>
          <p className="text-white/50 font-sans">Review your past deployments and cancellations.</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-white/20">
          <p className="text-xl text-white/50 font-sans">Loading your match history...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-white/20">
          <p className="text-xl text-white/50 font-sans">No match history found. Time to hit the pitch!</p>
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 max-w-4xl"
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 5 }}
                className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${booking.status === 'confirmed' || booking.status === 'completed' ? 'bg-turf-neon shadow-[0_0_10px_#ccff00]' : 'bg-turf-alert shadow-[0_0_10px_#ff3366]'}`}></div>

                <div className="flex-1 pl-4">
                  <h3 className="text-xl font-heading uppercase text-white tracking-wide mb-2">
                    {booking.turfId?.turfName || 'Unknown Turf'}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm font-sans text-white/60">
                    <div className="flex items-center gap-2">
                      <CalendarCheck size={14} className="text-turf-blue" /> {new Date(booking.date).toLocaleDateString("en-IN")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-turf-blue" /> {booking.timeSlot}
                    </div>
                    {booking.turfId?.location && (
                      <div className="flex items-center gap-2">
                        <span className="text-white/30">📍</span> {booking.turfId.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  {booking.totalPrice !== undefined && booking.totalPrice !== null && (
                    <span className="text-turf-neon font-bold font-sans text-lg">₹{booking.totalPrice}</span>
                  )}
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${booking.status === 'confirmed' || booking.status === 'completed'
                      ? 'bg-turf-neon/10 border-turf-neon text-turf-neon'
                      : 'bg-turf-alert/10 border-turf-alert text-turf-alert'
                    }`}>
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Outstanding payments */}
          <div className="max-w-4xl mt-8">
            <h2 className="text-2xl font-heading text-white mb-4">Outstanding Payments</h2>
            {bookings.filter(b => b.status === 'pending').length === 0 ? (
              <div className="glass-panel p-6 rounded-2xl text-white/60">No outstanding payments.</div>
            ) : (
              bookings.filter(b => b.status === 'pending').map(b => {
                const paid = payments.some(p => p.bookingId && p.bookingId._id === b._id && p.status === 'success');
                const amountDue = paid ? 0 : (b.totalPrice || 0);
                return (
                  <div key={b._id} className="glass-panel p-4 rounded-2xl mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{b.turfId?.turfName || 'Turf'}</div>
                      <div className="text-sm text-white/60">{new Date(b.date).toLocaleDateString()} • {b.timeSlot}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{amountDue}</div>
                      {amountDue > 0 && <a href="/payment" className="text-sm text-turf-blue mt-2 inline-block">Pay Now</a>}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Payment history */}
          <div className="max-w-4xl mt-8">
            <h2 className="text-2xl font-heading text-white mb-4">Payment History</h2>
            {payments.length === 0 ? (
              <div className="glass-panel p-6 rounded-2xl text-white/60">No payments found.</div>
            ) : (
              payments.map(p => (
                <div key={p._id} className="glass-panel p-4 rounded-2xl mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{p.bookingId?.turfId?.turfName || p.bookingId?.turfName || 'Turf'}</div>
                    <div className="text-sm text-white/60">{new Date(p.createdAt).toLocaleDateString()} • {p.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{p.amount}</div>
                    <div className={`text-sm mt-1 ${p.status === 'success' ? 'text-turf-neon' : 'text-turf-alert'}`}>{p.status}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PastBookings;
