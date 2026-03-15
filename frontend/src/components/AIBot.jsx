import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

const AIBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "SYSTEM ONLINE. I am your turf assistant. How can I help you dominate today?" }
  ]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    setInput("");

    // Simulate AI thinking
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: userMessage.text.toLowerCase().includes("book")
          ? "You can reserve a pitch instantly by navigating to the Book Turf section in your command center."
          : "Processing request... I am currently optimized for booking assistance. Please try asking about available slots or turf rules."
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-transparent min-h-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-turf-blue/10 border border-turf-blue/30 mb-4">
          <Bot className="text-turf-blue" size={32} />
        </div>
        <h1 className="text-4xl font-heading text-white uppercase tracking-wider mb-1">
          TACTICAL <span className="text-turf-blue blue-text-glow">A.I.</span>
        </h1>
        <p className="text-white/50 font-sans text-sm">Your intelligent scouting assistant.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl w-full max-w-3xl flex flex-col h-[60vh] md:h-[70vh] relative overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-turf-blue/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${msg.sender === "user"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-turf-blue/20 border-turf-blue/50 text-turf-blue shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                    }`}>
                    {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  <div className={`p-4 rounded-2xl font-sans text-sm md:text-base leading-relaxed ${msg.sender === "user"
                      ? "bg-white/10 text-white rounded-tr-sm border border-white/5"
                      : "bg-turf-space border border-turf-blue/20 text-white/90 rounded-tl-sm shadow-lg"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-3 bg-turf-space border border-white/10 rounded-2xl p-2 focus-within:border-turf-blue/50 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white placeholder-white/30 px-4 py-2 outline-none font-sans"
              placeholder="Query the database..."
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all flex items-center justify-center ${input.trim()
                  ? "bg-turf-blue text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:scale-[1.05]"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
            >
              <Send size={20} className={input.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIBot;
