from app.providers.abuseipdb import AbuseIPDBProvider
from app.providers.virustotal import VirusTotalProvider


class ThreatIntelService:
    """
    Threat Intelligence Service
    """

    def __init__(self):
        self.virustotal = VirusTotalProvider()
        self.abuseipdb = AbuseIPDBProvider()

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup an IP address across all providers.
        """

        results = []

        vt_result = await self.virustotal.lookup_ip(ip)
        results.append(vt_result)

        abuse_result = await self.abuseipdb.lookup_ip(ip)
        results.append(abuse_result)

        return {
            "ioc": ip,
            "type": "ip",
            "providers": results,
        }
