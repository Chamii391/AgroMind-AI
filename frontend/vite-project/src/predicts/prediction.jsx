import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
console.log(motion);  


import axios from "axios";
import { 
  FaSeedling, FaLeaf, FaCloudRain, FaThermometerHalf, FaFlask,
  FaMapMarkerAlt, FaMountain, FaSun, FaTree, FaCheckCircle,
  FaTimesCircle, FaSpinner, FaArrowRight, FaInfoCircle, FaLightbulb
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ✅ MOVED OUTSIDE - Reusable Input Component
const Input = ({ name, label, icon: Icon, type = "text", placeholder, value, onChange }) => (

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
      <Icon className="text-emerald-500 w-4 h-4" /> {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={type === "number" ? "0.1" : undefined}
      required
      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white/80 hover:border-emerald-300 outline-none"
    />
  </div>
);

// ✅ MOVED OUTSIDE - Reusable Select Component
const Select = ({ name, label, icon: Icon, options, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
      <Icon className="text-emerald-500 w-4 h-4" /> {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white/80 hover:border-emerald-300 outline-none appearance-none cursor-pointer"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default function Prediction() {
  const [formData, setFormData] = useState({
    province: "", district: "", zone: "", soil_type: "",
    rainfall_mm: "", temperature_c: "", pH: "",
    season: "", shade: "", chosen_crop: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  // Background leaves
  const leaves = useMemo(() => [
    { id: 1, left: 5, delay: 0, duration: 20, size: 14 },
    { id: 2, left: 15, delay: 4, duration: 18, size: 16 },
    { id: 3, left: 75, delay: 2, duration: 22, size: 12 },
    { id: 4, left: 85, delay: 6, duration: 19, size: 18 },
    { id: 5, left: 95, delay: 1, duration: 21, size: 14 },
  ], []);

  // Steps config
  const steps = [
    { id: 1, title: "Location", icon: FaMapMarkerAlt },
    { id: 2, title: "Environment", icon: FaCloudRain },
    { id: 3, title: "Crop", icon: FaSeedling },
  ];

  // Quick select crops
  const crops = ["Paddy", "Tea", "Rubber", "Coconut", "Banana", "Turmeric", "Pepper", "Cinnamon"];

  // Stats
  const stats = [
    { value: "95%", label: "Accuracy", color: "text-emerald-600" },
    { value: "50+", label: "Crops", color: "text-teal-600" },
    { value: "25", label: "Districts", color: "text-amber-600" },
  ];

  // ✅ Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        ...formData,
        rainfall_mm: Number(formData.rainfall_mm),
        temperature_c: Number(formData.temperature_c),
        pH: Number(formData.pH),
      };
      const res = await axios.post("http://localhost:5000/api/crop/check", payload);
      res.data.success ? setResult(res.data.prediction) : setError(res.data.error || "Error occurred");
    } catch {
      setError("Server error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError("");
    setStep(1);
    setFormData({
      province: "", district: "", zone: "", soil_type: "",
      rainfall_mm: "", temperature_c: "", pH: "",
      season: "", shade: "", chosen_crop: "",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-teal-100/30 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glowing Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[5%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[5%] w-96 h-96 bg-teal-400/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/20 rounded-full blur-[80px]"
      />

      {/* Floating Shapes */}
      <motion.div 
        animate={{ rotate: 360, y: [0, -15, 0] }} 
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity } }} 
        className="absolute top-32 right-[15%] w-16 h-16 border border-emerald-200/50 rounded-2xl" 
      />
      <motion.div 
        animate={{ rotate: -360, y: [0, 15, 0] }} 
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity } }} 
        className="absolute bottom-40 left-[10%] w-12 h-12 border border-teal-200/50 rounded-full" 
      />

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-emerald-400/30 pointer-events-none z-10"
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
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 font-medium">
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
              <img src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Crop" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FaSeedling className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">AI-Powered</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Crop Suitability Prediction</h1>
              </div>
            </div>

            {/* Info Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-emerald-100/50">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaLightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">How It Works</h3>
                  <p className="text-gray-600 text-xs mt-0.5">AI analyzes location, soil, climate to predict crop suitability.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-amber-100/50">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaInfoCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Tips</h3>
                  <p className="text-gray-600 text-xs mt-0.5">Use accurate soil test values and current season data.</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-3 gap-3">
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

              {/* Step Indicator */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setStep(s.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${step === s.id ? "bg-white text-emerald-600" : step > s.id ? "bg-white/30 text-white" : "bg-white/10 text-white/70"}`}
                      >
                        <s.icon className="w-4 h-4" />
                        <span className="font-medium text-sm hidden sm:block">{s.title}</span>
                        {step > s.id && <FaCheckCircle className="w-3 h-3 text-emerald-500" />}
                      </motion.button>
                      {i < steps.length - 1 && <div className={`w-8 md:w-12 h-0.5 mx-2 ${step > s.id ? "bg-white/50" : "bg-white/20"}`} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <AnimatePresence mode="wait">

                  {/* Step 1 - Location */}
                  {step === 1 && (
                    <motion.div 
                      key="s1" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }} 
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-emerald-500" /> Location Details
                        </h2>
                        <p className="text-gray-500 text-sm">Tell us about your farm location</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input 
                          name="province" 
                          label="Province" 
                          icon={FaMapMarkerAlt} 
                          placeholder="e.g., North Central" 
                          value={formData.province} 
                          onChange={handleChange} 
                        />
                        <Input 
                          name="district" 
                          label="District" 
                          icon={FaMapMarkerAlt} 
                          placeholder="e.g., Anuradhapura" 
                          value={formData.district} 
                          onChange={handleChange} 
                        />
                      </div>
                      <Select 
                        name="zone" 
                        label="Agro-Climatic Zone" 
                        icon={FaMountain} 
                        value={formData.zone} 
                        onChange={handleChange}
                        options={[
                          { value: "", label: "Select zone" },
                          { value: "Wet Zone", label: "🌧️ Wet Zone" },
                          { value: "Dry Zone", label: "☀️ Dry Zone" },
                          { value: "Intermediate Zone", label: "🌤️ Intermediate Zone" },
                        ]} 
                      />
                      <Input 
                        name="soil_type" 
                        label="Soil Type" 
                        icon={FaMountain} 
                        placeholder="e.g., loamy, clay" 
                        value={formData.soil_type} 
                        onChange={handleChange} 
                      />
                    </motion.div>
                  )}

                  {/* Step 2 - Environment */}
                  {step === 2 && (
                    <motion.div 
                      key="s2" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }} 
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaCloudRain className="text-emerald-500" /> Environmental Conditions
                        </h2>
                        <p className="text-gray-500 text-sm">Provide climate and soil data</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input 
                          name="rainfall_mm" 
                          label="Rainfall (mm)" 
                          icon={FaCloudRain} 
                          type="number" 
                          placeholder="e.g., 2800" 
                          value={formData.rainfall_mm} 
                          onChange={handleChange} 
                        />
                        <Input 
                          name="temperature_c" 
                          label="Temperature (°C)" 
                          icon={FaThermometerHalf} 
                          type="number" 
                          placeholder="e.g., 30" 
                          value={formData.temperature_c} 
                          onChange={handleChange} 
                        />
                        <Input 
                          name="pH" 
                          label="Soil pH" 
                          icon={FaFlask} 
                          type="number" 
                          placeholder="e.g., 6.8" 
                          value={formData.pH} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Select 
                          name="season" 
                          label="Season" 
                          icon={FaSun} 
                          value={formData.season} 
                          onChange={handleChange}
                          options={[
                            { value: "", label: "Select season" },
                            { value: "Yala", label: "☀️ Yala (Dry)" },
                            { value: "Maha", label: "🌧️ Maha (Wet)" },
                          ]} 
                        />
                        <Select 
                          name="shade" 
                          label="Shade" 
                          icon={FaTree} 
                          value={formData.shade} 
                          onChange={handleChange}
                          options={[
                            { value: "", label: "Is there shade?" },
                            { value: "yes", label: "🌳 Yes" },
                            { value: "no", label: "☀️ No" },
                          ]} 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 - Crop */}
                  {step === 3 && (
                    <motion.div 
                      key="s3" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }} 
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaSeedling className="text-emerald-500" /> Crop Selection
                        </h2>
                        <p className="text-gray-500 text-sm">Which crop would you like to grow?</p>
                      </div>
                      <Input 
                        name="chosen_crop" 
                        label="Chosen Crop" 
                        icon={FaSeedling} 
                        placeholder="e.g., paddy, tea, banana..." 
                        value={formData.chosen_crop} 
                        onChange={handleChange} 
                      />
                      
                      {/* Quick Select */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Quick Select</label>
                        <div className="flex flex-wrap gap-2">
                          {crops.map((crop) => (
                            <motion.button
                              key={crop}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFormData(prev => ({ ...prev, chosen_crop: crop.toLowerCase() }))}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                formData.chosen_crop === crop.toLowerCase() 
                                  ? "bg-emerald-500 text-white shadow-lg" 
                                  : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
                              }`}
                            >
                              {crop}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                          <FaInfoCircle className="text-emerald-500" /> Summary
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                          {formData.province && (
                            <div className="flex items-center gap-1.5">
                              <FaMapMarkerAlt className="text-emerald-500 w-3 h-3" />
                              <span>{formData.province}</span>
                            </div>
                          )}
                          {formData.zone && (
                            <div className="flex items-center gap-1.5">
                              <FaMountain className="text-emerald-500 w-3 h-3" />
                              <span>{formData.zone}</span>
                            </div>
                          )}
                          {formData.rainfall_mm && (
                            <div className="flex items-center gap-1.5">
                              <FaCloudRain className="text-emerald-500 w-3 h-3" />
                              <span>{formData.rainfall_mm}mm</span>
                            </div>
                          )}
                          {formData.temperature_c && (
                            <div className="flex items-center gap-1.5">
                              <FaThermometerHalf className="text-emerald-500 w-3 h-3" />
                              <span>{formData.temperature_c}°C</span>
                            </div>
                          )}
                          {formData.season && (
                            <div className="flex items-center gap-1.5">
                              <FaSun className="text-emerald-500 w-3 h-3" />
                              <span>{formData.season}</span>
                            </div>
                          )}
                          {formData.chosen_crop && (
                            <div className="flex items-center gap-1.5">
                              <FaSeedling className="text-emerald-500 w-3 h-3" />
                              <span className="capitalize">{formData.chosen_crop}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                  >
                    <FaTimesCircle /> {error}
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(s => Math.max(s - 1, 1))}
                    disabled={step === 1}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                      step === 1 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </motion.button>

                  {step < 3 ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(s => s + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Next <FaArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaSeedling className="w-5 h-5" />
                          Check Suitability
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ===== RESULT ===== */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`mt-8 rounded-3xl overflow-hidden shadow-2xl ${
                result.label === "GOOD" 
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600" 
                  : "bg-gradient-to-br from-red-500 to-orange-600"
              }`}
            >
              <div className="p-8 flex flex-col md:flex-row items-center gap-6">
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center flex-shrink-0"
                >
                  {result.label === "GOOD" ? (
                    <FaCheckCircle className="w-12 h-12 text-white" />
                  ) : (
                    <FaTimesCircle className="w-12 h-12 text-white" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {result.label === "GOOD" ? "Excellent Choice! 🎉" : "Not Recommended 😕"}
                  </h2>
                  <p className="text-white/80 capitalize">
                    {formData.chosen_crop} is {result.label === "GOOD" ? "suitable" : "not ideal"} for your conditions
                  </p>

                  {/* Probabilities */}
                  {result.prob_good !== null && result.prob_bad !== null && (
                    <div className="flex gap-4 mt-4 justify-center md:justify-start">
                      <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                        <div className="text-xl font-bold text-white">{(result.prob_good * 100).toFixed(0)}%</div>
                        <div className="text-white/70 text-xs">Suitable</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                        <div className="text-xl font-bold text-white">{(result.prob_bad * 100).toFixed(0)}%</div>
                        <div className="text-white/70 text-xs">Risk</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 flex-shrink-0">
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={resetForm} 
                    className="px-5 py-2.5 bg-white text-gray-800 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Try Again
                  </motion.button>
                  <Link to="/predict-page">
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="px-5 py-2.5 bg-white/20 text-white font-medium rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                    >
                      Back
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}