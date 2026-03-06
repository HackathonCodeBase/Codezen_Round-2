from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Patient
from rules import run_rules

app = FastAPI(
    title="ClinIQ — Clinical Decision Support System API",
    description="Rule-based CDSS: analyzes patient data and returns structured clinical alerts with risk scoring.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"message": "Clinical Decision Support API running", "version": "2.0.0"}


@app.post("/analyze_patient")
def analyze_patient(patient: Patient):
    alerts, risk_score, risk_level = run_rules(patient)

    # Derive overall status from highest-severity alert
    severities = [a["severity"] for a in alerts]
    if "critical" in severities:
        status = "critical"
    elif "warning" in severities:
        status = "warning"
    elif alerts:
        status = "low"
    else:
        status = "normal"

    return {
        "alerts": alerts,
        "total_alerts": len(alerts),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "status": status,
    }
