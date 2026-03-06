import { motion } from "framer-motion";

const DRAW = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.2, ease: "easeInOut" },
};

// ── Pulse / EKG ─────────────────────────────────────────────
export function PulseIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M2 12 L6 12 L8 6 L11 18 L14 6 L17 12 L22 12"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
                transition={{ duration: 1.4, ease: "easeInOut" }}
            />
        </svg>
    );
}

// ── Droplet / Glucose ────────────────────────────────────────
export function DropletIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M12 2 C12 2 5 10 5 15 A7 7 0 0 0 19 15 C19 10 12 2 12 2 Z"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
            />
        </svg>
    );
}

// ── Shield / Allergy ─────────────────────────────────────────
export function ShieldAlertIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M12 3 L4 7 L4 13 C4 17.4 7.4 21.5 12 22.9 C16.6 21.5 20 17.4 20 13 L20 7 Z"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
            />
            <motion.path
                d="M12 10 L12 13"
                stroke={color} strokeWidth={strokeWidth + 0.5} strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.circle
                cx="12" cy="16" r="0.8"
                fill={color}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 0.3 }}
            />
        </svg>
    );
}

// ── Alert Triangle ───────────────────────────────────────────
export function TriangleAlertIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M10.3 4.1 L2.7 17.5 A2 2 0 0 0 4.4 20.5 L19.6 20.5 A2 2 0 0 0 21.3 17.5 L13.7 4.1 A2 2 0 0 0 10.3 4.1 Z"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
            />
            <motion.path
                d="M12 9.5 L12 13"
                stroke={color} strokeWidth={strokeWidth + 0.5} strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.circle
                cx="12" cy="16.5" r="0.8" fill={color}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 0.3 }}
            />
        </svg>
    );
}

// ── Pill / Medication ────────────────────────────────────────
export function PillIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M7 17 L17 7"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                {...DRAW} transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.rect
                x="3" y="11" width="10" height="10" rx="5" ry="5"
                transform="rotate(-45 8 16)"
                stroke={color} strokeWidth={strokeWidth} fill="none"
                {...DRAW} transition={{ duration: 1.4, ease: "easeInOut" }}
            />
        </svg>
    );
}

// ── Heart / Cardiovascular ───────────────────────────────────
export function HeartIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M12 21 C12 21 3.5 14 3.5 8.5 A5 5 0 0 1 12 5.5 A5 5 0 0 1 20.5 8.5 C20.5 14 12 21 12 21 Z"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
            />
        </svg>
    );
}

// ── Person / Age ─────────────────────────────────────────────
export function PersonIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.circle
                cx="12" cy="7" r="4"
                stroke={color} strokeWidth={strokeWidth}
                {...DRAW} transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
                d="M5 21 C5 17 8 14 12 14 C16 14 19 17 19 21"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                {...DRAW} transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            />
        </svg>
    );
}

// ── Microscope / Metabolic ───────────────────────────────────
export function ScienceIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M8 22 L16 22 M12 22 L12 17 M7 17 L17 17 L15 11 L9 11 Z M9 11 L11 5 M15 11 L13 5 M10 5 L14 5"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW}
            />
        </svg>
    );
}

// ── Blood Pressure cuff ──────────────────────────────────────
export function BPIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M12 2 A10 10 0 0 1 22 12 A10 10 0 0 1 2 12 A10 10 0 0 1 12 2"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="4 2"
                {...DRAW}
            />
            <motion.path
                d="M12 7 L12 12 L16 14"
                stroke={color} strokeWidth={strokeWidth + 0.3} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW} transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            />
        </svg>
    );
}

// ── Activity / Monitoring ────────────────────────────────────
export function ActivityIcon({ size = 20, color = "currentColor", strokeWidth = 1.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.rect
                x="3" y="3" width="18" height="18" rx="3"
                stroke={color} strokeWidth={strokeWidth}
                {...DRAW} transition={{ duration: 0.8 }}
            />
            <motion.path
                d="M8 15 L10 11 L13 16 L15 9 L17 13"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
                {...DRAW} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
            />
        </svg>
    );
}

// ── Map alert type to icon ───────────────────────────────────
export function AlertIcon({ title = "", size = 18, color = "currentColor" }) {
    const t = title.toLowerCase();
    const props = { size, color, strokeWidth: 1.5 };

    if (t.includes("glucose") || t.includes("glycem") || t.includes("diabet"))
        return <DropletIcon {...props} />;
    if (t.includes("allergy") || t.includes("penicillin"))
        return <ShieldAlertIcon {...props} />;
    if (t.includes("medication") || t.includes("polypharmacy") || t.includes("drug"))
        return <PillIcon {...props} />;
    if (t.includes("heart") || t.includes("cardiovascular"))
        return <HeartIcon {...props} />;
    if (t.includes("pulse") || t.includes("tachy") || t.includes("brady") || t.includes("heart rate"))
        return <PulseIcon {...props} />;
    if (t.includes("bp") || t.includes("hypert") || t.includes("hypot") || t.includes("blood pressure"))
        return <BPIcon {...props} />;
    if (t.includes("metabolic") || t.includes("syndrome"))
        return <ScienceIcon {...props} />;
    if (t.includes("dehydration") || t.includes("shock"))
        return <ActivityIcon {...props} />;

    return <TriangleAlertIcon {...props} />;
}
