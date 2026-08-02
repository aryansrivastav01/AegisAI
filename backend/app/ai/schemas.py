from enum import Enum

from pydantic import BaseModel, Field


class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"
    UNKNOWN = "Unknown"


class AIAnalysisResponse(BaseModel):
    """
    Structured AI response returned by the AI service.
    """

    summary: str

    overall_risk: RiskLevel

    confidence: int = Field(
        ge=0,
        le=100,
        description="Confidence score between 0 and 100.",
    )

    findings: list[str] = Field(default_factory=list)

    recommendations: list[str] = Field(default_factory=list)
