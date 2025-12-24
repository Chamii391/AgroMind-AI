import { useMemo } from "react";
import { motion } from "framer-motion";
console.log(motion);``
import { 
  FaSeedling, 
  FaChartLine, 
  FaShieldAlt, 
  FaArrowRight, 
  FaLeaf 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../componenets/header";
import AgriChatBot from "../componenets/AgriChatBot";


export default function Home() {

  // ===== LEAVES DATA =====
  const leaves = useMemo(() => [
    { id: 1, left: 5, delay: 0, duration: 18, size: 16 },
    { id: 2, left: 15, delay: 3, duration: 22, size: 14 },
    { id: 3, left: 25, delay: 1, duration: 20, size: 18 },
    { id: 4, left: 35, delay: 5, duration: 19, size: 12 },
    { id: 5, left: 45, delay: 2, duration: 21, size: 15 },
    { id: 6, left: 55, delay: 4, duration: 17, size: 20 },
    { id: 7, left: 65, delay: 6, duration: 23, size: 13 },
    { id: 8, left: 75, delay: 1, duration: 18, size: 17 },
    { id: 9, left: 85, delay: 3, duration: 20, size: 14 },
    { id: 10, left: 95, delay: 5, duration: 22, size: 16 },
  ], []);

  // ===== FEATURES DATA =====
  const features = useMemo(() => [
    {
      icon: <FaSeedling className="w-6 h-6" />,
      title: "Crop Prediction",
      description: "Find the best crops for your land",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      link: "/predict-page/crop-predict",
      image: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Yield Prediction",
      description: "Estimate your harvest accurately",
      color: "bg-amber-500",
      textColor: "text-amber-600",
      link: "/predict-page/yield-predict",
      image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Disease Detection",
      description: "Detect plant diseases early",
      color: "bg-teal-500",
      textColor: "text-teal-600",
      link: "/predict-page/disease-predict",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ], []);

  // ===== ANIMATION =====
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Header />

      <main className="overflow-hidden">

        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

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

          {/* ===== HERO CONTENT ===== */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left - Text */}
              <div className="text-center lg:text-left">

                {/* Badge */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full text-emerald-700 text-sm font-medium mb-8 shadow-sm border border-emerald-100/50"
                >
                  <FaLeaf className="w-4 h-4" />
                  <span>Smart Agriculture Platform</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6"
                >
                  Welcome to
                  <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                    AgroMind
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
                >
                  Empowering farmers with AI-driven insights for smarter 
                  crop decisions, better yields, and healthier plants.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link to="/predict-page">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300"
                    >
                      <span>Get Started</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/70 backdrop-blur-md hover:bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200/50 shadow-sm transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Glow Effect Behind Image */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-[2rem] blur-2xl" />
                  
                  {/* Main Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-white/50">
                    <img
                      src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Smart Farming"
                      className="w-full h-[480px] object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Decorative Background */}
                  <div className="absolute -z-10 top-6 left-6 w-full h-full bg-gradient-to-br from-emerald-200/60 to-teal-200/60 rounded-3xl" />
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-gray-400"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
                  <motion.div
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="relative py-28 overflow-hidden">

          {/* ===== MODERN BACKGROUND ===== */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30" />
          
          {/* Subtle Grid */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />

          {/* Glowing Orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] w-72 h-72 bg-emerald-300/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[10%] w-80 h-80 bg-teal-300/20 rounded-full blur-[100px]"
          />

          {/* Falling Leaves */}
          {leaves.slice(0, 6).map((leaf) => (
            <motion.div
              key={`feature-${leaf.id}`}
              className="absolute text-emerald-300/25 pointer-events-none"
              style={{ left: `${leaf.left}%` }}
              initial={{ y: -50, rotate: 0, opacity: 0 }}
              animate={{
                y: "100vh",
                x: [0, 20, -20, 0],
                rotate: [0, 90, -90, 0],
                opacity: [0, 0.5, 0.5, 0]
              }}
              transition={{
                duration: leaf.duration + 5,
                delay: leaf.delay + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaLeaf size={leaf.size} />
            </motion.div>
          ))}

          {/* ===== CONTENT ===== */}
          <div className="relative z-10 max-w-6xl mx-auto px-6">

            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium mb-6">
                <span>🌱</span>
                <span>Our Features</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Simple and powerful AI tools for modern farming
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.link}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        
                        {/* Icon */}
                        <div className={`absolute bottom-4 left-4 ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>

                        {/* Arrow */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FaArrowRight className={`w-4 h-4 ${feature.textColor}`} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {feature.description}
                        </p>
                        <span className={`inline-flex items-center gap-2 ${feature.textColor} font-medium group-hover:gap-3 transition-all`}>
                          Try Now <FaArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ===== CHATBOT - Add at the end ===== */}
      <AgriChatBot />
    </>
  );
}