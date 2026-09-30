# Phishing Website Detection

> Machine Learning based web application for detecting potentially phishing URLs.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![Scikit--learn](https://img.shields.io/badge/ML-Scikit--learn-F7931E)
![Status](https://img.shields.io/badge/Status-Working-success)

## Overview

Phishing Website Detection is a machine learning based web application that analyzes a submitted website URL and classifies it as either:

- **Legitimate**
- **Phishing**

The application provides a simple web interface where a user can enter a URL and receive the model's prediction along with its confidence probability.

The project combines a **React frontend**, **FastAPI backend**, and a trained **Character TF-IDF + Logistic Regression** machine learning pipeline.

---

## Screenshots

### Main Interface

The main PHISHGUARD interface provides the URL analyzer, system status, and deployed ML pipeline overview.

![Main Interface](docs/screenshots/01-main-interface.png)

### Legitimate URL Detection

Example of the application classifying a submitted URL as legitimate.

![Legitimate Detection](docs/screenshots/02-legitimate-detection.png)

### Phishing URL Detection

Example of the application identifying a test URL as potentially phishing.

![Phishing Detection](docs/screenshots/03-phishing-detection.png)

### Detection Matrix

The detection matrix shows the processing pipeline used by the deployed model.

![Detection Matrix](docs/screenshots/04-detection-matrix.png)

### FastAPI Documentation

Interactive FastAPI Swagger documentation for the `/predict` endpoint.

![FastAPI Swagger](docs/screenshots/05-api-swagger.png)

## Features

- URL-based phishing detection
- Character-level TF-IDF feature extraction
- Logistic Regression classification
- Prediction probability
- React-based web interface
- FastAPI REST API
- Responsive UI
- Input URL validation
- Swagger API documentation
- Trained model stored as a Joblib artifact
- Production frontend build using Vite

---

## System Architecture

```text
                    ┌──────────────────────┐
                    │      User / Browser  │
                    └──────────┬───────────┘
                               │
                               │ URL
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                               │ POST /predict
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Character TF-IDF     │
                    │ Vectorization        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Logistic Regression  │
                    │ Classifier            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Prediction +          │
                    │ Probability           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ React Result Screen  │
                    └──────────────────────┘