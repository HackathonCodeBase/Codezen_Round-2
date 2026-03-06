import { motion } from "framer-motion";

export default function Header() {
    return (
        <header style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid #E5E7EB",
        }}>
            <div style={{
                maxWidth: "86rem", margin: "0 auto", padding: "0 1.5rem",
                height: 58, display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>

                {/* Brand */}
                <motion.div
                    style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div style={{
                        width: 30, height: 30,
                        border: "1.5px solid #8B5E3C", borderRadius: 6,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M2 12 L6 12 L8 6 L11 18 L14 6 L17 12 L22 12"
                                stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div style={{ borderLeft: "1px solid #E5E7EB", paddingLeft: "0.85rem" }}>
                        <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1 }}>
                            ClinIQ
                        </p>
                        <p style={{ fontSize: "0.62rem", color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 500, marginTop: "0.2rem" }}>
                            Clinical Decision Support System
                        </p>
                    </div>
                </motion.div>

                {/* Right */}
                <motion.div
                    style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    </div>
                    <div style={{ width: 1, height: 18, background: "#E5E7EB" }} />

                </motion.div>
            </div>
        </header>
    );
}
