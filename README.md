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