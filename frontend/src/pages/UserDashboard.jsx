import React from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import UserLayout from "../components/UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="w-32 h-32 rounded-full border-2 border-turf-neon/30 bg-turf-neon/5 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(204,255,0,0.15)]">
            <Zap className="text-turf-neon" size={52} />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-wider mb-4">
            READY FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-turf-neon to-turf-blue">
              ACTION?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-xl mx-auto font-sans leading-relaxed mt-2">
            Select an option from the Command Center to book your next match,
            view events, or use the AI Assistant.
          </p>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
