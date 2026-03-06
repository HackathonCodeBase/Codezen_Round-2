import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEV = {
    critical: { accent: "#DC2626", tagBg: "#FEF2F2", tagColor: "#DC2626", cardBg: "#FFFAFA", border: "#FECACA", label: "Critical" },
    warning: { accent: "#92400E", tagBg: "#FFFBEB", tagColor: "#92400E", cardBg: "#FFFDF7", border: "#FDE68A", label: "Warning" },
    low: { accent: "#6B7280", tagBg: "#F9FAFB", tagColor: "#6B7280", cardBg: "#FFFFFF", border: "#E5E7EB", label: "Low Risk" },
};

const STATUS = {
    normal: { label: "All Clear", color: "#065F46", bg: "#F0FDF4", bd: "#A7F3D0" },
    low: { label: "Informational", color: "#6B7280", bg: "#F9FAFB", bd: "#E5E7EB" },
    warning: { label: "Warnings Detected", color: "#92400E", bg: "#FFFBEB", bd: "#FDE68A" },
    critical: { label: "Critical Alerts", color: "#DC2626", bg: "#FEF2F2", bd: "#FECACA" },
};

/* ── Individual Alert Card ── */
function AlertCard({ alert, index }) {
    const [open, setOpen] = useState(false);
    const s = SEV[alert.severity] || SEV.low;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
            style={{
                background: s.cardBg,
                border: `1px solid ${s.border}`,
                borderLeft: `3px solid ${s.accent}`,
                borderRadius: 8, overflow: "hidden",
            }}
        >
            {/* Header row */}
            <div
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.8rem 1rem", cursor: "pointer" }}
                onClick={() => setOpen((p) => !p)}
            >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111111" }}>{alert.title}</span>
                        <span style={{
                            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                            padding: "0.1rem 0.45rem", borderRadius: 3,
                            background: s.tagBg, color: s.tagColor,
                        }}>
                            {s.label}
                        </span>
                    </div>
                    <p style={{ fontSize: "0.77rem", color: "#6B7280", lineHeight: 1.55 }}>{alert.explanation}</p>
                </div>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ fontSize: "0.7rem", color: "#9CA3AF", flexShrink: 0 }}
                >
                    ▾
                </motion.span>
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ padding: "0 1rem 0.9rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                            {(alert.detected_value || alert.normal_range) && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                                    {alert.detected_value && (
                                        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
                                            <p style={{ fontSize: "0.6rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Detected</p>
                                            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111111" }}>{alert.detected_value}</p>
                                        </div>
                                    )}
                                    {alert.normal_range && (
                                        <div style={{ background: "#F0FDF4", border: "1px solid #A7F3D0", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
                                            <p style={{ fontSize: "0.6rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Normal Range</p>
                                            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#065F46" }}>{alert.normal_range}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div style={{ background: "#F9FAFB", borderRadius: 6, padding: "0.6rem 0.75rem" }}>
                                <p style={{ fontSize: "0.6rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.2rem" }}>
                                    Recommended Action
                                </p>
                                <p style={{ fontSize: "0.77rem", color: "#374151", lineHeight: 1.6 }}>{alert.recommendation}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Main AlertPanel ── */
export default function AlertPanel({ result, error }) {

    if (!result && !error) {
        return (
            <motion.div
                className="card"
                style={{ minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2.5rem 2rem", gap: "0.85rem" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
            >
                <div style={{ width: 44, height: 44, border: "1px solid #E5E7EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#D1D5DB" strokeWidth="1.5" />
                        <path d="M9 12 L11.5 14.5 L16 9" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111111" }}>Awaiting Analysis</p>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", maxWidth: 250, lineHeight: 1.65 }}>
                    Complete the patient form and click{" "}
                    <span style={{ color: "#8B5E3C", fontWeight: 600 }}>Analyze Patient</span>{" "}
                    to generate clinical alerts.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-start", marginTop: "0.5rem" }}>
                    {["21 clinical rules active", "Drug interaction checks", "Predictive risk scoring", "Expandable recommendations"].map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: "#9CA3AF" }}>
                            <span style={{ color: "#8B5E3C", fontWeight: 700 }}>—</span> {f}
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div className="card" style={{ overflow: "hidden" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ padding: "1.1rem 1.25rem", borderLeft: "3px solid #DC2626", background: "#FFF5F5" }}>
                    <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#DC2626", marginBottom: "0.3rem" }}>Connection Error</p>
                    <p style={{ fontSize: "0.77rem", color: "#6B7280" }}>{error}</p>
                </div>
            </motion.div>
        );
    }

    const { alerts, total_alerts, status } = result;
    const cfg = STATUS[status] || STATUS.normal;

    const ordered = [
        ...alerts.filter((a) => a.severity === "critical"),
        ...alerts.filter((a) => a.severity === "warning"),
        ...alerts.filter((a) => a.severity === "low"),
    ];

    return (
        <motion.div className="card" style={{ overflow: "hidden" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Status bar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                borderBottom: "1px solid #F3F4F6",
                background: cfg.bg,
                borderLeft: `3px solid ${cfg.bd}`,
            }}>
                <div>
                    <p style={{ fontSize: "0.83rem", fontWeight: 700, color: cfg.color }}>{cfg.label}</p>
                    <p style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>Click any alert to expand details</p>
                </div>
                <div style={{ padding: "0.35rem 0.85rem", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", textAlign: "center" }}>
                    <p style={{ fontSize: "1.3rem", fontWeight: 800, color: "#111111", lineHeight: 1 }}>{total_alerts}</p>
                    <p style={{ fontSize: "0.58rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>alerts</p>
                </div>
            </div>

            {/* Alert list */}
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {ordered.length === 0
                    ? <p style={{ fontSize: "0.82rem", color: "#065F46", textAlign: "center", padding: "2rem 0" }}>Patient data within normal parameters.</p>
                    : ordered.map((a, i) => <AlertCard key={i} alert={a} index={i} />)
                }
            </div>

            {/* Footer */}
            <div style={{ padding: "0.6rem 1.25rem", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.67rem", color: "#D1D5DB" }}>{new Date().toLocaleTimeString()} — {new Date().toLocaleDateString()}</span>
                <span style={{ fontSize: "0.67rem", color: "#D1D5DB" }}>ClinIQ v2 · 21 rules</span>
            </div>
        </motion.div>
    );
}
