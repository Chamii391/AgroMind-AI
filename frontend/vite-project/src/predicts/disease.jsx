import { useState } from "react";
import axios from "axios";

export default function Disease() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult(null);
    setError("");

    if (file) {
      setPreview(URL.createObjectURL(file));
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
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-green-700 text-center">
          Plant Disease Detection
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Upload a tomato leaf image to check plant health
        </p>

        {/* Image Upload */}
        <div className="mt-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-contain rounded-lg border"
            />
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Check Disease"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            className={`mt-6 p-4 rounded-xl text-center ${
              result.status === "Healthy"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Status: {result.status}
            </h2>
            <p className="text-sm mt-1">
              Confidence: {result.confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
