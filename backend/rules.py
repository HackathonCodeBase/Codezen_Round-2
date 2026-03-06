from models import Patient
from medication_db import MEDICATION_RISKS, DRUG_INTERACTIONS
from typing import List, Dict, Tuple


# ─────────────────────────────────────────────────────────────
# Helper — build a structured alert dict
# ─────────────────────────────────────────────────────────────
def _alert(
    title: str,
    severity: str,
    explanation: str,
    recommendation: str,
    icon: str = "⚠️",
    detected_value: str = None,
    normal_range: str = None,
) -> Dict:
    a = {
        "title": title,
        "severity": severity,
        "explanation": explanation,
        "recommendation": recommendation,
        "icon": icon,
    }
    if detected_value:
        a["detected_value"] = detected_value
    if normal_range:
        a["normal_range"] = normal_range
    return a


# ─────────────────────────────────────────────────────────────
# Main rule engine
# Returns: (alerts, risk_score, risk_level)
# ─────────────────────────────────────────────────────────────
def run_rules(patient: Patient) -> Tuple[List[Dict], int, str]:
    alerts: List[Dict] = []
    risk_score: int = 0

    allergies_lower = [a.lower().strip() for a in patient.allergies]
    medications_lower = [m.lower().strip() for m in patient.medications]

    # ══════════════════════════════════════════
    # RULE 1 — Penicillin Allergy + Amoxicillin
    # ══════════════════════════════════════════
    if "penicillin" in allergies_lower and "amoxicillin" in medications_lower:
        alerts.append(_alert(
            title="Drug Allergy Conflict — Penicillin / Amoxicillin",
            severity="critical",
            explanation=(
                "The patient has a documented penicillin allergy but is currently "
                "prescribed amoxicillin, a penicillin-class beta-lactam antibiotic. "
                "Cross-reactivity can trigger anaphylaxis, urticaria, or angioedema."
            ),
            recommendation=(
                "Discontinue amoxicillin immediately. Consider azithromycin, "
                "clindamycin, or doxycycline as alternatives depending on the indication. "
                "Consult an allergist before re-prescribing any beta-lactam."
            ),
            icon="🚨",
            detected_value="Amoxicillin prescribed despite penicillin allergy",
            normal_range="No contraindicated medications should be prescribed",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 2 — Severe Hyperglycemia (> 300)
    # ══════════════════════════════════════════
    if patient.glucose > 300:
        alerts.append(_alert(
            title="Severe Hyperglycemia",
            severity="critical",
            explanation=(
                f"Blood glucose is critically elevated at {patient.glucose} mg/dL. "
                "This level is consistent with diabetic ketoacidosis (DKA) or "
                "hyperosmolar hyperglycaemic state (HHS) — both are life-threatening emergencies."
            ),
            recommendation=(
                "Emergency management required: IV insulin drip, aggressive fluid replacement, "
                "electrolyte monitoring (especially potassium). Order blood gases and urine ketones."
            ),
            icon="🚨",
            detected_value=f"{patient.glucose} mg/dL",
            normal_range="70–140 mg/dL (fasting)",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 3 — Hyperglycemia (200–300)
    # ══════════════════════════════════════════
    elif 200 < patient.glucose <= 300:
        alerts.append(_alert(
            title="Hyperglycemia",
            severity="warning",
            explanation=(
                f"Blood glucose ({patient.glucose} mg/dL) exceeds the normal range. "
                "Sustained hyperglycaemia damages blood vessels, kidneys, nerves, and eyes."
            ),
            recommendation=(
                "Review and adjust antidiabetic therapy (insulin dose or oral agents). "
                "Recheck glucose in 2–4 hours. Order HbA1c to assess long-term control."
            ),
            icon="🩸",
            detected_value=f"{patient.glucose} mg/dL",
            normal_range="70–140 mg/dL (fasting)",
        ))
        risk_score += 2

    # ══════════════════════════════════════════
    # RULE 4 — Hypoglycemia (< 70)
    # ══════════════════════════════════════════
    if patient.glucose < 70:
        alerts.append(_alert(
            title="Hypoglycemia",
            severity="critical",
            explanation=(
                f"Blood glucose is dangerously low at {patient.glucose} mg/dL. "
                "Severe hypoglycaemia can cause loss of consciousness, seizures, "
                "cardiac arrhythmias, and irreversible brain injury."
            ),
            recommendation=(
                "If conscious: 15–20 g fast-acting carbohydrate (glucose gel, juice). "
                "Recheck in 15 min. If unconscious: 1 mg IM glucagon or IV dextrose 50 mL of 50%. "
                "Review and reduce insulin / sulfonylurea doses."
            ),
            icon="🚨",
            detected_value=f"{patient.glucose} mg/dL",
            normal_range="70–140 mg/dL",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 5 — Pre-Diabetes (100–125)
    # ══════════════════════════════════════════
    if 100 <= patient.glucose <= 125:
        alerts.append(_alert(
            title="Pre-Diabetes Indicator",
            severity="low",
            explanation=(
                f"Blood glucose ({patient.glucose} mg/dL) falls in the pre-diabetic range. "
                "Without intervention, progression to Type 2 diabetes is probable within 5–10 years."
            ),
            recommendation=(
                "Order fasting plasma glucose and HbA1c. Recommend structured lifestyle "
                "intervention: Mediterranean diet, 150 min/week aerobic activity, weight loss ≥ 5 % if overweight."
            ),
            icon="🩸",
            detected_value=f"{patient.glucose} mg/dL",
            normal_range="Fasting <100 mg/dL (normal) | 100–125 (pre-diabetic) | >126 (diabetic)",
        ))

    # ══════════════════════════════════════════
    # RULE 6 — Stage 2 Hypertension (> 160/100)
    # ══════════════════════════════════════════
    if patient.systolic_bp > 160 or patient.diastolic_bp > 100:
        alerts.append(_alert(
            title="Stage 2 Hypertension",
            severity="critical",
            explanation=(
                f"Blood pressure ({patient.systolic_bp}/{patient.diastolic_bp} mmHg) is severely elevated. "
                "This dramatically increases risk of stroke, myocardial infarction, hypertensive encephalopathy, "
                "and kidney damage."
            ),
            recommendation=(
                "Initiate or intensify combination antihypertensive therapy. "
                "Consider ACE inhibitor + calcium channel blocker (e.g., ramipril + amlodipine). "
                "Urgent review; may require IV labetalol if hypertensive crisis."
            ),
            icon="💓",
            detected_value=f"{patient.systolic_bp}/{patient.diastolic_bp} mmHg",
            normal_range="<120/80 mmHg (optimal) | >160/100 (Stage 2)",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 7 — Stage 1 Hypertension (140–160 / 90–100)
    # ══════════════════════════════════════════
    elif patient.systolic_bp > 140 or patient.diastolic_bp > 90:
        alerts.append(_alert(
            title="Hypertension (Stage 1)",
            severity="warning",
            explanation=(
                f"Blood pressure ({patient.systolic_bp}/{patient.diastolic_bp} mmHg) is above the normal threshold. "
                "Untreated stage 1 hypertension doubles the risk of cardiovascular events over 10 years."
            ),
            recommendation=(
                "Lifestyle modifications: DASH diet, sodium <2 g/day, regular aerobic exercise, "
                "limit alcohol. Consider initiating antihypertensive pharmacotherapy if lifestyle "
                "changes insufficient after 3 months."
            ),
            icon="💓",
            detected_value=f"{patient.systolic_bp}/{patient.diastolic_bp} mmHg",
            normal_range="<120/80 mmHg (optimal) | 140/90 (Stage 1 threshold)",
        ))
        risk_score += 2

    # ══════════════════════════════════════════
    # RULE 8 — Hypotension (systolic < 90)
    # ══════════════════════════════════════════
    if patient.systolic_bp < 90:
        alerts.append(_alert(
            title="Hypotension",
            severity="critical",
            explanation=(
                f"Systolic blood pressure ({patient.systolic_bp} mmHg) is critically low. "
                "This may indicate hypovolaemic shock, septic shock, anaphylaxis, "
                "or severe cardiac dysfunction."
            ),
            recommendation=(
                "Urgent assessment. Position patient supine with legs elevated. "
                "IV fluid challenge (250–500 mL crystalloid). Identify and treat underlying cause. "
                "Vasopressors may be required."
            ),
            icon="🚨",
            detected_value=f"{patient.systolic_bp}/{patient.diastolic_bp} mmHg",
            normal_range="Systolic 90–120 mmHg",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 9 — Severe Tachycardia (> 150 bpm)
    # ══════════════════════════════════════════
    if patient.heart_rate > 150:
        alerts.append(_alert(
            title="Severe Tachycardia",
            severity="critical",
            explanation=(
                f"Heart rate ({patient.heart_rate} bpm) is critically elevated. "
                "May indicate supraventricular tachycardia (SVT), atrial fibrillation with rapid ventricular "
                "response, or haemodynamic instability. Risk of myocardial ischaemia."
            ),
            recommendation=(
                "Urgent 12-lead ECG. Identify rhythm. Vagal manoeuvres or IV adenosine for SVT. "
                "Rate control with beta-blocker or CCB for AF. Synchronised cardioversion if unstable."
            ),
            icon="⚡",
            detected_value=f"{patient.heart_rate} bpm",
            normal_range="60–100 bpm",
        ))
        risk_score += 3

    # ══════════════════════════════════════════
    # RULE 10 — Tachycardia (100–150 bpm)
    # ══════════════════════════════════════════
    elif patient.heart_rate > 100:
        alerts.append(_alert(
            title="Tachycardia",
            severity="warning",
            explanation=(
                f"Heart rate ({patient.heart_rate} bpm) is above the normal resting range. "
                "Common causes include fever, anxiety, dehydration, anaemia, pain, "
                "hyperthyroidism, or underlying cardiac pathology."
            ),
            recommendation=(
                "12-lead ECG. Investigate underlying cause: check temperature, hydration status, "
                "full blood count, thyroid function tests. Treat root cause."
            ),
            icon="⚡",
            detected_value=f"{patient.heart_rate} bpm",
            normal_range="60–100 bpm",
        ))
        risk_score += 1

    # ══════════════════════════════════════════
    # RULE 11 — Bradycardia (< 50 bpm)
    # ══════════════════════════════════════════
    if patient.heart_rate < 50:
        alerts.append(_alert(
            title="Bradycardia",
            severity="warning",
            explanation=(
                f"Heart rate ({patient.heart_rate} bpm) is abnormally low. "
                "Causes include heart block, sick sinus syndrome, hypothyroidism, "
                "or medication side effects (beta-blockers, digoxin)."
            ),
            recommendation=(
                "12-lead ECG to identify conduction abnormality. Review medications. "
                "Thyroid function tests. Cardiology referral if symptomatic (syncope, presyncope, dyspnoea)."
            ),
            icon="💓",
            detected_value=f"{patient.heart_rate} bpm",
            normal_range="60–100 bpm",
        ))
        risk_score += 1

    # ══════════════════════════════════════════
    # RULE 12 — Dehydration / Shock Pattern
    # ══════════════════════════════════════════
    if patient.heart_rate > 100 and patient.systolic_bp < 100:
        alerts.append(_alert(
            title="Possible Dehydration / Early Shock",
            severity="critical",
            explanation=(
                f"Combined elevated heart rate ({patient.heart_rate} bpm) and low systolic BP "
                f"({patient.systolic_bp} mmHg) is a classic haemodynamic pattern consistent with "
                "significant dehydration or early shock state."
            ),
            recommendation=(
                "IV fluid resuscitation (500 mL crystalloid bolus). Monitor urine output hourly. "
                "Blood cultures if infection is suspected. Reassess haemodynamics every 15 minutes."
            ),
            icon="🚨",
            detected_value=f"HR {patient.heart_rate} bpm | SBP {patient.systolic_bp} mmHg",
            normal_range="HR 60–100 bpm | SBP >100 mmHg",
        ))
        risk_score += 2

    # ══════════════════════════════════════════
    # RULE 13 — Drug Interactions (from medication_db)
    # ══════════════════════════════════════════
    for interaction in DRUG_INTERACTIONS:
        pair = interaction["drugs"]
        if all(d in medications_lower for d in pair):
            sev = interaction["severity"]
            icon_map = {"critical": "🚨", "warning": "💊", "low": "ℹ️"}
            alerts.append(_alert(
                title=f"Drug Interaction: {pair[0].title()} + {pair[1].title()}",
                severity=sev,
                explanation=interaction["explanation"],
                recommendation=interaction["recommendation"],
                icon=icon_map.get(sev, "💊"),
                detected_value=f"{pair[0].title()} + {pair[1].title()} co-prescribed",
                normal_range="These medications should not normally be combined",
            ))
            risk_score += 2 if sev == "critical" else 1

    # ══════════════════════════════════════════
    # RULE 14 — Polypharmacy (≥ 5 medications)
    # ══════════════════════════════════════════
    if len(patient.medications) >= 5:
        alerts.append(_alert(
            title="Polypharmacy Risk",
            severity="warning",
            explanation=(
                f"The patient is taking {len(patient.medications)} medications. "
                "Polypharmacy (≥ 5 drugs) significantly increases the probability of "
                "adverse drug reactions, drug-drug interactions, and medication errors."
            ),
            recommendation=(
                "Conduct a structured medication review (e.g., STOPP/START criteria). "
                "Aim to deprescribe any medications where the risk-benefit ratio is unfavourable. "
                "Engage clinical pharmacist for interaction screening."
            ),
            icon="💊",
            detected_value=f"{len(patient.medications)} concurrent medications",
            normal_range="< 5 medications considered low-risk threshold",
        ))
        risk_score += 1

    # ══════════════════════════════════════════
    # RULE 15 — Age-Based Cardiovascular Risk
    # ══════════════════════════════════════════
    if patient.age > 60:
        risk_score += 2
        if patient.systolic_bp > 130 or patient.glucose > 150:
            alerts.append(_alert(
                title="Elevated Cardiovascular Risk (Age + Metabolic)",
                severity="warning",
                explanation=(
                    f"Patient age ({patient.age} yr) combined with elevated blood pressure "
                    f"({patient.systolic_bp}/{patient.diastolic_bp} mmHg) and/or glucose "
                    f"({patient.glucose} mg/dL) places this patient in a high cardiovascular risk category."
                ),
                recommendation=(
                    "Calculate 10-year CV risk using QRISK3 or ACC/AHA Pooled Cohort Equations. "
                    "Consider statin therapy (atorvastatin 20 mg) if 10-yr risk ≥ 10 %. "
                    "Aspirin prophylaxis only if established CVD. Lifestyle counselling."
                ),
                icon="❤️",
                detected_value=(
                    f"Age {patient.age} yr | BP {patient.systolic_bp}/{patient.diastolic_bp} mmHg "
                    f"| Glucose {patient.glucose} mg/dL"
                ),
            ))

    # ══════════════════════════════════════════
    # RULE 16 — Metabolic Syndrome Indicators
    # ══════════════════════════════════════════
    metabolic_flags = sum([
        patient.glucose > 100,
        patient.systolic_bp > 130 or patient.diastolic_bp > 85,
        patient.heart_rate > 90,
    ])
    if metabolic_flags >= 2:
        alerts.append(_alert(
            title="Metabolic Syndrome Indicators",
            severity="low",
            explanation=(
                "Multiple metabolic risk factors are co-present. Metabolic syndrome "
                "is associated with a 2× increased risk of cardiovascular disease and "
                "a 5× increased risk of developing Type 2 diabetes."
            ),
            recommendation=(
                "Full metabolic panel: lipid profile, fasting glucose, HbA1c, eGFR, liver enzymes. "
                "Structured lifestyle intervention is first-line treatment. "
                "Weight management target: ≥ 5 % body weight loss."
            ),
            icon="🔬",
            detected_value=f"{metabolic_flags}/3 metabolic criteria met",
            normal_range="0 criteria met (optimal)",
        ))

    # ══════════════════════════════════════════
    # RULE 17 — High-Risk Medication Overview
    # ══════════════════════════════════════════
    flagged_meds = []
    for med in medications_lower:
        if med in MEDICATION_RISKS:
            info = MEDICATION_RISKS[med]
            flagged_meds.append(f"{med.title()} [{info['risk']}]")

    if flagged_meds:
        alerts.append(_alert(
            title="High-Risk Medication(s) Requiring Monitoring",
            severity="low",
            explanation=(
                "The following prescribed medications carry known risks that require "
                f"active monitoring: {', '.join(flagged_meds)}."
            ),
            recommendation=(
                "Ensure appropriate monitoring protocols are in place for each high-risk drug. "
                "Patient education on warning signs (e.g., bleeding, hypoglycaemia) is essential. "
                "Document informed consent for high-risk medications."
            ),
            icon="💊",
            detected_value=", ".join(flagged_meds),
        ))

    # ══════════════════════════════════════════
    # COMPUTE RISK LEVEL
    # ══════════════════════════════════════════
    if risk_score >= 6:
        risk_level = "HIGH"
    elif risk_score >= 3:
        risk_level = "MODERATE"
    else:
        risk_level = "LOW"

    return alerts, risk_score, risk_level
