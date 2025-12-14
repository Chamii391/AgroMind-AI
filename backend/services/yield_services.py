import joblib
import numpy as np
import pandas as pd
import os

# ---------- Load once ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "models", "yield_prediction_model.joblib")
FEATURES_PATH = os.path.join(BASE_DIR, "models", "yield_feature_names.joblib")

model = joblib.load(MODEL_PATH)
feature_names = joblib.load(FEATURES_PATH)

print("✅ Yield model loaded")
print("✅ Feature names loaded:", feature_names)


def predict_yield(input_json: dict):
    """
    input_json example:
    {
        "Item": "Rice",
        "average_rain_fall_mm_per_year": 1800,
        "pesticides_tonnes": 2000,
        "avg_temp": 27.5
    }
    """

    # 1) Validate missing fields using feature_names
    missing = [f for f in feature_names if f not in input_json]
    if missing:
        return {
            "success": False,
            "error": "Missing required fields",
            "missing": missing
        }

    # 2) Build row with correct column order
    row = {f: input_json[f] for f in feature_names}
    df = pd.DataFrame([row])

    # 3) Predict in log scale
    pred_log = model.predict(df)[0]

    # 4) Convert back to real yield (because you trained using log1p(y))
    pred_yield = np.expm1(pred_log)

    return {
        "success": True,
        "prediction": {
            "predicted_yield_hg_per_ha": round(float(pred_yield), 2)
        }
    }
