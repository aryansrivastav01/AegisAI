from app.core.config import settings
from app.utils.http_client import HTTPClient


class AbuseIPDBProvider:
    """
    AbuseIPDB Threat Intelligence Provider.
    """

    BASE_URL = "https://api.abuseipdb.com/api/v2"

    def __init__(self):
        self.client = HTTPClient()

        self.api_key = settings.abuseipdb_api_key

        self.headers = {
            "Key": self.api_key,
            "Accept": "application/json",
        }

    @staticmethod
    def _calculate_reputation(score: int) -> str:
        """
        Convert AbuseIPDB score into a readable reputation.
        """

        if score == 0:
            return "Clean"

        if score < 25:
            return "Low Risk"

        if score < 60:
            return "Medium Risk"

        return "High Risk"

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup an IP address in AbuseIPDB.
        """

        url = f"{self.BASE_URL}/check"

        params = {
            "ipAddress": ip,
            "maxAgeInDays": 90,
        }

        response = await self.client.get(
            url=url,
            headers=self.headers,
            params=params,
        )

        if response.status_code != 200:
            return {
                "success": False,
                "provider": "AbuseIPDB",
                "ioc": ip,
                "reputation": Reputation.UNKNOWN,
                "confidence": 0,
                "error": response.text,
            }

        payload = response.json()["data"]

        score = payload["abuseConfidenceScore"]

        return {
            "success": True,
            "provider": "AbuseIPDB",
            "ioc": payload["ipAddress"],
            "reputation": self._calculate_reputation(score),
            "confidence": score,
            "country": payload.get("countryCode"),
            "isp": payload.get("isp"),
            "domain": payload.get("domain"),
            "hostnames": payload.get("hostnames", []),
            "usage_type": payload.get("usageType"),
            "is_tor": payload.get("isTor"),
            "is_whitelisted": payload.get("isWhitelisted"),
            "total_reports": payload.get("totalReports"),
            "distinct_reporters": payload.get("numDistinctUsers"),
            "last_reported": payload.get("lastReportedAt"),
        }
