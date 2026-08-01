import asyncio

from app.providers.abuseipdb import AbuseIPDBProvider


async def main():
    provider = AbuseIPDBProvider()

    result = await provider.lookup_ip("8.8.8.8")

    print(result)


if __name__ == "__main__":
    asyncio.run(main())
