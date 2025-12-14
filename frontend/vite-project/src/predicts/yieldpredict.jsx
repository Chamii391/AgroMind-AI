import { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        // your backend returns: { success: true, prediction: { predicted_yield_hg_per_ha: ... } }
        setPrediction(res.data.prediction?.predicted_yield_hg_per_ha);
      } else {
        setError(res.data.error || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Check backend is running and CORS is enabled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-green-700">
          Yield Prediction
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Enter crop + climate inputs to predict yield (hg/ha).
        </p>

        <form onSubmit={handlePredict} className="mt-6 space-y-4">
          {/* Item */}
          <div>
            <label className="block text-sm font-medium mb-1">Crop (Item)</label>
            <input
              type="text"
              name="Item"
              value={formData.Item}
              onChange={handleChange}
              placeholder="e.g. Rice"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Rainfall (mm/year)
            </label>
            <input
              type="number"
              name="average_rain_fall_mm_per_year"
              value={formData.average_rain_fall_mm_per_year}
              onChange={handleChange}
              placeholder="e.g. 1800"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Pesticides */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Pesticides (tonnes)
            </label>
            <input
              type="number"
              name="pesticides_tonnes"
              value={formData.pesticides_tonnes}
              onChange={handleChange}
              placeholder="e.g. 2000"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Avg Temp */}
          <div>
            <label className="block text-sm font-medium mb-1">Avg Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              name="avg_temp"
              value={formData.avg_temp}
              onChange={handleChange}
              placeholder="e.g. 27.5"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm disabled:opacity-60"
          >
            {loading ? "Predicting..." : "Predict Yield"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Prediction */}
        {prediction !== null && (
          <div className="mt-6 p-4 rounded-xl border border-green-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-800">Prediction Result</h2>
            <p className="mt-2 text-sm text-gray-800">
              Predicted Yield:{" "}
              <span className="font-bold text-green-700">
                {Number(prediction).toLocaleString()} hg/ha
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
