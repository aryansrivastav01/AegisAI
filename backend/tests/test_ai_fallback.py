import asyncio
from unittest.mock import AsyncMock

from app.ai.schemas import RiskLevel
from app.services.ai_service import AIService


def test_analyze_returns_fallback_when_provider_raises():
    service = AIService()
    service.provider.generate = AsyncMock(side_effect=RuntimeError("provider down"))

    result = asyncio.run(
        service.analyze(
            {
                "summary": {"overall_risk": "High Risk"},
                "threat_intelligence": {"ips": []},
            }
        )
    )

    assert result.summary
    assert result.overall_risk == RiskLevel.HIGH
    assert result.findings
    assert result.recommendations
