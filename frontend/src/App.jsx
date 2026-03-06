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

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzePatient(data);
      setResult(res);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        "Cannot connect to backend. Ensure FastAPI is running on http://localhost:8000"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>

      <Header />

      {/* Title bar */}
      <div style={{ borderBottom: "1px solid #E5E7EB", background: "#fff" }}>
        <div style={{ maxWidth: "86rem", margin: "0 auto", padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", marginBottom: "0.2rem" }}
            >
              Patient Risk Analysis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ fontSize: "0.77rem", color: "#9CA3AF" }}
            >
              Predictive scoring · Expandable recommendations
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
          >
            {[].map((t) => (
              <span key={t} style={{ fontSize: "0.65rem", fontWeight: 500, padding: "0.2rem 0.6rem", border: "1px solid #E5E7EB", borderRadius: 4, color: "#6B7280", background: "#fff" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main */}
      <main style={{ maxWidth: "86rem", margin: "0 auto", padding: "1.5rem" }}>

        {/* Risk card — slides in after first result */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.25rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: "hidden" }}
            >
              <RiskSummary riskScore={result.risk_score} riskLevel={result.risk_level} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start" }}>
          <PatientForm onSubmit={handleSubmit} loading={loading} />
          <AlertPanel result={result} error={error} />
        </div>

        {/* Status strip */}
        <div style={{ marginTop: "1.25rem", padding: "0.65rem 1.25rem", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>

        </div>
      </main>
    </div>
  );
}

export default App;
