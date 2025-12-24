import { useState, useMemo } from "react";
import { motion } from "framer-motion";
console.log(motion);
import { 
  FaLeaf, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaGithub,
  FaGlobe,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaSeedling
} from "react-icons/fa";
import Header from "../componenets/header";
import AgriChatBot from "../componenets/AgriChatBot";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ===== LEAVES DATA =====
  const leaves = useMemo(() => [
    { id: 1, left: 5, delay: 0, duration: 18, size: 16 },
    { id: 2, left: 15, delay: 3, duration: 22, size: 14 },
    { id: 3, left: 25, delay: 1, duration: 20, size: 18 },
    { id: 4, left: 45, delay: 5, duration: 19, size: 12 },
    { id: 5, left: 65, delay: 2, duration: 21, size: 15 },
    { id: 6, left: 75, delay: 4, duration: 17, size: 20 },
    { id: 7, left: 85, delay: 6, duration: 23, size: 13 },
    { id: 8, left: 95, delay: 1, duration: 18, size: 17 },
  ], []);

  // ===== SOCIAL LINKS =====
  const socialLinks = useMemo(() => [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/chameera-chathuranga-ba498b320/",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-500/30",
      description: "Connect with me"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/Chamii391",
      color: "from-gray-700 to-gray-900",
      hoverColor: "hover:shadow-gray-500/30",
      description: "View my projects"
    },
    {
      name: "Portfolio",
      icon: <FaGlobe className="w-6 h-6" />,
      url: "https://chameera-chathuranga-9x53.vercel.app",
      color: "from-emerald-500 to-teal-600",
      hoverColor: "hover:shadow-emerald-500/30",
      description: "See my work"
    }
  ], []);

  // ===== CONTACT INFO =====
  const contactInfo = useMemo(() => [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "chameerachathuranga40@gmail.com",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      value: "+94 77 00 69 680",
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Location",
      value: "Sri Lanka",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ], []);

  // ===== ANIMATION VARIANTS =====
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // ===== HANDLERS =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <Header />

      <main className="overflow-hidden">
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

          {/* ===== MODERN BACKGROUND ===== */}
          
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60" />
          
          {/* Mesh Gradient Effect */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-teal-100/40 via-transparent to-transparent" />
          </div>

          {/* Modern Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Glowing Orbs */}
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[5%] w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-300/20 rounded-full blur-[80px]"
          />

          {/* Floating Geometric Shapes */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              y: [0, -20, 0]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-32 right-[20%] w-20 h-20 border border-emerald-200/50 rounded-2xl"
          />
          <motion.div
            animate={{ 
              rotate: [0, -360],
              y: [0, 20, 0]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-40 left-[15%] w-16 h-16 border border-teal-200/50 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[10%] w-3 h-3 bg-emerald-400/40 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-[25%] w-2 h-2 bg-teal-400/40 rounded-full"
          />

          {/* Falling Leaves */}
          {leaves.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="absolute text-emerald-400/30 pointer-events-none z-10"
              style={{ left: `${leaf.left}%` }}
              initial={{ y: -50, rotate: 0, opacity: 0 }}
              animate={{
                y: "100vh",
                x: [0, 25, -25, 15, 0],
                rotate: [0, 120, -120, 180, 0],
                opacity: [0, 0.6, 0.6, 0.3, 0]
              }}
              transition={{
                duration: leaf.duration,
                delay: leaf.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaLeaf size={leaf.size} />
            </motion.div>
          ))}

          {/* ===== CONTENT ===== */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 py-16">
            
            {/* Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md rounded-full text-emerald-700 text-sm font-medium mb-6 shadow-sm border border-emerald-100/50"
              >
                <FaSeedling className="w-4 h-4" />
                <span>Get In Touch</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
              >
                Let&apos;s Work
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                  Together
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Have a question about AgroMind or want to collaborate? 
                I&apos;d love to hear from you. Send me a message and let&apos;s create something amazing!
              </motion.p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* ===== LEFT SIDE - Contact Info & Social ===== */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-8"
              >
                {/* Contact Info Cards */}
                <motion.div variants={fadeUp} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="w-4 h-4 text-emerald-600" />
                    </span>
                    Contact Information
                  </h3>

                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center ${info.color}`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{info.title}</p>
                        <p className="font-semibold text-gray-800">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Social Links */}
                <motion.div variants={fadeUp} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <FaGlobe className="w-4 h-4 text-teal-600" />
                    </span>
                    Connect With Me
                  </h3>

                  <div className="grid gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-xl ${social.hoverColor} transition-all duration-300`}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {social.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {social.name}
                          </p>
                          <p className="text-sm text-gray-500">{social.description}</p>
                        </div>
                        <motion.div
                          initial={{ x: 0, opacity: 0 }}
                          whileHover={{ x: 5, opacity: 1 }}
                          className="text-gray-400 group-hover:text-emerald-600"
                        >
                          →
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Decorative Card */}
                <motion.div
                  variants={fadeUp}
                  className="relative overflow-hidden p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white"
                >
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 border border-white/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-24 h-24 border border-white/20 rounded-full"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                      >
                        <FaLeaf className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-lg">Available for Work</h4>
                        <p className="text-emerald-100 text-sm">Open to new opportunities</p>
                      </div>
                    </div>
                    <p className="text-emerald-50 text-sm leading-relaxed">
                      I&apos;m currently looking for new opportunities in web development 
                      and AI projects. Let&apos;s build something amazing together!
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* ===== RIGHT SIDE - Contact Form ===== */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-[2rem] blur-2xl" />
                  
                  {/* Form Card */}
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100/50 p-8">
                    
                    {/* Form Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Send a Message</h3>
                      <p className="text-gray-600">Fill out the form below and I&apos;ll get back to you soon!</p>
                    </div>

                    {/* Success Message */}
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-800">Message Sent!</p>
                          <p className="text-sm text-emerald-600">Thank you for reaching out. I&apos;ll respond soon!</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaUser className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaEnvelope className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaSeedling className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Project Inquiry"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-4 text-gray-400">
                            <FaComment className="w-4 h-4" />
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell me about your project or question..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FaPaperPlane className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </form>

                    {/* Form Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                      🔒 Your information is secure and will never be shared
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== CHATBOT ===== */}
      <AgriChatBot />
    </>
  );
}