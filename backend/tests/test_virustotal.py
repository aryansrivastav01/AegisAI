import asyncio

from app.providers.virustotal import VirusTotalProvider


async def main():
    provider = VirusTotalProvider()

    result = await provider.lookup_ip("8.8.8.8")

    print(result)


if __name__ == "__main__":
    asyncio.run(main())
