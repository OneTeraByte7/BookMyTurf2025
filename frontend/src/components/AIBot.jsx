import React, { useState } from "react";

const AIBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your AI Assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Dummy bot response
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text:
          input.toLowerCase().includes("book")
            ? "You can book a turf from the booking section."
            : "I am still learning! Please ask another question."
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-green-400 mb-6">AI Chatbot Assistant</h2>
      <div className="bg-green-950 p-4 rounded-lg h-[60vh] overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`text-sm ${msg.sender === "bot" ? "text-green-300" : "text-white text-right"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 bg-green-800 text-white rounded"
          placeholder="Type your question..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIBot;
