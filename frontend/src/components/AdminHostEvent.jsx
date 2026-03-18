import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Home, Calendar, Clock, AlignLeft, Send, CheckCircle, MapPin } from 'lucide-react';

const HostEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    turfName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const submitEvent = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.post('http://localhost:5000/api/events', eventDetails, { headers });
        console.log('Event created:', res.data);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setEventDetails({ eventName: '', eventDate: '', eventTime: '', eventDescription: '', turfName: '' });
      } catch (err) {
        console.error('Error creating event:', err.response?.data || err.message);
        setError(err.response?.data?.msg || 'Failed to create event. Make sure you are logged in.');
      }
    };

    submitEvent();
  };

  return (
    <div className="p-4 md:p-6 bg-transparent min-h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider mb-2">
          HOST A <span className="text-turf-alert drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]">TOURNAMENT</span>
        </h1>
        <p className="text-white/50 font-sans">Broadcast an event to the player network.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-3xl"
      >
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-turf-alert/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-turf-alert/20 transition-all duration-700"></div>

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <Home className="text-turf-alert" size={24} />
            </div>
            <div>
              <h3 className="text-xs font-heading tracking-widest text-turf-alert uppercase mb-1">Combine Setup</h3>
              <h2 className="text-xl font-heading text-white uppercase tracking-wide">Configure Event Parameters</h2>
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

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-turf-alert/20 border border-turf-alert/50 text-turf-alert p-4 mb-6 rounded-xl font-medium relative z-10 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Event Title - Full Width */}
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

              {/* Turf / Venue Name */}
              <div className="md:col-span-2">
                <label className="turf-label flex items-center gap-2">
                  <MapPin size={14} className="text-turf-alert" /> Venue / Turf Name
                </label>
                <input
                  type="text"
                  name="turfName"
                  value={eventDetails.turfName}
                  onChange={handleInputChange}
                  className="turf-input"
                  placeholder="e.g. Victory Arena, Mumbai"
                />
              </div>

              {/* Date */}
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

              {/* Time */}
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

              {/* Description - Full Width */}
              <div className="md:col-span-2">
                <label className="turf-label flex items-center gap-2">
                  <AlignLeft size={14} className="text-turf-alert" /> Mission Brief (Description)
                </label>
                <textarea
                  name="eventDescription"
                  value={eventDetails.eventDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="turf-input resize-y min-h-[100px]"
                  placeholder="Provide context on the event, rules, and stakes..."
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-4 bg-turf-alert text-white font-heading text-lg uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all duration-300 flex justify-center items-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
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
