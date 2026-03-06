import { motion } from "framer-motion";

const RISK = {
    LOW: { color: "#065F46", bg: "#F0FDF4", bd: "#A7F3D0", label: "Low Risk" },
    MODERATE: { color: "#92400E", bg: "#FFFBEB", bd: "#FDE68A", label: "Moderate Risk" },
    HIGH: { color: "#DC2626", bg: "#FEF2F2", bd: "#FECACA", label: "High Risk" },
};

const MAX = 14;

export default function RiskSummary({ riskScore, riskLevel }) {
    const cfg = RISK[riskLevel] || RISK.LOW;
    const pct = Math.min(100, Math.round((riskScore / MAX) * 100));

    return (
        <motion.div
            className="card"
            style={{ overflow: "hidden" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div style={{ display: "flex", alignItems: "stretch" }}>

                {/* Score block */}
                <div style={{
                    background: cfg.bg,
                    borderRight: `1px solid ${cfg.bd}`,
                    padding: "1.5rem 2rem",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minWidth: 140, gap: "0.4rem",
                }}>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        style={{ fontSize: "2.6rem", fontWeight: 800, lineHeight: 1, color: cfg.color }}
                    >
                        {riskScore}
                    </motion.p>
                    <p style={{ fontSize: "0.62rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                        Risk Score
                    </p>
                    <div style={{
                        marginTop: "0.35rem",
                        fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        color: cfg.color, padding: "0.15rem 0.6rem",
                        border: `1px solid ${cfg.bd}`, borderRadius: 3, background: "#fff",
                    }}>
                        {cfg.label}
                    </div>
                </div>

                {/* Detail */}
                <div style={{ flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: "0.35rem" }}>Overall Patient Risk</p>
                        <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.55 }}>
                            {riskLevel === "HIGH" && "Multiple serious risk factors detected. Immediate clinical review required."}
                            {riskLevel === "MODERATE" && "One or more risk factors present. Clinical assessment recommended."}
                            {riskLevel === "LOW" && "Patient data within acceptable parameters for current rule set."}
                            {!["HIGH", "MODERATE", "LOW"].includes(riskLevel) && "Score computed from 21 active clinical rules."}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                            <span style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Score: {riskScore} / {MAX}+</span>
                            <span style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>{pct}%</span>
                        </div>
                        <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
                                style={{ height: "100%", background: cfg.color, borderRadius: 2 }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                            {["0–2 Low", "3–5 Moderate", "6+ High"].map((l) => (
                                <span key={l} style={{ fontSize: "0.6rem", color: "#D1D5DB" }}>{l}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
