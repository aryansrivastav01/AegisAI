import json


class PromptBuilder:
    """
    Builds prompts for the AI Security Analyst.
    """

    SYSTEM_PROMPT = """
You are AegisAI, an experienced Tier-2 SOC Analyst.

Rules:
- Analyze ONLY the provided threat intelligence.
- Never invent indicators.
- Never assume an attack without evidence.
- Base every conclusion on the supplied data.
- Keep recommendations practical.
- Return ONLY valid JSON.
"""

    OUTPUT_FORMAT = """
Return JSON using exactly this schema:

{
    "summary": "string",
    "overall_risk": "Low | Medium | High | Critical | Unknown",
    "confidence": 0,
    "findings": [
        "string"
    ],
    "recommendations": [
        "string"
    ]
}
"""

    def build_prompt(self, report: dict) -> str:
        """
        Build the complete AI prompt.
        """

        report_json = json.dumps(
            report,
            indent=2,
            ensure_ascii=False,
        )

        return f"""
{self.SYSTEM_PROMPT}

Threat Intelligence Report

{report_json}

{self.OUTPUT_FORMAT}
"""
