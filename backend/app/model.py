from pathlib import Path

import joblib


# ============================================================
# Project Paths
# ============================================================

# Project root:
# phishing-website-detection/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Final saved ML model
MODEL_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "phishing_url_tfidf_model.joblib"
)


# ============================================================
# Load Final Model
# ============================================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model file not found: {MODEL_PATH}"
    )

model_artifact = joblib.load(MODEL_PATH)


# ============================================================
# Extract Saved Model Components
# ============================================================

vectorizer = model_artifact["vectorizer"]

model = model_artifact["model"]

LABEL_MAPPING = model_artifact["label_mapping"]


# ============================================================
# Prediction Function
# ============================================================

def predict_url(url: str) -> dict:
    """
    Transform a raw URL using the saved TF-IDF vectorizer
    and return the phishing detection prediction.
    """

    # --------------------------------------------------------
    # 1. Transform raw URL using the SAME vectorizer
    #    fitted during model training
    # --------------------------------------------------------

    url_features = vectorizer.transform([url])

    # --------------------------------------------------------
    # 2. Make prediction
    # --------------------------------------------------------

    prediction = model.predict(url_features)[0]

    # --------------------------------------------------------
    # 3. Get prediction probabilities
    # --------------------------------------------------------

    probabilities = model.predict_proba(url_features)[0]

    probability = float(
        probabilities[prediction]
    )

    # --------------------------------------------------------
    # 4. Return structured result
    # --------------------------------------------------------

    return {
        "prediction": int(prediction),
        "label": LABEL_MAPPING[int(prediction)],
        "probability": probability,
        "features": {
            "model_type": "Character TF-IDF + Logistic Regression"
        }
    }