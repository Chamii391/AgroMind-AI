import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import axios from "axios";
console.log(motion);

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function AgriChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "🌾 Hello! I'm your AgroMind assistant. Ask me anything about agriculture, crops, soil, or farming!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: userText
      });

      setMessages(prev => [
        ...prev,
        { role: "bot", text: res.data.reply }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "❌ Connection error. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const buttonVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    tap: { scale: 0.9 },
    hover: { scale: 1.1 }
  };

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transformOrigin: "bottom right"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    }
  };

  return (
    <>
      {/* ===== FLOATING CHAT BUTTON ===== */}
      <motion.button
        onClick={toggleChat}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="fixed bottom-6 right-6 z-50"
        aria-label="Open agriculture chatbot"
      >
        <div className="relative">
          {/* Glow Effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg"
          />
          
          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-all duration-300">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Dot */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"
            />
          )}
        </div>
      </motion.button>

      {/* ===== CHAT MODAL ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 w-full max-w-md h-[550px] z-50"
          >
            {/* Chat Container with Glassmorphism */}
            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/10 flex flex-col overflow-hidden border border-emerald-100/50">
              
              {/* ===== HEADER ===== */}
              <div className="relative overflow-hidden">
                {/* Header Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600" />
                
                {/* Decorative Elements */}
                <motion.div
                  animate={{ x: [0, 100, 0], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ x: [0, -50, 0], opacity: [0.1, 0.15, 0.1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 right-0 w-24 h-24 bg-teal-300/20 rounded-full blur-xl"
                />

                {/* Header Content */}
                <div className="relative p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Bot Avatar */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
                    >
                      <FaLeaf className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className="font-bold text-white text-lg">AgroMind AI</h3>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 bg-emerald-300 rounded-full"
                        />
                        <p className="text-xs text-emerald-100">Online • Ready to help</p>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <motion.button 
                    onClick={toggleChat}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTimes className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* ===== MESSAGES AREA ===== */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-emerald-50/50 to-white/50">
                
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }}
                />

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" 
                          ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" 
                          : "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                      }`}>
                        {msg.role === "user" ? "👤" : <FaRobot className="w-4 h-4" />}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                          ${msg.role === "user"
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-md"
                            : "bg-white/90 backdrop-blur-sm text-gray-700 border border-emerald-100/50 rounded-bl-md shadow-md"
                          }
                        `}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <FaRobot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md border border-emerald-100/50 shadow-md">
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-emerald-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-teal-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* ===== INPUT AREA ===== */}
              <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-emerald-100/50">
                {/* Quick Suggestions */}
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                  {["Best crops for summer?", "How to improve soil?", "Pest control tips"].map((suggestion, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInput(suggestion)}
                      className="flex-shrink-0 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/50 transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>

                {/* Input Field */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
                      placeholder="Ask about crops, soil, farming..."
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <FaLeaf className="w-4 h-4 text-emerald-300" />
                    </div>
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl shadow-lg shadow-emerald-500/25 disabled:shadow-none flex items-center justify-center transition-all duration-300"
                  >
                    <motion.div
                      animate={loading ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      ) : (
                        <FaPaperPlane className="w-4 h-4" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-gray-400 mt-3">
                  Powered by <span className="text-emerald-600 font-medium">AgroMind AI</span> 🌱
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}