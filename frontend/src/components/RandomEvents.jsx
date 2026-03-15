import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Trophy } from "lucide-react";
import axios from "axios";

const RandomEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
            OPEN <span className="text-turf-alert">COMBINES</span>
          </h1>
          <p className="text-white/50 font-sans text-lg">Discover exclusive public events and challenges.</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-white/20">
          <p className="text-xl text-white/50 font-sans">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-white/20">
          <p className="text-xl text-white/50 font-sans">No public events listed.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {events.map((event) => (
            <motion.div
              key={event._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-turf-alert/50 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-turf-alert/10 rounded-full blur-[40px] group-hover:bg-turf-alert/20 transition-all"></div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="p-3 bg-turf-alert/10 border border-turf-alert/30 rounded-xl text-turf-alert">
                  <Trophy size={24} />
                </div>
                <span className="px-3 py-1 bg-white/5 text-white/50 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                  Open Event
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-heading text-white tracking-wide uppercase mb-3 drop-shadow-md group-hover:text-turf-alert transition-colors">{event.eventName}</h3>

                <p className="text-white/70 font-sans text-sm mb-6 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3 font-sans text-sm text-white/60 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-turf-blue" size={16} /> <span className="text-white">{event.turfName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="text-turf-neon" size={16} /> <span>{event.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RandomEvents;
