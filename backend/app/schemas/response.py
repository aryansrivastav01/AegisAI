from typing import Any

from pydantic import BaseModel

from app.ai.schemas import AIAnalysisResponse
from app.schemas.upload import IOCSummary


class AnalysisSummary(BaseModel):
    overall_risk: str
    total_ips: int
    total_domains: int
    total_urls: int
    total_hashes: int


class UploadResponse(BaseModel):
    """
    Response returned by the upload endpoint.
    """

    message: str

    uploaded_data: dict[str, Any]

    iocs: IOCSummary

    summary: AnalysisSummary

    threat_intelligence: dict[str, Any]

    ai_analysis: AIAnalysisResponse
