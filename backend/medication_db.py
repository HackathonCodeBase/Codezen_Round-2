# Medication knowledge base — known risks and drug interaction pairs

MEDICATION_RISKS = {
    "aspirin": {
        "risk": "GI bleeding & antiplatelet effect",
        "category": "NSAID / Antiplatelet",
        "notes": "Inhibits platelet aggregation. Bleeding risk rises sharply with anticoagulants.",
    },
    "warfarin": {
        "risk": "Severe bleeding",
        "category": "Anticoagulant (Vitamin K antagonist)",
        "notes": "Narrow therapeutic index. Extensive food/drug interactions. Requires INR monitoring.",
    },
    "metformin": {
        "risk": "Lactic acidosis",
        "category": "Biguanide antidiabetic",
        "notes": "Contraindicated in severe renal impairment (eGFR < 30). Hold before contrast imaging.",
    },
    "amoxicillin": {
        "risk": "Penicillin cross-allergy",
        "category": "Beta-lactam antibiotic",
        "notes": "Cross-reactive with penicillin allergy in 1–10 % of patients.",
    },
    "lisinopril": {
        "risk": "Hyperkalemia, angioedema",
        "category": "ACE Inhibitor",
        "notes": "Monitor potassium. Contraindicated in pregnancy.",
    },
    "ibuprofen": {
        "risk": "GI bleeding, renal impairment",
        "category": "NSAID",
        "notes": "Avoid with anticoagulants. Can worsen HF and hypertension.",
    },
    "digoxin": {
        "risk": "Narrow therapeutic index — toxicity",
        "category": "Cardiac glycoside",
        "notes": "Toxicity risk with hypokalemia. Multiple drug interactions.",
    },
    "clopidogrel": {
        "risk": "Bleeding",
        "category": "Antiplatelet",
        "notes": "Dual antiplatelet therapy with aspirin increases bleeding risk significantly.",
    },
    "atorvastatin": {
        "risk": "Myopathy, rhabdomyolysis",
        "category": "Statin",
        "notes": "Monitor liver function. CYP3A4 interactions.",
    },
    "insulin": {
        "risk": "Hypoglycemia",
        "category": "Antidiabetic",
        "notes": "Hypoglycemia can be life-threatening. Ensure correct dosing and patient education.",
    },
    "codeine": {
        "risk": "Respiratory depression, dependence",
        "category": "Opioid analgesic",
        "notes": "CYP2D6 ultra-rapid metabolisers at risk of toxicity.",
    },
    "amlodipine": {
        "risk": "Peripheral oedema, hypotension",
        "category": "Calcium channel blocker",
        "notes": "Grapefruit interaction. Additive hypotension with other antihypertensives.",
    },
}

# Pairs of drugs with known dangerous interactions
DRUG_INTERACTIONS = [
    {
        "drugs": ["warfarin", "aspirin"],
        "severity": "critical",
        "risk": "Severe haemorrhage",
        "explanation": (
            "Warfarin (anticoagulant) combined with aspirin's antiplatelet effect "
            "dramatically elevates the risk of serious internal and GI bleeding."
        ),
        "recommendation": (
            "Avoid this combination if clinically possible. If required, closely monitor INR, "
            "add proton-pump inhibitor, and educate patient on bleeding warning signs."
        ),
    },
    {
        "drugs": ["warfarin", "ibuprofen"],
        "severity": "critical",
        "risk": "Severe haemorrhage",
        "explanation": (
            "Ibuprofen inhibits platelet function and may displace warfarin from protein binding, "
            "amplifying anticoagulant effect. GI bleeding risk is very high."
        ),
        "recommendation": (
            "Avoid combination. Substitute with paracetamol for analgesia where possible. "
            "If necessary, reduce warfarin dose and perform frequent INR monitoring."
        ),
    },
    {
        "drugs": ["aspirin", "ibuprofen"],
        "severity": "warning",
        "risk": "Reduced cardioprotection, GI bleeding",
        "explanation": (
            "Ibuprofen may competitively antagonise aspirin's cardioprotective platelet inhibition "
            "and compounds GI mucosal injury risk."
        ),
        "recommendation": (
            "Take aspirin ≥ 30 minutes before ibuprofen. Prefer paracetamol for pain relief. "
            "Add PPI if both must be continued."
        ),
    },
    {
        "drugs": ["metformin", "ibuprofen"],
        "severity": "warning",
        "risk": "Renal impairment → lactic acidosis",
        "explanation": (
            "NSAIDs reduce renal blood flow, elevating metformin plasma concentration "
            "and increasing the risk of lactic acidosis, particularly in elderly patients."
        ),
        "recommendation": (
            "Avoid regular NSAID use. Monitor renal function (eGFR) if co-administration "
            "is unavoidable."
        ),
    },
    {
        "drugs": ["clopidogrel", "aspirin"],
        "severity": "warning",
        "risk": "Increased bleeding",
        "explanation": (
            "Dual antiplatelet therapy substantially increases haemorrhagic risk, "
            "though it may be clinically indicated after acute coronary syndrome or PCI."
        ),
        "recommendation": (
            "Confirm dual therapy is clinically justified (e.g., post-stent). "
            "Add gastroprotection with a PPI."
        ),
    },
    {
        "drugs": ["metformin", "warfarin"],
        "severity": "warning",
        "risk": "Enhanced anticoagulant effect",
        "explanation": (
            "Some studies suggest metformin may potentiate warfarin's anticoagulant effect, "
            "increasing bleeding risk."
        ),
        "recommendation": "Monitor INR more frequently when starting or adjusting metformin.",
    },
]
