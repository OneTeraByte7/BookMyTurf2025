import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Zap } from "lucide-react";

const AIBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "SYSTEM ONLINE. I am your turf assistant. How can I help you dominate today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const q = userMessage.text.toLowerCase();
      let reply = "Processing request... I am currently optimized for booking assistance. Please try asking about available slots, turf rules, or events.";

      if (q.includes("book") || q.includes("reserve") || q.includes("slot")) {
        reply = "You can reserve a pitch instantly by navigating to the Book Turf section in your command center. Select a date and time slot, then hit Deploy Squad!";
      } else if (q.includes("event") || q.includes("tournament")) {
        reply = "Events and tournaments are listed under the Events section. As an admin, you can host new events from the Host Event panel.";
      } else if (q.includes("payment") || q.includes("pay") || q.includes("price")) {
        reply = "All payment records are available in the Payment History section. Turf pricing is set per hour during turf registration.";
      } else if (q.includes("cancel")) {
        reply = "Bookings can be cancelled from the Booking History panel. Cancelled bookings appear with a red status indicator.";
      } else if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        reply = "Hello, Commander! Ready to manage the pitch? Ask me anything about bookings, events, or payments.";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-transparent h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-4"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-turf-blue/10 border border-turf-blue/30">
          <Bot className="text-turf-blue" size={26} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-heading text-white uppercase tracking-wider">
            TACTICAL <span className="text-turf-blue blue-text-glow">A.I.</span>
          </h1>
          <p className="text-white/40 font-sans text-xs">Your intelligent scouting assistant.</p>
        </div>
      </motion.div>

      {/* Chat Box — flex-1 to fill remaining space */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl flex-1 flex flex-col min-h-0 relative overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-turf-blue/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Messages Area — scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scroll relative z-10 min-h-0">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border ${msg.sender === "user"
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-turf-blue/20 border-turf-blue/50 text-turf-blue shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                    }`}>
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>

                  <div className={`p-3 md:p-4 rounded-2xl font-sans text-sm leading-relaxed ${msg.sender === "user"
                    ? "bg-white/10 text-white rounded-tr-sm border border-white/5"
                    : "bg-turf-space border border-turf-blue/20 text-white/90 rounded-tl-sm shadow-lg"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border bg-turf-blue/20 border-turf-blue/50 text-turf-blue">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded-2xl bg-turf-space border border-turf-blue/20 rounded-tl-sm flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-turf-blue block"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-turf-blue block"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-turf-blue block"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area — always at the bottom */}
        <div className="p-3 md:p-4 bg-black/40 border-t border-white/10 backdrop-blur-md relative z-10 shrink-0">
          <div className="flex items-center gap-3 bg-turf-space border border-white/10 rounded-2xl p-2 focus-within:border-turf-blue/50 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white placeholder-white/30 px-3 py-2 outline-none font-sans text-sm"
              placeholder="Query the AI assistant..."
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all flex items-center justify-center shrink-0 ${input.trim()
                ? "bg-turf-blue text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:scale-[1.05] active:scale-95"
                : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
            >
              <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>
          <p className="text-white/20 text-xs font-sans mt-2 text-center">Press Enter to send · Powered by BookMyTurf AI</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIBot;
