import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

console.log(motion);

import axios from "axios";
import { 
  FaShieldAlt, FaLeaf, FaCamera, FaUpload, FaCheckCircle, 
  FaTimesCircle, FaSpinner, FaArrowRight, FaInfoCircle, 
  FaLightbulb, FaImage, FaExclamationTriangle, FaHeartbeat,
  FaCloudUploadAlt, FaRedo
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Disease() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Background leaves
  const leaves = useMemo(() => [
    { id: 1, left: 5, delay: 0, duration: 20, size: 14 },
    { id: 2, left: 15, delay: 4, duration: 18, size: 16 },
    { id: 3, left: 75, delay: 2, duration: 22, size: 12 },
    { id: 4, left: 85, delay: 6, duration: 19, size: 18 },
    { id: 5, left: 95, delay: 1, duration: 21, size: 14 },
  ], []);

  // Stats
  const stats = [
    { value: "98%", label: "Accuracy", color: "text-teal-600" },
    { value: "38", label: "Diseases", color: "text-cyan-600" },
    { value: "<2s", label: "Detection", color: "text-emerald-600" },
  ];

  // Supported plants
  const plants = ["Tomato", "Potato", "Corn", "Apple", "Grape", "Pepper"];

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  // Process file
  const processFile = (file) => {
    if (file) {
      setImage(file);
      setResult(null);
      setError("");
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Send image to backend
  const handlePredict = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/disease/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setResult(res.data.prediction);
      } else {
        setError("Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/60" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-100/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-100/30 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glowing Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[5%] w-80 h-80 bg-teal-400/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[5%] w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/20 rounded-full blur-[80px]"
      />

      {/* Floating Shapes */}
      <motion.div 
        animate={{ rotate: 360, y: [0, -15, 0] }} 
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity } }} 
        className="absolute top-32 right-[15%] w-16 h-16 border border-teal-200/50 rounded-2xl" 
      />
      <motion.div 
        animate={{ rotate: -360, y: [0, 15, 0] }} 
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity } }} 
        className="absolute bottom-40 left-[10%] w-12 h-12 border border-cyan-200/50 rounded-full" 
      />

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-teal-400/30 pointer-events-none z-10"
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
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 font-medium">
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
                src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Disease Detection" 
                className="w-full h-56 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">AI-Powered</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Disease Detection</h1>
              </div>
            </div>

            {/* Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-teal-100/50"
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaLightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">How It Works</h3>
                  <p className="text-gray-600 text-xs mt-0.5">Upload a leaf image and our AI will detect diseases instantly with treatment suggestions.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-cyan-100/50"
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <FaInfoCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Tips for Best Results</h3>
                  <ul className="text-gray-600 text-xs mt-1 space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                      Use clear, well-lit images
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                      Focus on affected leaf area
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                      Avoid blurry photos
                    </li>
                  </ul>
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

            {/* Supported Plants */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }} 
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-gray-100/50"
            >
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <FaLeaf className="text-teal-500" /> Supported Plants
              </h3>
              <div className="flex flex-wrap gap-2">
                {plants.map((plant) => (
                  <span key={plant} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                    {plant}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT PANEL - UPLOAD ===== */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">

              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FaCamera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Upload Leaf Image</h2>
                    <p className="text-white/80 text-sm">Detect diseases instantly</p>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div className="p-6 space-y-5">
                
                {/* Drag & Drop Zone */}
                <motion.div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive 
                      ? "border-teal-500 bg-teal-50" 
                      : preview 
                        ? "border-teal-300 bg-teal-50/50" 
                        : "border-gray-300 hover:border-teal-400 hover:bg-teal-50/30"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {preview ? (
                    <div className="space-y-4">
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-xl mx-auto"
                      />
                      <div className="flex items-center justify-center gap-2 text-teal-600">
                        <FaCheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Image uploaded successfully</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetForm();
                        }}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 mx-auto"
                      >
                        <FaRedo className="w-3 h-3" />
                        Choose different image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto"
                      >
                        <FaCloudUploadAlt className="w-10 h-10 text-teal-500" />
                      </motion.div>
                      <div>
                        <p className="text-gray-800 font-semibold">
                          Drag & drop your leaf image here
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          or click to browse files
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaImage className="w-3 h-3" />
                          JPG, PNG, WEBP
                        </span>
                        <span>•</span>
                        <span>Max 10MB</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Quick Tips */}
                {!preview && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { icon: FaCamera, text: "Clear Photo" },
                      { icon: FaLeaf, text: "Full Leaf" },
                      { icon: FaLightbulb, text: "Good Light" },
                    ].map((tip, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                        <tip.icon className="w-5 h-5 text-teal-500 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">{tip.text}</span>
                      </div>
                    ))}
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
                  onClick={handlePredict}
                  disabled={loading || !preview}
                  whileHover={{ scale: (loading || !preview) ? 1 : 1.02 }}
                  whileTap={{ scale: (loading || !preview) ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold shadow-lg transition-all ${
                    preview 
                      ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-xl" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } disabled:opacity-70`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <FaShieldAlt className="w-5 h-5" />
                      Detect Disease
                    </>
                  )}
                </motion.button>
              </div>
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
                result.status === "Healthy" 
                  ? "bg-gradient-to-br from-emerald-500 to-green-600" 
                  : "bg-gradient-to-br from-red-500 to-orange-600"
              }`}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  
                  {/* Result Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-28 h-28 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center flex-shrink-0"
                  >
                    {result.status === "Healthy" ? (
                      <FaHeartbeat className="w-14 h-14 text-white" />
                    ) : (
                      <FaExclamationTriangle className="w-14 h-14 text-white" />
                    )}
                  </motion.div>

                  {/* Result Content */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {result.status === "Healthy" ? "Plant is Healthy! 🌿" : "Disease Detected! ⚠️"}
                      </h2>
                      <p className="text-white/80 text-lg mb-4">
                        {result.status === "Healthy" 
                          ? "Your plant looks great! No diseases detected." 
                          : `Detected: ${result.disease || result.status}`
                        }
                      </p>
                    </motion.div>

                    {/* Confidence & Details */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4"
                      >
                        <div className="text-3xl font-bold text-white">{result.confidence}%</div>
                        <div className="text-white/70 text-sm">Confidence</div>
                      </motion.div>

                      {result.status !== "Healthy" && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4"
                        >
                          <div className="text-xl font-bold text-white flex items-center gap-2">
                            <FaShieldAlt className="w-5 h-5" />
                            Treatment Available
                          </div>
                          <div className="text-white/70 text-sm">Click for details</div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Preview Image */}
                  {preview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl flex-shrink-0 hidden md:block"
                    >
                      <img src={preview} alt="Analyzed" className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </div>

                {/* Treatment Suggestions (if diseased) */}
                {result.status !== "Healthy" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20"
                  >
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <FaInfoCircle /> Recommended Actions
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        "Remove affected leaves immediately",
                        "Apply appropriate fungicide",
                        "Improve air circulation"
                      ].map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-white/90 text-sm">
                          <FaCheckCircle className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start"
                >
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={resetForm} 
                    className="px-6 py-3 bg-white text-gray-800 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FaCamera className="w-4 h-4" />
                    Scan Another
                  </motion.button>
                  <Link to="/predict-page">
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="px-6 py-3 bg-white/20 text-white font-medium rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2"
                    >
                      <FaArrowRight className="w-4 h-4" />
                      Other Predictions
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}