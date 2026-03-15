import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, MapPin, Clock, IndianRupee, Plus, X } from 'lucide-react';
import axios from 'axios';

const MyTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    turfName: '',
    location: '',
    pricePerHour: '',
    contactNumber: '',
    facilities: '',
    description: '',
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTurfs();
  }, []);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to register a turf');
        setSubmitting(false);
        return;
      }

      const facilitiesArray = formData.facilities
        .split(',')
        .map(f => f.trim())
        .filter(f => f);

      const payload = {
        turfName: formData.turfName,
        location: formData.location,
        pricePerHour: Number(formData.pricePerHour),
        contactNumber: formData.contactNumber,
        facilities: facilitiesArray,
        description: formData.description,
        imageUrl: formData.imageUrl
      };

      await axios.post('http://localhost:5000/api/turfs/register', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setShowAddForm(false);
      setFormData({
        turfName: '',
        location: '',
        pricePerHour: '',
        contactNumber: '',
        facilities: '',
        description: '',
        imageUrl: ''
      });
      fetchTurfs();
    } catch (error) {
      console.error("Error registering turf:", error);
      setError(error.response?.data?.msg || 'Failed to register turf');
    } finally {
      setSubmitting(false);
    }
  };

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
        className="mb-10 flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
            MY <span className="text-turf-alert">DEPLOYMENTS</span>
          </h1>
          <p className="text-white/50 font-sans text-lg">Manage your registered turf facilities.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-turf-alert/20 hover:bg-turf-alert/30 border border-turf-alert/50 rounded-xl text-turf-alert font-heading uppercase tracking-wide transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Register Turf
        </button>
      </motion.div>

      {/* Add Turf Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading text-white uppercase tracking-wider">
                Register New <span className="text-turf-alert">Turf</span>
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setError('');
                }}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                  Turf Name *
                </label>
                <input
                  type="text"
                  name="turfName"
                  value={formData.turfName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                  placeholder="e.g., Victory Arena"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                    placeholder="e.g., Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                    Price Per Hour (₹) *
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                    placeholder="e.g., 1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                  placeholder="e.g., 9876543210"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                  Facilities (comma-separated)
                </label>
                <input
                  type="text"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                  placeholder="e.g., Floodlights, Parking, Changing Room"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none resize-none"
                  placeholder="Brief description of the turf..."
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-heading uppercase tracking-wider mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-turf-alert/50 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setError('');
                  }}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-heading uppercase tracking-wide transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-turf-alert/20 hover:bg-turf-alert/30 border border-turf-alert/50 rounded-xl text-turf-alert font-heading uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Registering...' : 'Register Turf'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

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
