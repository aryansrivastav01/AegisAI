import asyncio

from app.services.ai_service import AIService


sample_report = {
    "summary": {
        "overall_risk": "Low",
        "total_ips": 2,
        "total_domains": 1,
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
        ]
    },
}


async def main():

    ai = AIService()

    response = await ai.analyze(
        sample_report
    )

    print()

    print("=" * 60)

    print(response)

    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
