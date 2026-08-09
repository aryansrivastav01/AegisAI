from enum import Enum

from pydantic import BaseModel, Field


class MITREEntry(BaseModel):
    tactic: str
    techniques: list[str] = Field(default_factory=list)


class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"
    UNKNOWN = "Unknown"

    @classmethod
    def normalize(cls, value: str) -> "RiskLevel":
        if not isinstance(value, str):
            return cls.UNKNOWN

        normalized = value.strip().lower()

        if normalized in {"low", "low risk", "clean"}:
            return cls.LOW

        if normalized in {"medium", "medium risk"}:
            return cls.MEDIUM

        if normalized in {"high", "high risk"}:
            return cls.HIGH

        if normalized in {"critical", "critical risk"}:
            return cls.CRITICAL

        return cls.UNKNOWN


class AIAnalysisResponse(BaseModel):
    """
    Structured AI response returned by the AI service.
    """

    summary: str
    executive_summary: str = Field(default="")
    overall_risk: RiskLevel
    confidence: int = Field(
        ge=0,
        le=100,
        description="Confidence score between 0 and 100.",
    )
    findings: list[str] = Field(default_factory=list)
    risk_explanation: list[str] = Field(default_factory=list)
    timeline: list[str] = Field(default_factory=list)
    mitre: list[MITREEntry] = Field(default_factory=list)
    narrative: list[str] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
