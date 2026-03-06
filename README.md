# ClinIQ — Clinical Decision Support System

> A rule-based Clinical Decision Support System (CDSS) for hackathon demonstration.  
> Analyzes patient data in real-time and returns structured clinical alerts with predictive risk scoring.

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | React 19 + Vite 7           |
| Styling  | Tailwind CSS v4             |
| Motion   | Framer Motion               |
| Backend  | FastAPI + Python 3.10+      |
| Server   | Uvicorn (ASGI)              |
| HTTP     | Axios                       |

---

## Project Structure

```
Codezen_Round-2/
├── backend/
│   ├── main.py            # FastAPI app + CORS + endpoints
│   ├── models.py          # Pydantic request/response models
│   ├── rules.py           # 21-rule clinical engine
│   ├── medication_db.py   # Drug risk database + interaction pairs
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── animations/
    │   │   └── motionIcons.jsx   # Animated SVG icon set
    │   ├── components/
    │   │   ├── Header.jsx        # App header
    │   │   ├── PatientForm.jsx   # Patient data input form
    │   │   ├── AlertPanel.jsx    # Clinical alerts display
    │   │   └── RiskSummary.jsx   # Risk score card
    │   ├── App.jsx
    │   ├── api.js                # Axios API client
    │   ├── index.css             # Global styles + Tailwind theme
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HackathonCodeBase/Codezen_Round-2.git
cd Codezen_Round-2
```

---

### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**

API docs available at: **http://localhost:8000/docs**

---

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173** (or 5174 if 5173 is in use)

---

## API Reference

### `GET /`
Health check.

**Response:**
```json
{ "message": "Clinical Decision Support API running", "version": "2.0.0" }
```

---

### `POST /analyze_patient`
Analyze patient data and return clinical alerts.

**Request Body:**
```json
{
  "age": 65,
  "allergies": ["penicillin"],
  "medications": ["amoxicillin", "aspirin", "warfarin", "metformin"],
  "glucose": 240,
  "systolic_bp": 150,
  "diastolic_bp": 95,
  "heart_rate": 125
}
```

**Response:**
```json
{
  "alerts": [
    {
      "title": "Drug Allergy Conflict — Penicillin / Amoxicillin",
      "severity": "critical",
      "explanation": "Patient has a documented penicillin allergy but is prescribed amoxicillin...",
      "recommendation": "Discontinue amoxicillin. Consider azithromycin or clindamycin.",
      "detected_value": "Amoxicillin prescribed with penicillin allergy",
      "normal_range": "No contraindicated medications"
    }
  ],
  "total_alerts": 6,
  "risk_score": 9,
  "risk_level": "HIGH",
  "status": "critical"
}
```

---

## Clinical Rule Engine

The system applies **21 clinical rules** across 4 categories:

### Vital Signs
| Rule | Condition | Severity |
|------|-----------|----------|
| Severe Tachycardia | Heart rate > 150 bpm | Critical |
| Tachycardia | Heart rate > 100 bpm | Warning |
| Bradycardia | Heart rate < 50 bpm | Warning |
| Stage 2 Hypertension | SBP > 160 or DBP > 100 | Critical |
| Stage 1 Hypertension | SBP > 140 or DBP > 90 | Warning |
| Elevated BP | SBP 120–140 or DBP 80–90 | Low |
| Hypotension | SBP < 90 | Critical |
| Elevated Pulse Pressure | SBP − DBP > 60 mmHg | Low |
| Possible Shock / Dehydration | HR > 100 + SBP < 100 | Critical |

### Metabolic Conditions
| Rule | Condition | Severity |
|------|-----------|----------|
| Severe Hyperglycemia | Glucose > 300 mg/dL | Critical |
| Hyperglycemia | Glucose 200–300 mg/dL | Warning |
| Hypoglycemia | Glucose < 70 mg/dL | Critical |
| Pre-Diabetes | Glucose 100–125 mg/dL | Low |
| Metabolic Syndrome | 2+ metabolic criteria | Low |

### Medication Safety
| Rule | Condition | Severity |
|------|-----------|----------|
| Allergy Conflict | Penicillin allergy + amoxicillin | Critical |
| Drug Interactions | 6 known dangerous pairs | Critical/Warning |
| Polypharmacy | ≥ 5 concurrent medications | Warning |
| Elderly Polypharmacy (Beers) | Age > 70 + ≥ 3 medications | Warning |
| Renal Risk — Metformin | Age > 75 + metformin use | Warning |
| High-Risk Medication Monitor | Known high-risk drugs flagged | Low |

### Risk Indicators
| Rule | Condition | Severity |
|------|-----------|----------|
| Age-Based CV Risk | Age > 60 + elevated BP/glucose | Warning |

---

## Risk Scoring

| Points | Trigger |
|--------|---------|
| +3 | Allergy conflict, severe glucose, stage 2 hypertension, hypotension |
| +2 | Age > 60, hyperglycemia, stage 1 hypertension, drug interaction, dehydration |
| +1 | Tachycardia, polypharmacy, elderly polypharmacy, renal risk |

| Score | Risk Level |
|-------|-----------|
| 0–2   | LOW        |
| 3–5   | MODERATE   |
| 6+    | HIGH       |

---

## UI Features

- **Light minimal design** — clean Apple-style healthcare dashboard
- **Patient Assessment Form** — 7 fields with inline hints and normal ranges
- **Clinical Alert Cards** — expandable cards showing detected value, normal range, and recommended action
- **Risk Summary Card** — animated score display with progress bar
- **Framer Motion animations** — subtle fade-in, slide-in, and scale transitions
- **Demo mode** — pre-fills form with a high-risk patient profile

---

## CORS Configuration

Backend allows requests from:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`

---

## Requirements

**Backend** (`backend/requirements.txt`)
```
fastapi
uvicorn
pydantic
```

**Frontend** (`frontend/package.json` dependencies)
```
react, react-dom
vite, @vitejs/plugin-react
tailwindcss, @tailwindcss/vite
framer-motion
axios
```

---

## Demo Patient

Click **Load Demo** in the form to auto-fill:

| Field | Value |
|-------|-------|
| Age | 65 years |
| Allergies | penicillin |
| Medications | amoxicillin, aspirin, warfarin, metformin |
| Blood Glucose | 240 mg/dL |
| Blood Pressure | 150/95 mmHg |
| Heart Rate | 125 bpm |

Expected output: **6+ alerts · HIGH risk score**

---

*Built for Codezen Round 2 Hackathon — Clinical AI Track*
