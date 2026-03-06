import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import AlertPanel from "./components/AlertPanel";
import RiskSummary from "./components/RiskSummary";
import { analyzePatient } from "./api";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (patientData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzePatient(patientData);
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        "Unable to connect to backend. Ensure FastAPI is running on http://localhost:8000"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0B" }}>

      {/* ── HEADER ── */}
      <Header />

      {/* ── WORKSPACE TITLE BAR ── */}
      <div
        style={{
          borderBottom: "1px solid #1F1F1F",
          background: "#0E0E0E",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6"
          style={{ padding: "1.5rem 1.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#F5F5F5",
                  letterSpacing: "-0.03em",
                  marginBottom: "0.3rem",
                }}
              >
                Patient Risk Analysis
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ fontSize: "0.78rem", color: "#5A5A5A" }}
              >
                17-rule clinical engine · Predictive risk scoring · Explainable alerts
              </motion.p>
            </div>

            {/* Rule tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
            >
              {[
                "Glucose & Metabolic",
                "Vital Signs",
                "Drug Interactions",
                "Allergy Conflicts",
                "Risk Scoring",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    padding: "0.2rem 0.65rem",
                    border: "1px solid #2A2A2A",
                    borderRadius: 3,
                    color: "#5A5A5A",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main
        className="max-w-7xl mx-auto"
        style={{ padding: "1.5rem" }}
      >

        {/* Risk summary — appears after analysis */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.25rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <RiskSummary
                riskScore={result.risk_score}
                riskLevel={result.risk_level}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two-column dashboard */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
            alignItems: "start",
          }}
          className="max-[900px]:grid-cols-1"
        >
          <PatientForm onSubmit={handleSubmit} loading={loading} />
          <AlertPanel result={result} error={error} />
        </div>

        {/* ── Status bar ── */}
        <div
          style={{
            marginTop: "1.25rem",
            padding: "0.7rem 1.25rem",
            background: "#0E0E0E",
            border: "1px solid #1F1F1F",
            borderRadius: 6,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {[
            ["17 clinical rules active", "#3A3A3A"],
            ["Real-time FastAPI analysis", "#3A3A3A"],
            ["Local processing — no data stored", "#3A3A3A"],
            ["Explainable alerts with recommendations", "#3A3A3A"],
          ].map(([text, color]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2A2A2A", flexShrink: 0 }} />
              <span style={{ fontSize: "0.68rem", color }}>{text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
