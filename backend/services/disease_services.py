import cv2
import json
import numpy as np
import tensorflow as tf
import os

# ------------------ Paths ------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "models", "tomato_disease_cnn.keras")
CLASS_NAMES_PATH = os.path.join(BASE_DIR, "models", "tomato_class_names.json")

IMG_SIZE = (224, 224)

# ------------------ Load Model ------------------
model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)


def predict_disease(image_bytes: bytes):
    """
    image_bytes: raw image bytes from upload
    returns: Healthy / Not Healthy with confidence
    """

    # 1. Decode image using OpenCV
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img_bgr is None:
        return {"success": False, "error": "Invalid image file"}

    # 2. Convert BGR → RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

    # 3. Resize
    img_resized = cv2.resize(img_rgb, IMG_SIZE)

    # 4. Normalize
    img_norm = img_resized.astype(np.float32) / 255.0

    # 5. Add batch dimension
    img_input = np.expand_dims(img_norm, axis=0)

    # 6. Predict
    prob = model.predict(img_input)[0][0]

    if prob >= 0.5:
        predicted_raw = class_names[1]
        confidence = float(prob)
    else:
        predicted_raw = class_names[0]
        confidence = float(1 - prob)

    # ------------------ Farmer Friendly Output ------------------
    if "healthy" in predicted_raw.lower():
        health_status = "Healthy"
    else:
        health_status = "Not Healthy"

    return {
        "success": True,
        "prediction": {
            "status": health_status,
            "confidence": round(confidence * 100, 2)
        }
    }
