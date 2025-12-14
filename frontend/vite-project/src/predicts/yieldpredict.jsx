import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaChartLine, FaLeaf, FaCloudRain, FaThermometerHalf,
  FaBug, FaSeedling, FaCheckCircle, FaTimesCircle, 
  FaSpinner, FaArrowRight, FaInfoCircle, FaLightbulb, FaChartBar
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable Input Component
const Input = ({ name, label, icon: Icon, type = "text", placeholder, value, onChange, step }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
      <Icon className="text-amber-500 w-4 h-4" /> {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      required
      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all bg-white/80 hover:border-amber-300 outline-none"
    />
  </div>
);

export default function YieldPage() {
  const [formData, setFormData] = useState({
    Item: "",
    average_rain_fall_mm_per_year: "",
    pesticides_tonnes: "",
    avg_temp: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // Background leaves
  const leaves = useMemo(() => [
    { id: 1, left: 5, delay: 0, duration: 20, size: 14 },
    { id: 2, left: 15, delay: 4, duration: 18, size: 16 },
    { id: 3, left: 75, delay: 2, duration: 22, size: 12 },
    { id: 4, left: 85, delay: 6, duration: 19, size: 18 },
    { id: 5, left: 95, delay: 1, duration: 21, size: 14 },
  ], []);

  // Quick select crops
  const crops = ["Rice", "Wheat", "Maize", "Potatoes", "Soybeans", "Cassava", "Sweet Potatoes", "Yams"];

  // Stats
  const stats = [
    { value: "92%", label: "Accuracy", color: "text-amber-600" },
    { value: "100+", label: "Crops", color: "text-orange-600" },
    { value: "50+", label: "Countries", color: "text-yellow-600" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const payload = {
        Item: formData.Item,
        average_rain_fall_mm_per_year: Number(formData.average_rain_fall_mm_per_year),
        pesticides_tonnes: Number(formData.pesticides_tonnes),
        avg_temp: Number(formData.avg_temp),
      };

      const res = await axios.post("http://127.0.0.1:5000/api/yield/predict", payload);

      if (res.data.success) {
        setPrediction(res.data.prediction?.predicted_yield_hg_per_ha);
      } else {
        setError(res.data.error || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPrediction(null);
    setError("");
    setFormData({
      Item: "",
      average_rain_fall_mm_per_year: "",
      pesticides_tonnes: "",
      avg_temp: "",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/40 to-orange-50/60" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-orange-100/30 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glowing Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[5%] w-80 h-80 bg-amber-400/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[5%] w-96 h-96 bg-orange-400/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/20 rounded-full blur-[80px]"
      />

      {/* Floating Shapes */}
      <motion.div 
        animate={{ rotate: 360, y: [0, -15, 0] }} 
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity } }} 
        className="absolute top-32 right-[15%] w-16 h-16 border border-amber-200/50 rounded-2xl" 
      />
      <motion.div 
        animate={{ rotate: -360, y: [0, 15, 0] }} 
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity } }} 
        className="absolute bottom-40 left-[10%] w-12 h-12 border border-orange-200/50 rounded-full" 
      />

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-amber-400/30 pointer-events-none z-10"
          style={{ left: `${leaf.left}%` }}
          initial={{ y: -50, rotate: 0, opacity: 0 }}
          animate={{ y: "100vh", x: [0, 25, -25, 15, 0], rotate: [0, 120, -120, 180, 0], opacity: [0, 0.5, 0.5, 0.3, 0] }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
        >
          <FaLeaf size={leaf.size} />
        </motion.div>
      ))}

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8">

        {/* Back Button */}
        <Link to="/predict-page">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Predictions
          </motion.button>
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ===== LEFT PANEL ===== */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-5">
            
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Yield" 
                className="w-full h-56 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FaChartLine className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">AI-Powered</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Yield Prediction</h1>
              </div>
            </div>

            {/* Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-amber-100/50"
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaLightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">How It Works</h3>
                  <p className="text-gray-600 text-xs mt-0.5">AI predicts crop yield based on rainfall, temperature, and pesticide usage.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-orange-100/50"
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaInfoCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Tips</h3>
                  <p className="text-gray-600 text-xs mt-0.5">Use average annual values for more accurate predictions.</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className="grid grid-cols-3 gap-3"
            >
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-3 text-center shadow-lg border border-gray-100/50">
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== RIGHT PANEL - FORM ===== */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">

              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FaChartBar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Predict Your Harvest</h2>
                    <p className="text-white/80 text-sm">Enter crop and climate details</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePredict} className="p-6 space-y-5">
                
                {/* Crop Selection */}
                <div>
                  <Input 
                    name="Item" 
                    label="Crop Name" 
                    icon={FaSeedling} 
                    placeholder="e.g., Rice, Wheat, Maize..." 
                    value={formData.Item} 
                    onChange={handleChange} 
                  />
                  
                  {/* Quick Select */}
                  <div className="mt-3">
                    <label className="text-xs font-medium text-gray-500 mb-2 block">Quick Select:</label>
                    <div className="flex flex-wrap gap-2">
                      {crops.map((crop) => (
                        <motion.button
                          key={crop}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData(prev => ({ ...prev, Item: crop }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            formData.Item === crop 
                              ? "bg-amber-500 text-white shadow-lg" 
                              : "bg-gray-100 text-gray-700 hover:bg-amber-100"
                          }`}
                        >
                          {crop}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Climate Inputs */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Input 
                    name="average_rain_fall_mm_per_year" 
                    label="Rainfall (mm/year)" 
                    icon={FaCloudRain} 
                    type="number" 
                    placeholder="e.g., 1800" 
                    value={formData.average_rain_fall_mm_per_year} 
                    onChange={handleChange} 
                  />
                  <Input 
                    name="pesticides_tonnes" 
                    label="Pesticides (tonnes)" 
                    icon={FaBug} 
                    type="number" 
                    placeholder="e.g., 2000" 
                    value={formData.pesticides_tonnes} 
                    onChange={handleChange} 
                  />
                  <Input 
                    name="avg_temp" 
                    label="Avg Temp (°C)" 
                    icon={FaThermometerHalf} 
                    type="number" 
                    step="0.1"
                    placeholder="e.g., 27.5" 
                    value={formData.avg_temp} 
                    onChange={handleChange} 
                  />
                </div>

                {/* Summary Preview */}
                {(formData.Item || formData.average_rain_fall_mm_per_year || formData.avg_temp) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                      <FaInfoCircle className="text-amber-500" /> Input Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                      {formData.Item && (
                        <div className="flex items-center gap-1.5">
                          <FaSeedling className="text-amber-500 w-3 h-3" />
                          <span>{formData.Item}</span>
                        </div>
                      )}
                      {formData.average_rain_fall_mm_per_year && (
                        <div className="flex items-center gap-1.5">
                          <FaCloudRain className="text-amber-500 w-3 h-3" />
                          <span>{formData.average_rain_fall_mm_per_year} mm</span>
                        </div>
                      )}
                      {formData.pesticides_tonnes && (
                        <div className="flex items-center gap-1.5">
                          <FaBug className="text-amber-500 w-3 h-3" />
                          <span>{formData.pesticides_tonnes} t</span>
                        </div>
                      )}
                      {formData.avg_temp && (
                        <div className="flex items-center gap-1.5">
                          <FaThermometerHalf className="text-amber-500 w-3 h-3" />
                          <span>{formData.avg_temp}°C</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                  >
                    <FaTimesCircle /> {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <FaChartLine className="w-5 h-5" />
                      Predict Yield
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ===== RESULT ===== */}
        <AnimatePresence>
          {prediction !== null && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-500 to-orange-600"
            >
              <div className="p-8 flex flex-col md:flex-row items-center gap-6">
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center flex-shrink-0"
                >
                  <FaCheckCircle className="w-12 h-12 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    Prediction Complete! 🌾
                  </h2>
                  <p className="text-white/80 capitalize mb-4">
                    Expected yield for {formData.Item}
                  </p>

                  {/* Yield Result */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        {Number(prediction).toLocaleString()}
                      </div>
                      <div className="text-white/70 text-sm">hg/ha (hectogram per hectare)</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4 hidden md:block">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        {(Number(prediction) / 10000).toFixed(2)}
                      </div>
                      <div className="text-white/70 text-sm">tonnes/ha</div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={resetForm} 
                    className="px-6 py-2.5 bg-white text-gray-800 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FaArrowRight className="w-4 h-4" />
                    Try Again
                  </motion.button>
                  <Link to="/predict-page">
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="w-full px-6 py-2.5 bg-white/20 text-white font-medium rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                    >
                      Back
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white/10 backdrop-blur px-8 py-4 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <FaSeedling className="w-4 h-4" />
                    <span>Crop: <strong className="text-white">{formData.Item}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCloudRain className="w-4 h-4" />
                    <span>Rainfall: <strong className="text-white">{formData.average_rain_fall_mm_per_year} mm</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaThermometerHalf className="w-4 h-4" />
                    <span>Temp: <strong className="text-white">{formData.avg_temp}°C</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}