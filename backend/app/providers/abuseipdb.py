import httpx

from app.core.config import settings


class AbuseIPDBProvider:
    """
    AbuseIPDB API Provider
    """

    BASE_URL = "https://api.abuseipdb.com/api/v2"

    def __init__(self):
        self.api_key = settings.abuseipdb_api_key

        self.headers = {
            "Key": self.api_key,
            "Accept": "application/json",
        }

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup an IP address in AbuseIPDB.
        """

        url = f"{self.BASE_URL}/check"

        params = {
            "ipAddress": ip,
            "maxAgeInDays": 90,
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers=self.headers,
                params=params,
                timeout=15,
            )

        if response.status_code != 200:
            return {
                "success": False,
                "provider": "AbuseIPDB",
                "ioc": ip,
                "error": response.text,
            }

        return {
            "success": True,
            "provider": "AbuseIPDB",
            "ioc": ip,
            "data": response.json(),
        }
