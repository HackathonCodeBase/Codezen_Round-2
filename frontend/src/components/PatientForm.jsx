import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PersonIcon, ShieldAlertIcon, PillIcon,
    DropletIcon, BPIcon, PulseIcon,
} from "../animations/motionIcons";

const EMPTY = {
    age: "", allergies: "", medications: "",
    glucose: "", systolic_bp: "", diastolic_bp: "", heart_rate: "",
};

const DEMO = {
    age: "65",
    allergies: "penicillin",
    medications: "amoxicillin, aspirin, warfarin, metformin",
    glucose: "240",
    systolic_bp: "150",
    diastolic_bp: "95",
    heart_rate: "125",
};

const FIELDS = [
    {
        name: "age", label: "Age", type: "number",
        placeholder: "65", unit: "years",
        Icon: PersonIcon,
        description: "Patient age in full years.",
        range: "Any — risk factors adjust above 60 yrs",
        example: "65",
        span: false,
    },
    {
        name: "allergies", label: "Known Allergies", type: "text",
        placeholder: "penicillin, latex", unit: "CSV",
        Icon: ShieldAlertIcon,
        description: "All documented drug and substance allergies, comma-separated.",
        range: "None documented = lowest risk",
        example: "penicillin, latex",
        span: true,
    },
    {
        name: "medications", label: "Current Medications", type: "text",
        placeholder: "amoxicillin, aspirin, warfarin", unit: "CSV",
        Icon: PillIcon,
        description: "All current prescriptions including OTC drugs, comma-separated.",
        range: "< 5 medications (≥ 5 = polypharmacy risk)",
        example: "amoxicillin, aspirin, warfarin, metformin",
        span: true,
    },
    {
        name: "glucose", label: "Blood Glucose", type: "number",
        placeholder: "95", unit: "mg/dL",
        Icon: DropletIcon,
        description: "Fasting or random blood glucose reading.",
        range: "70 – 140 mg/dL (normal fasting)",
        example: "95",
        span: false,
    },
    {
        name: "systolic_bp", label: "Systolic BP", type: "number",
        placeholder: "120", unit: "mmHg",
        Icon: BPIcon,
        description: "The upper (higher) blood pressure value.",
        range: "< 120 mmHg normal | > 140 hypertensive",
        example: "120", span: false,
    },
    {
        name: "diastolic_bp", label: "Diastolic BP", type: "number",
        placeholder: "80", unit: "mmHg",
        Icon: BPIcon,
        description: "The lower blood pressure value.",
        range: "< 80 mmHg normal | > 90 hypertensive",
        example: "80", span: false,
    },
    {
        name: "heart_rate", label: "Heart Rate", type: "number",
        placeholder: "72", unit: "bpm",
        Icon: PulseIcon,
        description: "Resting heart rate in beats per minute.",
        range: "60 – 100 bpm (normal resting)",
        example: "72", span: false,
    },
];

export default function PatientForm({ onSubmit, loading }) {
    const [form, setForm] = useState(EMPTY);
    const [focused, setFocused] = useState(null);

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            age: parseInt(form.age, 10),
            allergies: form.allergies.split(",").map((s) => s.trim()).filter(Boolean),
            medications: form.medications.split(",").map((s) => s.trim()).filter(Boolean),
            glucose: parseFloat(form.glucose),
            systolic_bp: parseInt(form.systolic_bp, 10),
            diastolic_bp: parseInt(form.diastolic_bp, 10),
            heart_rate: parseInt(form.heart_rate, 10),
        });
    };

    const focusedField = FIELDS.find((f) => f.name === focused);

    return (
        <motion.div
            className="surface rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* ── Card header ── */}
            <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid #1F1F1F", background: "#111111" }}
            >
                <div>
                    <p className="section-label mb-1">Patient Assessment</p>
                    <p style={{ fontSize: "0.78rem", color: "#5A5A5A" }}>
                        Complete all fields for full clinical analysis
                    </p>
                </div>
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setForm(DEMO)}
                    style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "0.3rem 0.85rem",
                        border: "1px solid #2A2A2A",
                        borderRadius: 4,
                        color: "#9A9A9A",
                        background: "transparent",
                        cursor: "pointer",
                        letterSpacing: "0.04em",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8B5E3C"; e.currentTarget.style.color = "#C8A27A"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "#9A9A9A"; }}
                >
                    Load Demo
                </motion.button>
            </div>

            {/* ── Context hint panel ── */}
            <AnimatePresence>
                {focusedField && (
                    <motion.div
                        key={focusedField.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{
                            borderBottom: "1px solid #1F1F1F",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: "#0F0F0F",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                            }}
                        >
                            <div style={{ color: "#8B5E3C", marginTop: 2, flexShrink: 0 }}>
                                <focusedField.Icon size={16} color="#8B5E3C" />
                            </div>
                            <div>
                                <p style={{ fontSize: "0.75rem", color: "#C8A27A", fontWeight: 600, marginBottom: "0.2rem" }}>
                                    {focusedField.label}
                                </p>
                                <p style={{ fontSize: "0.72rem", color: "#9A9A9A", marginBottom: "0.4rem" }}>
                                    {focusedField.description}
                                </p>
                                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.68rem" }}>
                                    <span style={{ color: "#5A5A5A" }}>
                                        Normal range:{" "}
                                        <span style={{ color: "#C8A27A", fontWeight: 500 }}>{focusedField.range}</span>
                                    </span>
                                    <span style={{ color: "#5A5A5A" }}>
                                        Example:{" "}
                                        <span style={{ color: "#F5F5F5", fontFamily: "monospace" }}>{focusedField.example}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Fields ── */}
            <form onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                    {FIELDS.map((f) => (
                        <div
                            key={f.name}
                            style={{ gridColumn: f.span ? "1 / -1" : "auto" }}
                        >
                            {/* Label */}
                            <label
                                htmlFor={f.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    fontSize: "0.68rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#5A5A5A",
                                    marginBottom: "0.5rem",
                                    cursor: "pointer",
                                }}
                            >
                                {f.label}
                                <span
                                    style={{
                                        marginLeft: "auto",
                                        fontSize: "0.62rem",
                                        letterSpacing: "0.03em",
                                        color: "#3A3A3A",
                                        fontWeight: 400,
                                        textTransform: "none",
                                        background: "#161616",
                                        border: "1px solid #2A2A2A",
                                        borderRadius: 3,
                                        padding: "0.1rem 0.4rem",
                                    }}
                                >
                                    {f.unit}
                                </span>
                            </label>

                            {/* Input */}
                            <input
                                id={f.name}
                                name={f.name}
                                type={f.type}
                                value={form[f.name]}
                                onChange={handleChange}
                                onFocus={() => setFocused(f.name)}
                                onBlur={() => setFocused(null)}
                                placeholder={f.placeholder}
                                required
                                min={f.type === "number" ? "0" : undefined}
                                className="clinical-input"
                            />
                        </div>
                    ))}
                </div>

                {/* ── Actions ── */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm(EMPTY)}
                        style={{
                            padding: "0.65rem 1rem",
                            border: "1px solid #2A2A2A",
                            borderRadius: 6,
                            color: "#5A5A5A",
                            background: "transparent",
                            fontSize: "0.83rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "border-color 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3A3A3A"; e.currentTarget.style.color = "#9A9A9A"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "#5A5A5A"; }}
                    >
                        Clear
                    </motion.button>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className="btn-clinical"
                        style={{ flex: 1 }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner" />
                                Analyzing…
                            </>
                        ) : (
                            "Analyze Patient"
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
