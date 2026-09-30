import { useState } from "react";

import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const featureMeta = [
  [
    "raw_url",
    "RAW URL",
    "The complete URL submitted for analysis",
  ],
  [
    "character_ngrams",
    "CHARACTER N-GRAMS",
    "Character-level patterns extracted from the URL",
  ],
  [
    "tfidf_vectorization",
    "TF-IDF VECTOR",
    "Converts URL text into numerical TF-IDF features",
  ],
  [
    "logistic_regression",
    "LOGISTIC REGRESSION",
    "Classifies the transformed URL representation",
  ],
  [
    "binary_classification",
    "BINARY CLASSIFICATION",
    "Final phishing or legitimate classification",
  ],
];

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // URL ANALYSIS
  // ============================================================

  const analyzeUrl = async () => {
    const targetUrl = url.trim();

    // ------------------------------------------------------------
    // EMPTY URL VALIDATION
    // ------------------------------------------------------------

    if (!targetUrl) {
      setError("TARGET URL REQUIRED");
      setResult(null);
      return;
    }

    // ------------------------------------------------------------
    // URL FORMAT VALIDATION
    // ------------------------------------------------------------

    try {
      const parsedUrl = new URL(targetUrl);

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        setError("INVALID URL: USE HTTP OR HTTPS");
        setResult(null);
        return;
      }

      if (!parsedUrl.hostname) {
        setError("INVALID URL: DOMAIN REQUIRED");
        setResult(null);
        return;
      }
    } catch {
      setError("INVALID URL: ENTER A VALID WEBSITE URL");
      setResult(null);
      return;
    }

    // ------------------------------------------------------------
    // START ANALYSIS
    // ------------------------------------------------------------

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: targetUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "ANALYSIS FAILED");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || "BACKEND CONNECTION FAILED"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = (event) => {
    event.preventDefault();
    analyzeUrl();
  };

  // ============================================================
  // RESULT STATE
  // ============================================================

  const isLegitimate =
    result?.label === "Legitimate";

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="retro-app">

      {/* ========================================================
          HEADER
          ======================================================== */}

      <header className="window">

        <div className="title-bar">

          <div className="title-bar-text">
            <span className="title-icon">◆</span>
            PHISHGUARD.EXE
          </div>

          <div
            className="window-controls"
            aria-hidden="true"
          >
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>

        </div>

        <div className="status-strip">

          <span>
            PHISHGUARD // PHISHING WEBSITE DETECTION
          </span>

          <span className="status-online">
            ● SYSTEM ONLINE
          </span>

        </div>

      </header>

      {/* ========================================================
          MAIN
          ======================================================== */}

      <main className="page-content">

        {/* ======================================================
            HERO WINDOW
            ====================================================== */}

        <section className="hero-window window">

          <div className="title-bar title-bar-blue">

            <div className="title-bar-text">
              WELCOME TO PHISHGUARD
            </div>

            <div
              className="window-controls"
              aria-hidden="true"
            >
              <span>_</span>
              <span>□</span>
              <span>×</span>
            </div>

          </div>

          <div className="hero-content">

            <div className="hero-main">

              <div className="new-badge">
                ★ NEW! ★
              </div>

              <h1>
                PHISHING WEBSITE DETECTION
              </h1>

              <p>
                Analyze a website URL using our machine
                learning model and classify it as potentially
                phishing or legitimate.
              </p>

              <div className="hero-links">

                <a href="#analyzer">
                  [ Analyze a URL ]
                </a>

                <a href="#matrix">
                  [ View Detection Matrix ]
                </a>

              </div>

            </div>

            {/* SYSTEM STATUS */}

            <aside className="system-box">

              <div className="box-heading">
                SYSTEM STATUS
              </div>

              <div className="system-row">
                <span>MODEL</span>
                <strong>TF-IDF + LOGISTIC</strong>
              </div>

              <div className="system-row">
                <span>CLASSIFIER</span>
                <strong>BINARY</strong>
              </div>

              <div className="system-row">
                <span>INPUT</span>
                <strong>RAW URL</strong>
              </div>

              <div className="system-row">
                <span>STATUS</span>

                <strong className="green-text">
                  READY
                </strong>
              </div>

            </aside>

          </div>

        </section>

        {/* ======================================================
            CONSTRUCTION BAR
            ====================================================== */}

        <div className="construction-bar">

          <span>
            UNDER CONSTRUCTION
          </span>

          <span>
            ◆ ◆ ◆
          </span>

          <span>
            ML SECURITY LAB
          </span>

          <span>
            ◆ ◆ ◆
          </span>

          <span>
            UNDER CONSTRUCTION
          </span>

        </div>

        {/* ======================================================
            01 - URL ANALYZER
            ====================================================== */}

        <section
          id="analyzer"
          className="window"
        >

          <div className="title-bar">

            <div className="title-bar-text">
              01 - URL ANALYZER
            </div>

            <div
              className="window-controls"
              aria-hidden="true"
            >
              <span>_</span>
              <span>□</span>
              <span>×</span>
            </div>

          </div>

          <div className="panel-body">

            <form onSubmit={handleSubmit}>

              <label
                htmlFor="url-input"
                className="field-label"
              >
                TARGET URL:
              </label>

              <div className="input-row">

                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(event) =>
                    setUrl(event.target.value)
                  }
                  placeholder="https://example.com"
                  disabled={loading}
                  autoComplete="off"
                  spellCheck="false"
                />

                <button
                  type="submit"
                  className="retro-button primary"
                  disabled={loading}
                >
                  {loading
                    ? "SCANNING..."
                    : "ANALYZE URL"}
                </button>

              </div>

              <div className="hint">
                Enter a complete HTTP or HTTPS website
                URL and start the ML analysis.
              </div>

            </form>

            {/* ERROR */}

            {error && (
              <div className="error-box">

                <strong>
                  ERROR:
                </strong>{" "}

                {error}

              </div>
            )}

          </div>

        </section>

        {/* ======================================================
            02 - ANALYSIS RESULT
            ====================================================== */}

        {result && (

          <section className="window result-window">

            <div className="title-bar">

              <div className="title-bar-text">
                02 - ANALYSIS RESULT
              </div>

              <div
                className="window-controls"
                aria-hidden="true"
              >
                <span>_</span>
                <span>□</span>
                <span>×</span>
              </div>

            </div>

            <div className="panel-body">

              {/* CLASSIFICATION BANNER */}

              <div
                className={`result-banner ${
                  isLegitimate
                    ? "safe"
                    : "danger"
                }`}
              >

                <div className="result-symbol">

                  {isLegitimate
                    ? "✓"
                    : "!"}

                </div>

                <div>

                  <div className="result-label">
                    CLASSIFICATION
                  </div>

                  <div className="result-value">
                    {result.label.toUpperCase()}
                  </div>

                </div>

              </div>

              {/* CONFIDENCE + URL */}

              <div className="result-grid">

                {/* CONFIDENCE */}

                <div className="inset-box">

                  <div className="box-heading">
                    MODEL CONFIDENCE
                  </div>

                  <div className="confidence">
                    {(
                      result.probability * 100
                    ).toFixed(2)}
                    %
                  </div>

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          result.probability * 100
                        }%`,
                      }}
                    />

                  </div>

                </div>

                {/* TARGET URL */}

                <div className="inset-box">

                  <div className="box-heading">
                    TARGET URL
                  </div>

                  <div className="target-url">
                    {result.url}
                  </div>

                </div>

              </div>

              {/* RESULT METADATA */}

              <table className="result-table">

                <tbody>

                  <tr>

                    <th>
                      CLASS ID
                    </th>

                    <td>
                      {result.prediction}
                    </td>

                    <th>
                      ENGINE
                    </th>

                    <td>
                      TF-IDF + LOGISTIC
                    </td>

                  </tr>

                  <tr>

                    <th>
                      FEATURES
                    </th>

                    <td>
                      RAW URL
                    </td>

                    <th>
                      STATUS
                    </th>

                    <td>
                      {isLegitimate
                        ? "LOW RISK"
                        : "THREAT FLAG"}
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </section>

        )}

        {/* ======================================================
            03 - DETECTION MATRIX
            ====================================================== */}

        <section
          id="matrix"
          className="window"
        >

          <div className="title-bar title-bar-blue">

            <div className="title-bar-text">

              {result
                ? "03 - DETECTION MATRIX"
                : "02 - DETECTION MATRIX"}

            </div>

            <div
              className="window-controls"
              aria-hidden="true"
            >
              <span>_</span>
              <span>□</span>
              <span>×</span>
            </div>

          </div>

          <div className="panel-body">

            <p className="section-intro">
              Raw URL text pipeline used by the deployed
              Character TF-IDF + Logistic Regression model.
              Values are populated after an analysis.
            </p>

            <div className="matrix-table-wrap">

              <table className="matrix-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      MODEL SIGNAL
                    </th>

                    <th>
                      VALUE
                    </th>

                    <th>
                      DESCRIPTION
                    </th>

                    <th>
                      STATUS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {featureMeta.map(
                    (
                      [
                        key,
                        name,
                        description,
                      ],
                      index
                    ) => {

                      let value = null;

                      if (result) {

                        if (key === "raw_url") {
                          value = result.url;
                        }

                        else if (
                          key ===
                          "binary_classification"
                        ) {
                          value = result.label;
                        }

                        else {
                          value = "ACTIVE";
                        }

                      }

                      const hasValue =
                        value !== undefined &&
                        value !== null;

                      return (

                        <tr key={key}>

                          {/* NUMBER */}

                          <td>

                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}

                          </td>

                          {/* MODEL SIGNAL */}

                          <td>

                            <strong>
                              {name}
                            </strong>

                            <small>
                              {key}
                            </small>

                          </td>

                          {/* VALUE */}

                          <td className="value-cell">

                            {hasValue
                              ? String(value)
                              : "--"}

                          </td>

                          {/* DESCRIPTION */}

                          <td>
                            {description}
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`status-badge ${
                                hasValue
                                  ? "active"
                                  : ""
                              }`}
                            >

                              {hasValue
                                ? "ACTIVE"
                                : "WAITING"}

                            </span>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* ======================================================
            STATISTICS
            ====================================================== */}

        <section className="stats-grid">

          {/* HIT COUNTER */}

          <div className="counter window">

            <div className="counter-title">
              SITE HIT COUNTER
            </div>

            <div className="counter-number">
              0001234
            </div>

            <div>
              VISITORS SINCE 2026
            </div>

          </div>

          {/* SYSTEM INFORMATION */}

          <div className="window info-window">

            <div className="title-bar">

              <div className="title-bar-text">
                SYSTEM INFORMATION
              </div>

            </div>

            <div className="info-body">

              <strong>
                PHISHGUARD
              </strong>

              <span>
                React + FastAPI +
                Character TF-IDF +
                Logistic Regression
              </span>

              <span>
                URL phishing classification system
              </span>

            </div>

          </div>

        </section>

      </main>

      {/* ========================================================
          FOOTER
          ======================================================== */}

      <footer className="footer-window window">

        <div className="footer-line">

          <span>
            PHISHGUARD // ML SECURITY SYSTEM
          </span>

          <span>
            ● SYSTEM OPERATIONAL
          </span>

        </div>

        <div className="footer-links">

          <a href="#analyzer">
            Analyzer
          </a>

          {" | "}

          <a href="#matrix">
            Detection Matrix
          </a>

          {" | "}

          <a href="#top">
            Back to top
          </a>

        </div>

      </footer>

    </div>
  );
}

export default App;