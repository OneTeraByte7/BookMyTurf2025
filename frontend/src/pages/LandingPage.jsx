import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Zap, Calendar, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 }
    }
  };

  return (
    <div className="bg-turf-dark text-white min-h-screen flex flex-col items-center relative">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-turf-neon/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-turf-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar Shell */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10"
      >
        <div className="text-2xl font-heading tracking-widest text-white uppercase flex items-center gap-2">
          <Zap className="text-turf-neon" size={28} />
          BookMy<span className="text-turf-neon">Turf</span>
        </div>
        <div className="hidden md:flex gap-4">
          <button
            className="px-6 py-2 rounded-full font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-6 py-2 rounded-full font-bold uppercase tracking-widest bg-white text-black hover:bg-turf-neon transition-colors"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-6 mt-20 z-10 max-w-5xl"
      >
        <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1 rounded-full border border-turf-neon/30 bg-turf-neon/10 text-turf-neon text-sm font-bold uppercase tracking-widest">
          The Next Generation of Sports Booking
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-heading text-white uppercase leading-none drop-shadow-2xl">
          DOMINATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-turf-neon to-turf-blue neon-text-glow block mt-2">THE PITCH</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-white/60 mt-8 max-w-2xl mx-auto font-sans font-light">
          Find, book, and play on the best turfs in your city. Seamless booking, real-time availability, and AI-powered match suggestions.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            className="neon-button flex items-center justify-center gap-3"
            onClick={() => navigate("/signup")}
          >
            Start Playing <ArrowRight size={24} />
          </button>
          <button
            className="px-8 py-4 font-heading text-xl md:text-2xl border-2 border-white/20 text-white uppercase tracking-wider hover:bg-white/5 transition-all rounded-none"
            onClick={() => navigate("/login")}
          >
            Member Login
          </button>
        </motion.div>
      </motion.header>

      {/* Floating 3D Cards / Features */}
      <section className="mt-32 w-full max-w-7xl px-6 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Instant Access", icon: Zap, color: "turf-neon", desc: "No more waiting. Real-time availability for instant match setups." },
            { title: "AI Scheduling", icon: Calendar, color: "turf-blue", desc: "Our AI finds the perfect time and opponents tailored for your squad." },
            { title: "Tournaments", icon: Trophy, color: "turf-alert", desc: "Host or join competitive leagues directly from the dashboard." }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}/20 rounded-full blur-[50px] group-hover:bg-${feature.color}/40 transition-all duration-500`}></div>
              <feature.icon size={48} className={`text-${feature.color} mb-6`} />
              <h3 className="text-3xl font-heading text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 font-sans leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-8 border-t border-white/10 text-center z-10 glass-panel">
        <p className="text-white/40 font-heading uppercase tracking-widest text-sm">
          © 2025 BookMyTurf. Built for the Players.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
