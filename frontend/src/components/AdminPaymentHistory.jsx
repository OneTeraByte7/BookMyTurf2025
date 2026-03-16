import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, IndianRupee, Calendar } from 'lucide-react';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/payments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
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
          FINANCIAL <span className="text-turf-blue blue-text-glow">LOGS</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Monitor transaction history and revenue streams.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-5xl"
      >
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-turf-blue/10 rounded-full blur-[50px] pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <CreditCard className="text-turf-blue" size={28} />
            </div>
            <div>
              <h3 className="text-sm font-heading tracking-widest text-turf-blue uppercase mb-1">System Records</h3>
              <h2 className="text-2xl font-heading text-white uppercase tracking-wide">Recent Transactions</h2>
            </div>
          </div>

          <div className="overflow-x-auto relative z-10 custom-scrollbar pb-4">
            {loading ? (
              <div className="text-center py-12 text-white/40 font-sans">
                Loading payment records...
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
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Date of Transaction</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Turf</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">User</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Amount Processed</th>
                  <th className="py-4 px-6 text-xs font-heading tracking-widest text-white/40 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <motion.tr
                    key={payment._id}
                    variants={itemVariants}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group/row"
                  >
                    <td className="py-5 px-6 font-sans text-white/80 flex items-center gap-3">
                      <Calendar size={16} className="text-turf-blue/50 group-hover/row:text-turf-blue transition-colors" /> {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-6 font-sans text-white/80">
                      {payment.bookingId?.turfId?.turfName || payment.bookingId?.turfName || 'Unknown'}
                    </td>
                    <td className="py-5 px-6 font-sans text-white/80">
                      {payment.userId?.name || 'Guest'}
                    </td>
                    <td className="py-5 px-6 font-sans">
                      <div className="flex items-center gap-1">
                        <IndianRupee size={16} className="text-turf-neon" />
                        <span className="text-white text-lg font-bold">{payment.amount}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border ${payment.status === 'success' || payment.status === 'completed' || payment.status === 'confirmed'
                          ? 'bg-turf-neon/10 border-turf-neon/30 text-turf-neon shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                          : 'bg-turf-alert/10 border-turf-alert/30 text-turf-alert shadow-[0_0_10px_rgba(255,51,102,0.2)]'
                        }`}>
                        {payment.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
            )}

            {!loading && payments.length === 0 && (
              <div className="text-center py-12 text-white/40 font-sans">
                No financial records found in the system.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
