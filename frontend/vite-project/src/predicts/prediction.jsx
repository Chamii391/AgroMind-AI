import { useState } from "react";
import axios from "axios";


export default function Prediction() {
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    zone: "",
    soil_type: "",
    rainfall_mm: "",
    temperature_c: "",
    pH: "",
    season: "",
    shade: "",
    chosen_crop: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // convert numeric fields
      const payload = {
        ...formData,
        rainfall_mm: Number(formData.rainfall_mm),
        temperature_c: Number(formData.temperature_c),
        pH: Number(formData.pH),
      };

      const res = await axios.post(
        "http://localhost:5000/api/crop/check",
        payload
      );

      if (res.data.success) {
        setResult(res.data.prediction);
      } else {
        setError(res.data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-green-700">
            Crop Suitability Prediction
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* province */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Province
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="North Central"
                required
              />
            </div>

            {/* district */}
            <div>
              <label className="block text-sm font-medium mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Anuradhapura"
                required
              />
            </div>

            {/* zone */}
            <div>
              <label className="block text-sm font-medium mb-1">Zone</label>
              <select
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select zone</option>
                <option value="Wet Zone">Wet Zone</option>
                <option value="Dry Zone">Dry Zone</option>
                <option value="Intermediate Zone">Intermediate Zone</option>
              </select>
            </div>

            {/* soil_type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Soil Type
              </label>
              <input
                type="text"
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="loamy / clay / sandy_loam ..."
                required
              />
            </div>

            {/* rainfall, temperature, pH */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall_mm"
                  value={formData.rainfall_mm}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 2800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature_c"
                  value={formData.temperature_c}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 30.0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">pH</label>
                <input
                  type="number"
                  step="0.1"
                  name="pH"
                  value={formData.pH}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 6.8"
                  required
                />
              </div>
            </div>

            {/* season */}
            <div>
              <label className="block text-sm font-medium mb-1">Season</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select season</option>
                <option value="Yala">Yala</option>
                <option value="Maha">Maha</option>
              </select>
            </div>

            {/* shade */}
            <div>
              <label className="block text-sm font-medium mb-1">Shade</label>
              <select
                name="shade"
                value={formData.shade}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Shade?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* chosen_crop */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Chosen Crop
              </label>
              <input
                type="text"
                name="chosen_crop"
                value={formData.chosen_crop}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. paddy, turmeric, banana..."
                required
              />
            </div>

            {/* submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Check Crop Suitability"}
              </button>
            </div>
          </form>

          {/* error message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* prediction result */}
          {result && (
            <div className="mt-6 p-4 rounded-xl border border-green-200 bg-green-50">
              <h2 className="text-lg font-semibold mb-2 text-green-800">
                Prediction Result
              </h2>
              <p className="text-sm">
                Crop choice is:{" "}
                <span
                  className={
                    result.label === "GOOD"
                      ? "font-bold text-green-700"
                      : "font-bold text-red-600"
                  }
                >
                  {result.label}
                </span>
              </p>

              {result.prob_good !== null && result.prob_bad !== null && (
                <div className="mt-2 text-xs text-gray-700">
                  <p>Probability GOOD: {(result.prob_good * 100).toFixed(2)}%</p>
                  <p>Probability BAD: {(result.prob_bad * 100).toFixed(2)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
