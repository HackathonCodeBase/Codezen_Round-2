const RISK_CONFIG = {
    LOW: {
        label: "Low Risk",
        color: "text-emerald-400",
        border: "border-emerald-500/40",
        bg: "bg-emerald-900/15",
        bar: "bg-emerald-500",
        glow: "shadow-emerald-500/20",
        icon: "🟢",
        description: "Patient presents no immediate clinical concerns.",
    },
    MODERATE: {
        label: "Moderate Risk",
        color: "text-amber-400",
        border: "border-amber-500/40",
        bg: "bg-amber-900/15",
        bar: "bg-amber-500",
        glow: "shadow-amber-500/20",
        icon: "🟡",
        description: "One or more risk factors detected. Clinical review recommended.",
    },
    HIGH: {
        label: "High Risk",
        color: "text-red-400",
        border: "border-red-500/40",
        bg: "bg-red-900/15",
        bar: "bg-red-500",
        glow: "shadow-red-500/20",
        icon: "🔴",
        description: "Multiple serious risk factors present. Immediate clinical attention required.",
    },
};

const MAX_SCORE = 12; // reference ceiling for progress bar

export default function RiskScoreCard({ riskScore, riskLevel }) {
    const cfg = RISK_CONFIG[riskLevel] || RISK_CONFIG.LOW;
    const pct = Math.min(100, Math.round((riskScore / MAX_SCORE) * 100));

    return (
        <div
            className={`glass-card rounded-2xl overflow-hidden border ${cfg.border} shadow-lg ${cfg.glow}`}
        >
            <div className={`px-6 py-5 ${cfg.bg}`}>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Left — score info */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl
                            bg-black/30 border border-white/10 flex-shrink-0">
                            <span className="text-3xl font-extrabold leading-none text-white">
                                {riskScore}
                            </span>
                            <span className="text-[0.6rem] text-slate-500 uppercase font-semibold mt-0.5">
                                score
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{cfg.icon}</span>
                                <span className={`text-lg font-extrabold ${cfg.color}`}>
                                    {cfg.label}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 max-w-xs">{cfg.description}</p>
                        </div>
                    </div>

                    {/* Right — badge */}
                    <div
                        className={`flex-shrink-0 px-5 py-2 rounded-full border font-bold text-sm
                        ${cfg.border} ${cfg.color} bg-black/20`}
                    >
                        Overall Risk: {riskLevel}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                    <div className="flex justify-between text-[0.68rem] text-slate-500 mb-1.5">
                        <span>Risk Score Progress</span>
                        <span>{riskScore} / {MAX_SCORE}+</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-black/30 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[0.62rem] text-slate-600 mt-1">
                        <span>0–2 Low</span>
                        <span>3–5 Moderate</span>
                        <span>6+ High</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
