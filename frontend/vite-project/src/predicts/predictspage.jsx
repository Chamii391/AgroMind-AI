import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
console.log(motion);    

import { 
  FaSeedling, 
  FaChartLine, 
  FaShieldAlt, 
  FaLeaf,
  FaTimes,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";
import Prediction from "./prediction";
import YieldPage from "./yieldpredict";
import Disease from "./disease";

export default function PredictPage() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();

  // Leaves Data
  const leaves = useMemo(() => [
    { id: 1, left: 10, delay: 0, duration: 18, size: 14 },
    { id: 2, left: 25, delay: 3, duration: 22, size: 16 },
    { id: 3, left: 45, delay: 1, duration: 20, size: 12 },
    { id: 4, left: 65, delay: 5, duration: 19, size: 18 },
    { id: 5, left: 80, delay: 2, duration: 21, size: 14 },
    { id: 6, left: 92, delay: 4, duration: 17, size: 16 },
  ], []);

  // Features Data
  const features = useMemo(() => [
    {
      id: "crop",
      icon: <FaSeedling className="w-8 h-8" />,
      title: "Crop Prediction",
      shortDesc: "Find the best crops for your land",
      description: "Our AI analyzes soil conditions, weather patterns, and historical data to recommend the most suitable crops for your farm. Get personalized suggestions based on your location and resources.",
      color: "from-emerald-500 to-green-600",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
      image: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=600",
      path: "/predict-page/crop-predict",
      benefits: [
        "Soil-based recommendations",
        "Weather pattern analysis",
        "Seasonal crop suggestions",
        "Profit optimization tips"
      ]
    },
    {
      id: "yield",
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Yield Prediction",
      shortDesc: "Estimate your harvest accurately",
      description: "Predict your crop yield with high accuracy using machine learning. Our model considers rainfall, temperature, soil quality, and farming practices to give you reliable harvest estimates.",
      color: "from-amber-500 to-orange-600",
      lightColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-600",
      image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600",
      path: "/predict-page/yield-predict",
      benefits: [
        "Accurate harvest forecasts",
        "Resource planning help",
        "Market timing insights",
        "Historical comparison"
      ]
    },
    {
      id: "disease",
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Disease Detection",
      shortDesc: "Detect plant diseases early",
      description: "Upload a photo of your plant leaf and our deep learning model will instantly detect any diseases. Get treatment recommendations and preventive measures to protect your crops.",
      color: "from-teal-500 to-cyan-600",
      lightColor: "bg-teal-50",
      borderColor: "border-teal-200",
      textColor: "text-teal-600",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600",
      path: "/predict-page/disease-predict",
      benefits: [
        "Instant disease detection",
        "Treatment recommendations",
        "Preventive measures",
        "Plant health monitoring"
      ]
    }
  ], []);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Handle card click
  const handleCardClick = (feature) => {
    setSelectedFeature(feature);
  };

  // Handle start prediction
  const handleStartPrediction = () => {
    if (selectedFeature) {
      navigate(selectedFeature.path);
      setSelectedFeature(null);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedFeature(null);
  };

  return (
    <div className="min-h-screen">
      
      <Routes>
        {/* Main Dashboard */}
        <Route 
          index 
          element={
            <main className="relative min-h-screen overflow-hidden">

              {/* ===== BACKGROUND ===== */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60" />
              
              {/* Mesh Gradient */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100/30 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-teal-100/30 via-transparent to-transparent" />
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
                animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-[10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px]"
              />
              <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-400/20 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/20 rounded-full blur-[80px]"
              />

              {/* Floating Shapes */}
              <motion.div
                animate={{ rotate: [0, 360], y: [0, -15, 0] }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-32 right-[15%] w-16 h-16 border border-emerald-200/50 rounded-2xl"
              />
              <motion.div
                animate={{ rotate: [0, -360], y: [0, 15, 0] }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-40 left-[10%] w-12 h-12 border border-teal-200/50 rounded-full"
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md rounded-full text-emerald-700 text-sm font-medium mb-6 shadow-sm border border-emerald-100/50"
                  >
                    <FaLeaf className="w-4 h-4" />
                    <span>AI-Powered Predictions</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
                  >
                    What would you like to
                    <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                      predict today?
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                  >
                    Choose a prediction type below to get started with AI-powered insights for your farm
                  </motion.p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ y: -12, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCardClick(feature)}
                        className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${feature.borderColor} hover:border-transparent`}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                          
                          {/* Icon Badge */}
                          <motion.div 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className={`absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}
                          >
                            {feature.icon}
                          </motion.div>

                          {/* Click Indicator */}
                          <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <FaArrowRight className={`w-4 h-4 ${feature.textColor}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {feature.shortDesc}
                          </p>
                          <div className={`inline-flex items-center gap-2 ${feature.textColor} font-semibold group-hover:gap-3 transition-all`}>
                            <span>Get Started</span>
                            <FaArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* ===== POPUP MODAL ===== */}
              <AnimatePresence>
                {selectedFeature && (
                  <>
                    {/* Overlay */}
                    <motion.div
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={closeModal}
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                      variants={modalVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        
                        {/* Modal Header Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={selectedFeature.image}
                            alt={selectedFeature.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${selectedFeature.color} opacity-70`} />
                          
                          {/* Close Button */}
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
                          >
                            <FaTimes className="w-5 h-5" />
                          </motion.button>

                          {/* Icon & Title */}
                          <div className="absolute bottom-6 left-6 flex items-center gap-4">
                            <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center ${selectedFeature.textColor} shadow-xl`}>
                              {selectedFeature.icon}
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-white">
                                {selectedFeature.title}
                              </h2>
                              <p className="text-white/80">
                                {selectedFeature.shortDesc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {selectedFeature.description}
                          </p>

                          {/* Benefits */}
                          <div className="mb-8">
                            <h4 className="font-bold text-gray-800 mb-4">What you&apos;ll get:</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {selectedFeature.benefits.map((benefit, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <FaCheckCircle className={`w-5 h-5 ${selectedFeature.textColor}`} />
                                  <span className="text-gray-700 text-sm">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleStartPrediction}
                              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${selectedFeature.color} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
                            >
                              <span>Start Prediction</span>
                              <FaArrowRight className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={closeModal}
                              className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

            </main>
          } 
        />
        
        {/* Prediction Routes */}
        <Route path="crop-predict" element={<Prediction />} />
        <Route path="yield-predict" element={<YieldPage />} />
        <Route path="disease-predict" element={<Disease />} />
      </Routes>
      
    </div>
  );
}