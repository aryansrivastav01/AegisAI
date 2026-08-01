from typing import Any

from pydantic import BaseModel, Field

from app.schemas.threat import ThreatIntelResponse


class IOCSummary(BaseModel):
    ips: list[str] = Field(default_factory=list)
    domains: list[str] = Field(default_factory=list)
    urls: list[str] = Field(default_factory=list)
    hashes: list[str] = Field(default_factory=list)


class UploadResponse(BaseModel):
    message: str
    uploaded_data: dict[str, Any]
    iocs: IOCSummary
    threat_intelligence: ThreatIntelResponse
