import { motion } from "framer-motion";
import { ActivityIcon } from "../animations/motionIcons";

export default function Header() {
    return (
        <header
            className="sticky top-0 z-50 border-b"
            style={{
                background: "rgba(11,11,11,0.95)",
                backdropFilter: "blur(20px)",
                borderColor: "#2A2A2A",
            }}
        >
            <div
                className="max-w-7xl mx-auto px-6"
                style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                {/* ── Brand ── */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Animated logo mark */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: 32, height: 32,
                            border: "1px solid #8B5E3C",
                            borderRadius: 6,
                            color: "#C8A27A",
                        }}
                    >
                        <ActivityIcon size={16} color="#C8A27A" />
                    </div>

                    {/* Wordmark */}
                    <div
                        style={{
                            borderLeft: "1px solid #2A2A2A",
                            paddingLeft: "1rem",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                color: "#F5F5F5",
                                letterSpacing: "-0.02em",
                                lineHeight: 1,
                                marginBottom: "0.2rem",
                            }}
                        >
                            ClinIQ
                        </p>
                        <p
                            style={{
                                fontSize: "0.65rem",
                                color: "#5A5A5A",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                            }}
                        >
                            Clinical Decision Support System
                        </p>
                    </div>
                </motion.div>

                {/* ── Right side ── */}
                <motion.div
                    className="flex items-center gap-5"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                    {/* System status */}
                    <div className="flex items-center gap-2">
                        <div className="status-live" />
                        <span style={{ fontSize: "0.72rem", color: "#4A7C59", fontWeight: 500, letterSpacing: "0.04em" }}>
                            System Online
                        </span>
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, height: 20, background: "#2A2A2A" }} />

                    {/* Doctor label */}
                    <div
                        style={{
                            fontSize: "0.72rem",
                            color: "#9A9A9A",
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            padding: "0.3rem 0.8rem",
                            border: "1px solid #2A2A2A",
                            borderRadius: 4,
                        }}
                    >
                        Doctor Dashboard
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
