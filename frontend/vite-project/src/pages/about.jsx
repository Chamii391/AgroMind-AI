import { useMemo } from "react";
import { motion } from "framer-motion";
console.log(motion);    

import { 
  FaLeaf, 
  FaSeedling, 
  FaChartLine, 
  FaShieldAlt,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaHeart
} from "react-icons/fa";
import AgriChatBot from "../componenets/AgriChatBot";

export default function About() {

  // Leaves Data
  const leaves = useMemo(() => [
    { id: 1, left: 8, delay: 0, duration: 20, size: 14 },
    { id: 2, left: 20, delay: 4, duration: 18, size: 16 },
    { id: 3, left: 35, delay: 2, duration: 22, size: 12 },
    { id: 4, left: 50, delay: 6, duration: 19, size: 18 },
    { id: 5, left: 65, delay: 1, duration: 21, size: 14 },
    { id: 6, left: 80, delay: 5, duration: 17, size: 16 },
    { id: 7, left: 92, delay: 3, duration: 20, size: 13 },
  ], []);

  // Animation
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // Values Data
  const values = useMemo(() => [
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Using cutting-edge AI technology to solve farming challenges"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Farmer First",
      description: "Designed with farmers in mind, simple and easy to use"
    },
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Sustainability",
      description: "Promoting eco-friendly and sustainable farming practices"
    }
  ], []);

  // Features Data
  const features = useMemo(() => [
    {
      icon: <FaSeedling className="w-5 h-5" />,
      title: "Crop Prediction",
      description: "AI analyzes soil and weather to recommend the best crops",
      color: "bg-emerald-500"
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: "Yield Prediction",
      description: "Accurate harvest forecasts using machine learning",
      color: "bg-amber-500"
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      title: "Disease Detection",
      description: "Upload leaf photos to detect diseases instantly",
      color: "bg-teal-500"
    }
  ], []);

  return (
    <main className="overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative py-32 overflow-hidden">

        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60" />
        
        {/* Mesh Gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-teal-100/40 via-transparent to-transparent" />
        </div>

        {/* Grid Pattern */}
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
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-400/20 rounded-full blur-[120px]"
        />

        {/* Floating Shapes */}
        <motion.div
          animate={{ rotate: [0, 360], y: [0, -15, 0] }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-32 right-[20%] w-16 h-16 border border-emerald-200/50 rounded-2xl"
        />
        <motion.div
          animate={{ rotate: [0, -360], y: [0, 15, 0] }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-32 left-[15%] w-12 h-12 border border-teal-200/50 rounded-full"
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
              opacity: [0, 0.5, 0.5, 0.3, 0]
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

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">

          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full text-emerald-700 text-sm font-medium mb-6 shadow-sm border border-emerald-100/50"
          >
            <FaLeaf className="w-4 h-4" />
            <span>About Us</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
          >
            Empowering Farmers with
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
              AI Technology
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            AgroMind is an intelligent agriculture platform that combines Machine Learning, 
            Deep Learning, and AI to help farmers make smarter, data-driven decisions.
          </motion.p>

        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="relative py-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30" />
        
        {/* Grid Pattern */}
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
          className="absolute top-1/4 right-[5%] w-64 h-64 bg-emerald-300/20 rounded-full blur-[100px]"
        />

        {/* Falling Leaves */}
        {leaves.slice(0, 4).map((leaf) => (
          <motion.div
            key={`mission-${leaf.id}`}
            className="absolute text-emerald-300/25 pointer-events-none"
            style={{ left: `${leaf.left}%` }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={{
              y: "100vh",
              x: [0, 20, -20, 0],
              rotate: [0, 90, -90, 0],
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{
              duration: leaf.duration + 5,
              delay: leaf.delay + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaLeaf size={leaf.size} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-2xl" />
                
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/50">
                  <img
                    src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Our Mission"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
                </div>
                
                {/* Decorative Background */}
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-emerald-200/60 to-teal-200/60 rounded-2xl" />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium mb-6">
                🎯 Our Mission
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Making Smart Farming Accessible to Everyone
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                We believe every farmer deserves access to advanced technology. 
                Our mission is to bridge the gap between AI innovation and 
                practical farming needs, making agricultural decisions simpler and more accurate.
              </p>

              <ul className="space-y-4">
                {[
                  "AI-powered crop recommendations",
                  "Accurate yield predictions",
                  "Early disease detection",
                  "Easy-to-use interface"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="relative py-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-slate-50/50" />

        {/* Grid Pattern */}
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
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[10%] w-72 h-72 bg-teal-300/20 rounded-full blur-[100px]"
        />

        {/* Falling Leaves */}
        {leaves.slice(2, 6).map((leaf) => (
          <motion.div
            key={`values-${leaf.id}`}
            className="absolute text-emerald-300/20 pointer-events-none"
            style={{ left: `${leaf.left}%` }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={{
              y: "100vh",
              x: [0, 15, -15, 0],
              rotate: [0, 60, -60, 0],
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{
              duration: leaf.duration + 3,
              delay: leaf.delay + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaLeaf size={leaf.size} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium mb-6">
              💚 Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What Drives Us
            </h2>
          </motion.div>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-emerald-50/30" />

        {/* Grid Pattern */}
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
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-56 h-56 bg-emerald-300/20 rounded-full blur-[80px]"
        />

        {/* Falling Leaves */}
        {leaves.slice(0, 5).map((leaf) => (
          <motion.div
            key={`features-${leaf.id}`}
            className="absolute text-emerald-300/20 pointer-events-none"
            style={{ left: `${leaf.left}%` }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={{
              y: "100vh",
              x: [0, 20, -20, 0],
              rotate: [0, 80, -80, 0],
              opacity: [0, 0.35, 0.35, 0]
            }}
            transition={{
              duration: leaf.duration + 4,
              delay: leaf.delay + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaLeaf size={leaf.size} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium mb-6">
              ⚡ Our Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What We Offer
            </h2>
          </motion.div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50"
              >
                <div className="flex items-start gap-4">
                  <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <AgriChatBot />
      </section>

    </main>
  );
}