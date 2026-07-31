import httpx

from app.core.config import settings


class VirusTotalProvider:
    """
    VirusTotal API Provider
    """

    BASE_URL = "https://www.virustotal.com/api/v3"

    def __init__(self):
        self.api_key = settings.virustotal_api_key

        self.headers = {
            "x-apikey": self.api_key
        }

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup an IP address in VirusTotal.
        """

        url = f"{self.BASE_URL}/ip_addresses/{ip}"

        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers=self.headers,
                timeout=15,
            )

        if response.status_code != 200:
            return {
                "success": False,
                "provider": "VirusTotal",
                "ioc": ip,
                "error": response.text,
            }

        return {
            "success": True,
            "provider": "VirusTotal",
            "ioc": ip,
            "data": response.json(),
        }
