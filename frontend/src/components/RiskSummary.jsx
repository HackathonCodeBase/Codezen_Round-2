import { motion } from "framer-motion";

// ── Risk level configuration ─────────────────────────────────
const RISK = {
    LOW: {
        label: "Low Risk",
        sub: "No immediate clinical concerns.",
        color: "#4A7C59",
        track: "#0A1510",
        score: "#4A7C59",
    },
    MODERATE: {
        label: "Moderate Risk",
        sub: "Clinical review recommended.",
        color: "#8B5E3C",
        track: "#130E09",
        score: "#C8A27A",
    },
    HIGH: {
        label: "High Risk",
        sub: "Immediate clinical attention required.",
        color: "#C84444",
        track: "#1A0A0A",
        score: "#C84444",
    },
};

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 276.5
const MAX_SCORE = 14; // ceiling for the ring

// ── Score breakdown labels ───────────────────────────────────
const SCORE_FACTORS = [
    { label: "Allergy conflict", points: "+3" },
    { label: "Severe glucose / shock", points: "+3" },
    { label: "Stage 2 hypertension", points: "+3" },
    { label: "Critical drug interaction", points: "+2" },
    { label: "Age > 60 yrs", points: "+2" },
    { label: "Stage 1 hypertension", points: "+2" },
    { label: "Hyperglycemia", points: "+2" },
    { label: "Tachycardia", points: "+1" },
    { label: "Polypharmacy (≥ 5 meds)", points: "+1" },
];

export default function RiskSummary({ riskScore, riskLevel }) {
    const cfg = RISK[riskLevel] || RISK.LOW;
    const pct = Math.min(1, riskScore / MAX_SCORE);
    const offset = CIRCUMFERENCE * (1 - pct);

    return (
        <motion.div
            className="surface rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 0 }}>

                {/* ── Left: ring + score ── */}
                <div
                    style={{
                        padding: "1.75rem 2rem",
                        borderRight: "1px solid #1F1F1F",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        minWidth: 180,
                    }}
                >
                    {/* SVG ring */}
                    <div style={{ position: "relative", width: 120, height: 120 }}>
                        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                            {/* Track */}
                            <circle
                                cx="60" cy="60" r={RADIUS}
                                fill="none"
                                stroke={cfg.track}
                                strokeWidth="6"
                            />
                            {/* Progress */}
                            <motion.circle
                                cx="60" cy="60" r={RADIUS}
                                fill="none"
                                stroke={cfg.color}
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={CIRCUMFERENCE}
                                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                            />
                        </svg>

                        {/* Score in centre */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1, color: cfg.score }}
                            >
                                {riskScore}
                            </motion.span>
                            <span
                                style={{
                                    fontSize: "0.6rem",
                                    color: "#5A5A5A",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    fontWeight: 600,
                                    marginTop: 2,
                                }}
                            >
                                / {MAX_SCORE}+
                            </span>
                        </div>
                    </div>

                    {/* Risk level badge */}
                    <div style={{ textAlign: "center" }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            style={{
                                display: "inline-block",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: cfg.color,
                                padding: "0.2rem 0.75rem",
                                border: `1px solid ${cfg.color}`,
                                borderRadius: 3,
                                opacity: 0.9,
                            }}
                        >
                            {riskLevel}
                        </motion.div>
                    </div>
                </div>

                {/* ── Right: breakdown ── */}
                <div style={{ padding: "1.5rem" }}>
                    <div style={{ marginBottom: "0.85rem" }}>
                        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A5A", marginBottom: "0.3rem" }}>
                            Overall Patient Risk
                        </p>
                        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: cfg.color }}>
                            {cfg.label}
                        </p>
                        <p style={{ fontSize: "0.73rem", color: "#5A5A5A", marginTop: "0.2rem" }}>
                            {cfg.sub}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="divider" style={{ marginBottom: "0.85rem" }} />

                    {/* Score factor legend */}
                    <p style={{ fontSize: "0.6rem", color: "#3A3A3A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.6rem" }}>
                        Score factors
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem 1rem" }}>
                        {SCORE_FACTORS.map((f) => (
                            <div key={f.label} style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                                <span style={{ fontSize: "0.68rem", color: "#5A5A5A" }}>{f.label}</span>
                                <span style={{ fontSize: "0.68rem", color: cfg.color, fontWeight: 600, flexShrink: 0 }}>
                                    {f.points}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginTop: "1rem" }}>
                        <div
                            style={{
                                height: 3,
                                background: "#1F1F1F",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (riskScore / MAX_SCORE) * 100)}%` }}
                                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                                style={{ height: "100%", background: cfg.color, borderRadius: 2 }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                            {["0–2 Low", "3–5 Moderate", "6+ High"].map((l) => (
                                <span key={l} style={{ fontSize: "0.6rem", color: "#3A3A3A" }}>{l}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
