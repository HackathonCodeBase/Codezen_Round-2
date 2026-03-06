# ClinIQ — Clinical Decision Support System

A rule-based Clinical Decision Support System that analyzes patient data and returns structured clinical alerts with predictive risk scoring.

---

## Stack

**Frontend** — React 19, Vite 7, Tailwind CSS v4, Framer Motion  
**Backend** — FastAPI, Python 3.10+, Uvicorn

---

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000` — API docs at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## API

**`GET /`** — Health check

**`POST /analyze_patient`** — Analyze patient data

```json
// Request
{
  "age": 65,
  "allergies": ["penicillin"],
  "medications": ["amoxicillin", "aspirin", "warfarin", "metformin"],
  "glucose": 240,
  "systolic_bp": 150,
  "diastolic_bp": 95,
  "heart_rate": 125
}

// Response
{
  "alerts": [...],
  "total_alerts": 6,
  "risk_score": 9,
  "risk_level": "HIGH",
  "status": "critical"
}
```

---

## Clinical Rules — 21 Active

| Category | Rules |
|---|---|
| **Vital Signs** | Tachycardia, Bradycardia, Stage 1 & 2 Hypertension, Hypotension, Elevated BP, Elevated Pulse Pressure, Shock Pattern |
| **Metabolic** | Severe Hyperglycemia, Hyperglycemia, Hypoglycemia, Pre-Diabetes, Metabolic Syndrome |
| **Medication Safety** | Allergy Conflicts, 6 Drug Interactions, Polypharmacy, Elderly Polypharmacy (Beers), Renal Risk (Metformin) |
| **Risk Indicators** | Age-based Cardiovascular Risk, High-Risk Medication Monitoring |

### Risk Scoring

| Score | Level |
|---|---|
| 0 – 2 | LOW |
| 3 – 5 | MODERATE |
| 6+ | HIGH |

---

## Features

- Clean light-theme dashboard with two-column layout
- 7-field patient assessment form with inline clinical hints
- Expandable alert cards — detected value, normal range, recommended action
- Animated risk score card with progress indicator
- One-click demo patient for instant testing

---

## Demo Patient

Click **Load Demo** in the form to auto-fill a high-risk profile:

| Field | Value |
|---|---|
| Age | 65 yrs |
| Allergies | penicillin |
| Medications | amoxicillin, aspirin, warfarin, metformin |
| Blood Glucose | 240 mg/dL |
| Blood Pressure | 150 / 95 mmHg |
| Heart Rate | 125 bpm |

Expected: **6+ alerts · HIGH risk**

---

*Codezen Round 2 — Clinical AI Track*
