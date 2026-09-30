from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .model import predict_url


# ============================================================
# FastAPI Application
# ============================================================

app = FastAPI(
    title="Phishing Website Detection API",
    description="ML API for detecting potentially phishing URLs.",
    version="1.0.0"
)


# ============================================================
# CORS Configuration
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Request Schema
# ============================================================

class URLRequest(BaseModel):
    url: str = Field(
        ...,
        min_length=1,
        description="Website URL to analyze"
    )


# ============================================================
# Health Check
# ============================================================

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Phishing Website Detection API",
        "version": "1.0.0"
    }


# ============================================================
# Prediction Endpoint
# ============================================================

@app.post("/predict")
def predict(request: URLRequest):
    try:
        result = predict_url(request.url)

        return {
            "url": request.url,
            "prediction": result["prediction"],
            "label": result["label"],
            "probability": result["probability"],
            "features": result["features"]
        }

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )