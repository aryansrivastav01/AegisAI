import asyncio

from app.services.ai_service import AIService


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
