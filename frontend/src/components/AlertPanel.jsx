import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertIcon } from "../animations/motionIcons";

// ── Severity config — no emojis ──────────────────────────────
const SEV = {
    critical: {
        tag: "#C84444",
        tagBg: "rgba(200,68,68,0.1)",
        tagBdr: "rgba(200,68,68,0.25)",
        card: "#1A0A0A",
        border: "rgba(200,68,68,0.18)",
        accentL: "#C84444",
        detail: "rgba(200,68,68,0.06)",
        detailB: "rgba(200,68,68,0.12)",
        label: "CRITICAL",
    },
    warning: {
        tag: "#C8A27A",
        tagBg: "rgba(139,94,60,0.12)",
        tagBdr: "rgba(139,94,60,0.3)",
        card: "#130E09",
        border: "rgba(139,94,60,0.2)",
        accentL: "#8B5E3C",
        detail: "rgba(139,94,60,0.06)",
        detailB: "rgba(139,94,60,0.12)",
        label: "WARNING",
    },
    low: {
        tag: "#9A9A9A",
        tagBg: "rgba(90,90,90,0.1)",
        tagBdr: "rgba(90,90,90,0.2)",
        card: "#0E0E0E",
        border: "rgba(90,90,90,0.18)",
        accentL: "#5A5A5A",
        detail: "rgba(60,60,60,0.08)",
        detailB: "rgba(60,60,60,0.15)",
        label: "LOW RISK",
    },
};

const STATUS_CFG = {
    normal: {
        label: "No Alerts",
        sub: "Patient data within normal parameters.",
        color: "#4A7C59",
        border: "rgba(74,124,89,0.3)",
        bg: "rgba(74,124,89,0.06)",
    },
    low: {
        label: "Low Risk Notices",
        sub: "Informational notices. No immediate action required.",
        color: "#9A9A9A",
        border: "rgba(90,90,90,0.3)",
        bg: "rgba(60,60,60,0.06)",
    },
    warning: {
        label: "Clinical Warnings",
        sub: "One or more conditions require clinical review.",
        color: "#C8A27A",
        border: "rgba(139,94,60,0.3)",
        bg: "rgba(139,94,60,0.06)",
    },
    critical: {
        label: "Critical Alerts",
        sub: "Immediate clinical attention required.",
        color: "#C84444",
        border: "rgba(200,68,68,0.3)",
        bg: "rgba(200,68,68,0.06)",
    },
};

