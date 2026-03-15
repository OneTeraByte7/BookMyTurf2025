import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, MapPin, Clock, IndianRupee } from 'lucide-react';
import axios from 'axios';

const MyTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/turfs");
        setTurfs(response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 bg-transparent min-h-full flex items-center justify-center">
        <div className="glass-panel p-10 rounded-3xl text-center">
          <p className="text-xl text-white/50 font-sans">Loading turfs...</p>
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
          MY <span className="text-turf-alert">DEPLOYMENTS</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Manage your registered turf facilities.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-4xl space-y-6"
      >
        {turfs.length === 0 ? (
          <div className="glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-white/20">
            <p className="text-xl text-white/50 font-sans">No turfs registered yet.</p>
          </div>
        ) : (
          turfs.map((turf) => (
            <div key={turf._id} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-turf-alert/30 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-turf-alert/5 rounded-full blur-[50px] group-hover:bg-turf-alert/10 transition-all"></div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
                  <Landmark className="text-turf-alert" size={32} />
                </div>
                <div>
                  <h3 className="text-sm font-heading tracking-widest text-turf-alert uppercase mb-1">Active Listing</h3>
                  <h2 className="text-3xl font-heading text-white uppercase tracking-wide">{turf.turfName}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                  <MapPin className="text-white/40" size={20} />
                  <div>
                    <p className="text-xs text-white/40 uppercase font-bold tracking-wider mb-1">Location</p>
                    <p className="text-white font-medium font-sans">{turf.location}</p>
                  </div>
                </div>

                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                  <Clock className="text-white/40" size={20} />
                  <div>
                    <p className="text-xs text-white/40 uppercase font-bold tracking-wider mb-1">Contact</p>
                    <p className="text-white font-medium font-sans">{turf.contactNumber}</p>
                  </div>
                </div>

                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                  <IndianRupee className="text-turf-alert" size={20} />
                  <div>
                    <p className="text-xs text-turf-alert uppercase font-bold tracking-wider mb-1">Pricing Rate</p>
                    <p className="text-white font-medium font-sans text-lg">₹{turf.pricePerHour} <span className="text-sm text-white/50">/ hr</span></p>
                  </div>
                </div>
              </div>

              {turf.description && (
                <div className="mt-6 relative z-10">
                  <p className="text-white/60 font-sans text-sm">{turf.description}</p>
                </div>
              )}

              <div className="mt-8 relative z-10 flex gap-4">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-heading uppercase tracking-wide transition-colors">
                  Edit Details
                </button>
                <button className="px-6 py-3 bg-turf-alert/10 hover:bg-turf-alert/20 border border-turf-alert/30 rounded-xl text-turf-alert font-heading uppercase tracking-wide transition-colors">
                  Manage Slots
                </button>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default MyTurf;
