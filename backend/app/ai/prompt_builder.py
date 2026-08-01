class PromptBuilder:
    """
    Builds prompts for the AI Security Analyst.
    """

    def build_prompt(self, report: dict) -> str:

        summary = report.get("summary", {})

        overall_risk = summary.get("overall_risk", "Unknown")

        total_ips = summary.get("total_ips", 0)
        total_domains = summary.get("total_domains", 0)
        total_urls = summary.get("total_urls", 0)
        total_hashes = summary.get("total_hashes", 0)

        return f"""
You are a senior SOC Analyst.

Analyze the following threat intelligence report.

Overall Risk:
{overall_risk}

Detected Indicators

IPs: {total_ips}
Domains: {total_domains}
URLs: {total_urls}
Hashes: {total_hashes}

Threat Intelligence

{report.get("threat_intelligence")}

Instructions

1. Summarize the findings.
2. Explain the security impact.
3. Mention suspicious indicators if present.
4. Provide remediation steps.
5. Give a confidence level.
6. Do not invent information.
7. Base your answer only on the supplied report.

Return markdown.
"""