// ── Individual alert card (expandable) ──────────────────────
function AlertCard({ alert, index }) {
    const [open, setOpen] = useState(false);
    const s = SEV[alert.severity] || SEV.low;

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.06,
            }}
            style={{
                background: s.card,
                border: `1px solid ${s.border}`,
                borderLeft: `2px solid ${s.accentL}`,
                borderRadius: 8,
                overflow: "hidden",
            }}
        >
            {/* ── Header row ── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.9rem 1rem",
                    cursor: "pointer",
                }}
                onClick={() => setOpen((p) => !p)}
            >
                {/* Icon */}
                <div
                    style={{
                        flexShrink: 0,
                        width: 32, height: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: `1px solid ${s.border}`,
                        borderRadius: 6,
                        color: s.accentL,
                    }}
                >
                    <AlertIcon title={alert.title} size={16} color={s.accentL} />
                </div>

                {/* Title + tag */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#F5F5F5" }}>
                            {alert.title}
                        </span>
                        <span
                            style={{
                                fontSize: "0.58rem",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                padding: "0.15rem 0.5rem",
                                borderRadius: 3,
                                color: s.tag,
                                background: s.tagBg,
                                border: `1px solid ${s.tagBdr}`,
                            }}
                        >
                            {s.label}
                        </span>
                    </div>
                </div>

                {/* Toggle */}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: "0.65rem", color: "#5A5A5A", flexShrink: 0 }}
                >
                    ▾
                </motion.span>
            </div>

            {/* ── Explanation (always visible) ── */}
            <div style={{ padding: "0 1rem 0.85rem 1rem" }}>
                <p style={{ fontSize: "0.75rem", color: "#9A9A9A", lineHeight: 1.65 }}>
                    {alert.explanation}
                </p>
            </div>

            {/* ── Expanded detail ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        {/* Detected + Normal row */}
                        {(alert.detected_value || alert.normal_range) && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "0.5rem",
                                    padding: "0 1rem",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {alert.detected_value && (
                                    <div
                                        style={{
                                            background: s.detail,
                                            border: `1px solid ${s.detailB}`,
                                            borderRadius: 5,
                                            padding: "0.6rem 0.75rem",
                                        }}
                                    >
                                        <p style={{ fontSize: "0.6rem", color: "#5A5A5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                                            Detected Value
                                        </p>
                                        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F5F5F5" }}>
                                            {alert.detected_value}
                                        </p>
                                    </div>
                                )}
                                {alert.normal_range && (
                                    <div
                                        style={{
                                            background: "rgba(74,124,89,0.06)",
                                            border: "1px solid rgba(74,124,89,0.15)",
                                            borderRadius: 5,
                                            padding: "0.6rem 0.75rem",
                                        }}
                                    >
                                        <p style={{ fontSize: "0.6rem", color: "#5A5A5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                                            Normal Range
                                        </p>
                                        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4A7C59" }}>
                                            {alert.normal_range}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Recommended action */}
                        <div
                            style={{
                                margin: "0 1rem 1rem",
                                padding: "0.7rem 0.85rem",
                                background: "rgba(74,124,89,0.05)",
                                border: "1px solid rgba(74,124,89,0.12)",
                                borderRadius: 5,
                            }}
                        >
                            <p style={{ fontSize: "0.6rem", color: "#4A7C59", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.35rem" }}>
                                Recommended Action
                            </p>
                            <p style={{ fontSize: "0.74rem", color: "#9A9A9A", lineHeight: 1.65 }}>
                                {alert.recommendation}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── Main AlertPanel ──────────────────────────────────────────
export default function AlertPanel({ result, error }) {

    /* Empty state */
    if (!result && !error) {
        return (
            <motion.div
                className="surface rounded-lg"
                style={{ minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 2rem", gap: "1rem" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
                <div style={{ width: 48, height: 48, border: "1px solid #2A2A2A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#3A3A3A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 12 L10.5 14.5 L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#F5F5F5" }}>
                    No Analysis Yet
                </p>
                <p style={{ fontSize: "0.78rem", color: "#5A5A5A", maxWidth: 260, lineHeight: 1.7 }}>
                    Complete patient data and click{" "}
                    <span style={{ color: "#C8A27A" }}>Analyze Patient</span>{" "}
                    to generate clinical alerts.
                </p>
                {/* Feature list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem", alignItems: "flex-start" }}>
                    {["Drug allergy conflicts", "Drug–drug interactions", "Vital sign abnormalities", "Glucose & metabolic risk scoring", "17 active clinical rules"].map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: "#3A3A3A" }}>
                            <span style={{ color: "#4A7C59", fontWeight: 700 }}>—</span> {f}
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    /* Error state */
    if (error) {
        return (
            <motion.div
                className="surface rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div style={{ padding: "1.25rem 1.5rem", borderLeft: "2px solid #C84444", background: "rgba(200,68,68,0.05)" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#C84444", marginBottom: "0.35rem" }}>
                        Connection Error
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#9A9A9A", lineHeight: 1.65 }}>{error}</p>
                </div>
            </motion.div>
        );
    }

    const { alerts, total_alerts, status } = result;
    const cfg = STATUS_CFG[status] || STATUS_CFG.normal;

    /* Sort: critical → warning → low */
    const ordered = [
        ...alerts.filter((a) => a.severity === "critical"),
        ...alerts.filter((a) => a.severity === "warning"),
        ...alerts.filter((a) => a.severity === "low"),
    ];

    return (
        <motion.div
            className="surface rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* ── Status header ── */}
            <div
                style={{
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    borderBottom: "1px solid #1F1F1F",
                    background: cfg.bg,
                    borderLeft: `2px solid ${cfg.color}`,
                }}
            >
                <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: cfg.color, marginBottom: "0.15rem" }}>
                        {cfg.label}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#5A5A5A" }}>
                        {cfg.sub} Click any alert to expand.
                    </p>
                </div>
                <div
                    style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        padding: "0.4rem 0.85rem",
                        border: "1px solid #2A2A2A",
                        borderRadius: 6, flexShrink: 0,
                    }}
                >
                    <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F5F5F5", lineHeight: 1 }}>
                        {total_alerts}
                    </span>
                    <span style={{ fontSize: "0.58rem", color: "#5A5A5A", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
                        alerts
                    </span>
                </div>
            </div>

            {/* ── Alert list ── */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {ordered.length === 0 ? (
                    <p style={{ fontSize: "0.8rem", color: "#4A7C59", padding: "2rem 0", textAlign: "center" }}>
                        Patient data within normal parameters. No clinical concerns detected.
                    </p>
                ) : (
                    ordered.map((alert, idx) => (
                        <AlertCard key={idx} alert={alert} index={idx} />
                    ))
                )}
            </div>

            {/* ── Footer ── */}
            <div
                style={{
                    padding: "0.7rem 1.25rem",
                    borderTop: "1px solid #1F1F1F",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
            >
                <span style={{ fontSize: "0.67rem", color: "#3A3A3A" }}>
                    Analyzed {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}
                </span>
                <span style={{ fontSize: "0.65rem", color: "#3A3A3A" }}>
                    ClinIQ v2.0 — 17 Rules Active
                </span>
            </div>
        </motion.div>
    );
}
