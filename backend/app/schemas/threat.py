from typing import Any

from pydantic import BaseModel, Field

from app.schemas.common import IOCType, Reputation


class ProviderResult(BaseModel):
    provider: str
    ioc: str
    reputation: Reputation
    confidence: int
    success: bool
    metadata: dict[str, Any] = Field(default_factory=dict)


class ThreatResult(BaseModel):
    ioc: str
    type: IOCType
    overall_reputation: Reputation
    providers: list[ProviderResult] = Field(default_factory=list)


class ThreatIntelResponse(BaseModel):
    ips: list[ThreatResult] = Field(default_factory=list)
    domains: list[ThreatResult] = Field(default_factory=list)
    urls: list[ThreatResult] = Field(default_factory=list)
    hashes: list[ThreatResult] = Field(default_factory=list)
