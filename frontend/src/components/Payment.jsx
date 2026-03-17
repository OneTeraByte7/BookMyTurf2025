import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, IndianRupee, Calendar, Clock, Zap } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get booking data from navigation state or latest booking
    if (location.state?.booking) {
      setBookingData(location.state.booking);
    } else {
      // Fetch the latest pending booking for the user
      const fetchLatestBooking = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.id;
            
            const response = await axios.get(`http://localhost:5000/api/bookings/my-bookings/${userId}`);
            const bookings = response.data;
            if (bookings.length > 0) {
              setBookingData(bookings[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
        }
      };
      fetchLatestBooking();
    }
  }, [location]);

  const navigate = useNavigate();

  const paymentMethods = [
    { name: "Google Pay", icon: Smartphone },
    { name: "Debit Card", icon: CreditCard },
    { name: "Paytm", icon: Smartphone },
    { name: "UPI", icon: Smartphone },
    { name: "Credit Card", icon: CreditCard }
  ];

  if (!bookingData) {
    return (
      <div className="p-4 md:p-8 bg-transparent min-h-full flex items-center justify-center">
        <div className="glass-panel p-10 rounded-3xl text-center">
          <p className="text-xl text-white/50 font-sans">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
          SECURE <span className="text-turf-blue blue-text-glow">CHECKOUT</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Finalize your booking and secure the pitch.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="glass-panel p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-turf-blue/20 rounded-full blur-[40px] pointer-events-none"></div>

          <h3 className="text-sm font-heading tracking-widest text-white/40 uppercase mb-6">Booking Summary</h3>

          <div className="bg-turf-space border border-white/5 rounded-2xl p-6 mb-8">
            <h2 className="text-3xl font-heading text-white mb-4 uppercase">{bookingData.turfId?.turfName || 'Turf Booking'}</h2>

            <div className="space-y-4 font-sans text-white/70">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="flex items-center gap-3"><Calendar size={18} className="text-turf-blue" /> Date</span>
                <span className="text-white font-medium">{new Date(bookingData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="flex items-center gap-3"><Clock size={18} className="text-turf-blue" /> Time Slot</span>
                <span className="text-white font-medium">{bookingData.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="flex items-center gap-3"><IndianRupee size={18} className="text-turf-neon" /> Total Amount</span>
                <span className="text-3xl font-bold text-turf-neon">₹{bookingData.totalPrice}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="glass-panel p-8 rounded-3xl"
        >
          <h3 className="text-sm font-heading tracking-widest text-white/40 uppercase mb-6">Payment Method</h3>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method, index) => (
              <button
                key={index}
                onClick={() => setSelectedMethod(method.name)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${selectedMethod === method.name
                    ? "bg-turf-blue/10 border-turf-blue text-turf-blue shadow-[0_0_15px_rgba(0,212,255,0.2)] scale-[1.02]"
                    : "bg-turf-space border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                  }`}
              >
                <method.icon size={24} className={selectedMethod === method.name ? "text-turf-blue" : "text-white/40"} />
                <span className="font-semibold">{method.name}</span>
              </button>
            ))}
          </div>

          {selectedMethod === "Google Pay" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-black/50 p-6 rounded-2xl border border-turf-blue/30 text-center mb-8"
            >
              <p className="text-sm text-white/60 mb-4">Scan using any UPI App</p>
              <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center p-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  alt="QR Code"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            </motion.div>
          )}

          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem('token');
                let userId = bookingData.userId || null;
                if (!userId && token) {
                  try { userId = jwtDecode(token).id; } catch (e) { }
                }

                const payload = {
                  bookingId: bookingData._id,
                  userId,
                  amount: Number(bookingData.totalPrice) || 0,
                  method: selectedMethod ? selectedMethod.toLowerCase() : 'card',
                  status: 'success',
                };

                const res = await axios.post('http://localhost:5000/api/payments', payload, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {}
                });

                console.log('Payment recorded:', res.data);
                // Navigate to user's bookings or show confirmation
                navigate('/user-dashboard');
              } catch (err) {
                console.error('Payment error:', err);
                alert('Payment failed. Please try again.');
              }
            }}
            className="w-full py-4 bg-turf-blue text-black font-heading text-xl uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap size={20} /> Authorize Payment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
