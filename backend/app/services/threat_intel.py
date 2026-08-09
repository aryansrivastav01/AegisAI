import asyncio

from app.providers.abuseipdb import AbuseIPDBProvider
from app.providers.virustotal import VirusTotalProvider
from app.schemas.common import Reputation


class ThreatIntelService:
    """
    Aggregates threat intelligence from multiple providers.
    """

    def __init__(self):
        self.virustotal = VirusTotalProvider()
        self.abuseipdb = AbuseIPDBProvider()

    async def lookup_ip(self, ip: str) -> dict:
        """
        Lookup a single IP across all providers.
        """

        vt_task = self.virustotal.lookup_ip(ip)
        abuse_task = self.abuseipdb.lookup_ip(ip)

        vt_result, abuse_result = await asyncio.gather(
            vt_task,
            abuse_task,
        )

        reputations = [
            vt_result.get("reputation"),
            abuse_result.get("reputation"),
        ]

        if Reputation.HIGH_RISK.value in reputations:
            overall = Reputation.HIGH_RISK.value

        elif Reputation.MEDIUM_RISK.value in reputations:
            overall = Reputation.MEDIUM_RISK.value

        elif Reputation.LOW_RISK.value in reputations:
            overall = Reputation.LOW_RISK.value

        elif Reputation.CLEAN.value in reputations:
            overall = Reputation.CLEAN.value

        else:
            overall = Reputation.UNKNOWN.value

        return {
            "ioc": ip,
            "type": "ip",
            "overall_reputation": overall,
            "providers": [
                vt_result,
                abuse_result,
            ],
        }

    async def analyze_iocs(self, iocs: dict) -> dict:
        """
        Analyze all extracted IOCs.
        """

        results = {
            "ips": [],
            "domains": [],
            "urls": [],
            "hashes": [],
        }

        ip_tasks = [
            self.lookup_ip(ip)
            for ip in iocs.get("ips", [])
        ]

        if ip_tasks:
            results["ips"] = await asyncio.gather(*ip_tasks)

        return results
