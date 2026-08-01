import asyncio

from app.services.threat_intel import ThreatIntelService


async def main():

    service = ThreatIntelService()

    sample_iocs = {
        "ips": [
            "8.8.8.8",
            "1.1.1.1"
        ],
        "domains": [],
        "urls": [],
        "hashes": [],
    }

    result = await service.analyze_iocs(sample_iocs)

    print(result)


if __name__ == "__main__":
    asyncio.run(main())
