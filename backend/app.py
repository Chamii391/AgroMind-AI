from flask import Flask, request, jsonify
from services.crop_service import predict_crop_choice
from services.yield_services import predict_yield
from services.disease_services import predict_disease
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return "Agri AI Backend Running 🧠🌾"

@app.route("/api/crop/check", methods=["POST"])
def check_crop():
    data = request.get_json()

    result = predict_crop_choice(data)
    return jsonify(result)


@app.route("/api/yield/predict", methods=["POST"])
def yield_predict():
    
    data = request.get_json()
    result = predict_yield(data)

    if not result["success"]:
        return jsonify(result), 400

    return jsonify(result)



@app.route("/api/disease/predict", methods=["POST"])
def disease_predict():
    if "image" not in request.files:
        return jsonify({"success": False, "error": "No image uploaded"}), 400

    file = request.files["image"]
    image_bytes = file.read()

    result = predict_disease(image_bytes)

    if not result["success"]:
        return jsonify(result), 400

    return jsonify(result)



if __name__ == "__main__":
    app.run(debug=True)
