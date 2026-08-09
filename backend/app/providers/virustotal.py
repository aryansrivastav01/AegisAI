from app.core.config import settings
from app.utils.http_client import HTTPClient


class VirusTotalProvider:
    """
    VirusTotal Threat Intelligence Provider.
    """

    BASE_URL = "https://www.virustotal.com/api/v3"

    def __init__(self):
        self.client = HTTPClient()

        self.api_key = settings.virustotal_api_key

        self.headers = {
            "x-apikey": self.api_key
        }

    @staticmethod
    def _calculate_reputation(stats: dict) -> tuple[str, int]:
        """
        Calculate reputation using VirusTotal analysis stats.
        """

        malicious = stats.get("malicious", 0)
        suspicious = stats.get("suspicious", 0)

        confidence = malicious + suspicious

        if confidence == 0:
            return "Clean", confidence

        if confidence < 5:
            return "Low Risk", confidence

        if confidence < 15:
            return "Medium Risk", confidence

        return "High Risk", confidence

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup an IP address in VirusTotal.
        """

        url = f"{self.BASE_URL}/ip_addresses/{ip}"

        response = await self.client.get(
            url=url,
            headers=self.headers,
        )

        if response.status_code != 200:
            return {
                "success": False,
                "provider": "VirusTotal",
                "ioc": ip,
                "reputation": Reputation.UNKNOWN,
                "confidence": 0,
                "error": response.text,
            }

        payload = response.json()["data"]["attributes"]

        stats = payload.get("last_analysis_stats", {})

        reputation, confidence = self._calculate_reputation(stats)

        return {
            "success": True,
            "provider": "VirusTotal",
            "ioc": ip,
            "reputation": reputation,
            "confidence": confidence,
            "country": payload.get("country"),
            "asn": payload.get("asn"),
            "network": payload.get("network"),
            "analysis_stats": stats,
            "last_analysis_date": payload.get("last_analysis_date"),
        }
