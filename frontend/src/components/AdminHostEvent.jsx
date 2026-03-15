import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Clock, AlignLeft, Send, CheckCircle } from 'lucide-react';

const HostEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Details:', eventDetails);

    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEventDetails({ eventName: '', eventDate: '', eventTime: '', eventDescription: '' });
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
          HOST A <span className="text-turf-alert drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]">TOURNAMENT</span>
        </h1>
        <p className="text-white/50 font-sans text-lg">Broadcast an event to the player network.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-3xl"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-turf-alert/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-turf-alert/20 transition-all duration-700"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <Home className="text-turf-alert" size={28} />
            </div>
            <div>
              <h3 className="text-sm font-heading tracking-widest text-turf-alert uppercase mb-1">Combine Setup</h3>
              <h2 className="text-2xl font-heading text-white uppercase tracking-wide">Configure Event Parameters</h2>
            </div>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-turf-neon/20 border border-turf-neon/50 text-turf-neon p-4 mb-6 rounded-xl font-medium flex items-center gap-3 relative z-10"
            >
              <CheckCircle size={20} /> Event broadcasted successfully to the network!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="turf-label flex items-center gap-2">
                  <Home size={14} className="text-turf-alert" /> Event Title
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleInputChange}
                  className="turf-input"
                  placeholder="e.g. Midnight Regional Cup"
                  required
                />
              </div>

              <div>
                <label className="turf-label flex items-center gap-2">
                  <Calendar size={14} className="text-turf-alert" /> Broadcast Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={eventDetails.eventDate}
                  onChange={handleInputChange}
                  className="turf-input uppercase"
                  required
                />
              </div>

              <div>
                <label className="turf-label flex items-center gap-2">
                  <Clock size={14} className="text-turf-alert" /> Start Time
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={eventDetails.eventTime}
                  onChange={handleInputChange}
                  className="turf-input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="turf-label flex items-center gap-2">
                  <AlignLeft size={14} className="text-turf-alert" /> Mission Brief (Description)
                </label>
                <textarea
                  name="eventDescription"
                  value={eventDetails.eventDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="turf-input resize-y min-h-[120px]"
                  placeholder="Provide context on the event, rules, and stakes..."
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-turf-alert text-white font-heading text-xl uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all duration-300 flex justify-center flex-row-reverse items-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={20} /> Deploy Event
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default HostEvent;
