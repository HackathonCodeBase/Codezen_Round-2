from pydantic import BaseModel
from typing import List, Optional


class Patient(BaseModel):
    age: int
    allergies: List[str]
    medications: List[str]
    glucose: float
    systolic_bp: int
    diastolic_bp: int
    heart_rate: int


class Alert(BaseModel):
    title: str
    severity: str          # "critical" | "warning" | "low"
    explanation: str
    recommendation: str
    icon: str
    detected_value: Optional[str] = None
    normal_range: Optional[str] = None


class AnalysisResponse(BaseModel):
    alerts: List[Alert]
    total_alerts: int
    risk_score: int
    risk_level: str        # "LOW" | "MODERATE" | "HIGH"
    status: str            # "normal" | "warning" | "critical"
