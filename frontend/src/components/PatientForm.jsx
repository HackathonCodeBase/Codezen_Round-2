import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "age", label: "Age", type: "number", placeholder: "65", hint: "Patient age in years", range: "Any", unit: "yrs", span: false },
    { name: "allergies", label: "Allergies", type: "text", placeholder: "penicillin, latex", hint: "Comma-separated allergy list", range: "None = low risk", unit: "CSV", span: true },
    { name: "medications", label: "Medications", type: "text", placeholder: "aspirin, metformin", hint: "All current prescriptions", range: "< 5 preferred", unit: "CSV", span: true },
    { name: "glucose", label: "Blood Glucose", type: "number", placeholder: "95", hint: "Fasting or random reading", range: "70–140 mg/dL", unit: "mg/dL", span: false },
    { name: "systolic_bp", label: "Systolic BP", type: "number", placeholder: "120", hint: "Upper blood pressure value", range: "< 120 mmHg", unit: "mmHg", span: false },
    { name: "diastolic_bp", label: "Diastolic BP", type: "number", placeholder: "80", hint: "Lower blood pressure value", range: "< 80 mmHg", unit: "mmHg", span: false },
    { name: "heart_rate", label: "Heart Rate", type: "number", placeholder: "72", hint: "Resting beats per minute", range: "60–100 bpm", unit: "bpm", span: false },
];

export default function PatientForm({ onSubmit, loading }) {
    const [form, setForm] = useState(EMPTY);
    const [focused, setFocused] = useState(null);

    const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const submit = (e) => {
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
            className="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Card header */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #F3F4F6",
            }}>
                <div>
                    <p className="section-label">Patient Assessment</p>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.2rem" }}>
                        Complete all fields for clinical analysis
                    </p>
                </div>
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setForm(DEMO)}
                    className="btn-ghost"
                    style={{ fontSize: "0.75rem", padding: "0.28rem 0.7rem" }}
                >
                    Load Demo
                </motion.button>
            </div>

            {/* Focus hint strip */}
            <AnimatePresence>
                {focusedField && (
                    <motion.div
                        key={focusedField.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden", borderBottom: "1px solid #F3F4F6" }}
                    >
                        <div style={{
                            padding: "0.55rem 1.25rem",
                            background: "#FFFBF5",
                            display: "flex", gap: "1.25rem",
                        }}>
                            <span style={{ fontSize: "0.72rem", color: "#6B7280" }}>{focusedField.hint}</span>
                            <span style={{ fontSize: "0.72rem", color: "#8B5E3C", fontWeight: 600 }}>
                                Normal: {focusedField.range}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fields */}
            <form onSubmit={submit} style={{ padding: "1.25rem" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "0.85rem", marginBottom: "1.25rem",
                }}>
                    {FIELDS.map((f) => (
                        <div key={f.name} style={{ gridColumn: f.span ? "1 / -1" : "auto" }}>
                            <label htmlFor={f.name} style={{
                                display: "flex", alignItems: "center",
                                fontSize: "0.7rem", fontWeight: 600,
                                letterSpacing: "0.07em", textTransform: "uppercase",
                                color: "#6B7280", marginBottom: "0.4rem",
                            }}>
                                {f.label}
                                <span style={{
                                    marginLeft: "auto",
                                    fontSize: "0.62rem", fontWeight: 400,
                                    letterSpacing: "0.03em", textTransform: "none",
                                    color: "#9CA3AF",
                                    background: "#F9FAFB",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 3,
                                    padding: "0.1rem 0.4rem",
                                }}>
                                    {f.unit}
                                </span>
                            </label>
                            <input
                                id={f.name} name={f.name} type={f.type}
                                value={form[f.name]}
                                onChange={change}
                                onFocus={() => setFocused(f.name)}
                                onBlur={() => setFocused(null)}
                                placeholder={f.placeholder}
                                required
                                min={f.type === "number" ? "0" : undefined}
                                className="field-input"
                            />
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "0.6rem" }}>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setForm(EMPTY)}
                        className="btn-ghost"
                    >
                        Clear
                    </motion.button>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className="btn-primary"
                        style={{ flex: 1 }}
                    >
                        {loading ? <><span className="spinner" /> Analyzing…</> : "Analyze Patient"}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
