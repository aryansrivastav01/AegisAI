import asyncio

from app.services.ai_service import AIService


def test_rich_analysis_payload_contains_structured_sections():
    threat_report = {
        "summary": {
            "overall_risk": "High Risk",
            "total_ips": 16,
            "total_domains": 2,
            "total_urls": 1,
            "total_hashes": 1,
        },
        "threat_intelligence": {
            "ips": [
                {
                    "ioc": "8.8.8.8",
                    "overall_reputation": "High Risk",
                }
            ],
            "domains": [{"ioc": "mal.example.com", "overall_reputation": "High Risk"}],
            "urls": [{"ioc": "https://mal.example.com/step", "overall_reputation": "High Risk"}],
            "hashes": [{"ioc": "abc123", "overall_reputation": "High Risk"}],
        },
    }

    ai = AIService()
    result = asyncio.run(ai.analyze(threat_report))

    assert result.summary
    assert result.executive_summary
    assert result.risk_explanation
    assert result.timeline
    assert result.mitre
    assert result.narrative
    assert result.recommendations


async def main():
    threat_report = {
        "summary": {
            "overall_risk": "Clean",
            "total_ips": 2,
            "total_domains": 0,
            "total_urls": 0,
            "total_hashes": 0,
        },
        "threat_intelligence": {
            "ips": [
                {
                    "ioc": "8.8.8.8",
                    "overall_reputation": "Clean",
                },
                {
                    "ioc": "1.1.1.1",
                    "overall_reputation": "Clean",
                },
            ],
            "domains": [],
            "urls": [],
            "hashes": [],
        },
    }

    ai = AIService()

    result = await ai.analyze(threat_report)

    print("\n" + "=" * 80)
    print(result.model_dump_json(indent=4))
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(main())
