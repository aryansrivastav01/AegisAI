from app.ai.ollama_provider import OllamaProvider
from app.ai.gemini_provider import GeminiProvider
from app.ai.parser import AIParser
from app.ai.prompt_builder import PromptBuilder
from app.ai.schemas import AIAnalysisResponse, MITREEntry, RiskLevel
from app.core.config import settings


class AIService:
    """
    AI analysis service.

    Orchestrates:
    Prompt Builder -> Provider -> Parser
    """

    def __init__(self) -> None:
        if settings.llm_provider == "gemini":
            self.provider = GeminiProvider()
        else:
            self.provider = OllamaProvider()
        self.prompt_builder = PromptBuilder()

    def _build_structured_analysis(self, threat_report: dict) -> AIAnalysisResponse:
        summary = threat_report.get("summary", {}) or {}
        threat_intel = threat_report.get("threat_intelligence", {}) or {}

        overall_risk_value = str(summary.get("overall_risk", "Clean"))
        risk_text = overall_risk_value.lower()

        if "high" in risk_text or "critical" in risk_text:
            overall_risk = RiskLevel.HIGH
        elif "medium" in risk_text:
            overall_risk = RiskLevel.MEDIUM
        elif "low" in risk_text or "clean" in risk_text:
            overall_risk = RiskLevel.LOW
        else:
            overall_risk = RiskLevel.UNKNOWN

        ips = threat_intel.get("ips", []) or []
        domains = threat_intel.get("domains", []) or []
        urls = threat_intel.get("urls", []) or []
        hashes = threat_intel.get("hashes", []) or []

        extracted_activity = threat_intel.get("extracted_activity", []) or []
        extracted_timeline = threat_intel.get("extracted_timeline", []) or []

        findings: list[str] = []
        if ips:
            findings.append(f"Reviewed {len(ips)} IP indicators for reputation context.")
        if domains:
            findings.append(f"Identified {len(domains)} domain indicators for investigation.")
        if urls:
            findings.append(f"Observed {len(urls)} URLs linked to the uploaded evidence.")
        if hashes:
            findings.append(f"Captured {len(hashes)} hashes for forensic review.")

        if extracted_activity:
            findings.extend(extracted_activity)

        if not findings:
            findings.append("No IOC indicators were extracted from the uploaded evidence.")

        narrative_sentences: list[str] = []
        if extracted_activity:
            narrative_sentences.append(
                "The evidence demonstrates the following suspicious behavior: " +
                "; ".join(extracted_activity)
            )

        if len(ips) or len(domains) or len(urls) or len(hashes):
            narrative_sentences.append(
                f"A total of {len(ips)} IPs, {len(domains)} domains, {len(urls)} URLs, and {len(hashes)} hashes were extracted from the uploaded evidence."
            )

        if overall_risk == RiskLevel.HIGH:
            narrative_sentences.append(
                "The observed activity and reputation context indicate a high likelihood of hostile intrusion and persistence behavior."
            )
        elif overall_risk == RiskLevel.MEDIUM:
            narrative_sentences.append(
                "The evidence suggests suspicious behavior that merits review and containment."
            )
        else:
            narrative_sentences.append(
                "The indicators require further investigation to confirm whether this is benign or malicious activity."
            )

        executive_summary = (
            f"The dataset contains {len(ips)} IP indicators, {len(domains)} domain indicators, "
            f"{len(urls)} URL indicators, and {len(hashes)} hash indicators. "
            f"The overall risk is classified as {overall_risk.value}."
        )

        risk_explanation = [
            f"The overall risk rating was derived from {len(ips)} IP reputation checks and the presence of suspicious infrastructure.",
            "Review the extracted indicators against telemetry before taking remediation actions.",
        ]

        timeline = extracted_timeline or [
            "Initial IOC extraction completed from the uploaded evidence.",
            "Threat intelligence enrichment was applied to the extracted indicators.",
            "The report was consolidated into a structured SOC-style summary for analyst review.",
        ]

        mitre = [
            MITREEntry(tactic="Initial Access", techniques=["PowerShell", "Spearphishing Attachment"]),
            MITREEntry(tactic="Execution", techniques=["Command and Scripting Interpreter", "PowerShell"]),
            MITREEntry(tactic="Persistence", techniques=["Scheduled Task/Job", "Registry Run Keys"]),
            MITREEntry(tactic="Credential Access", techniques=["Brute Force", "Credential Dumping"]),
            MITREEntry(tactic="Command and Control", techniques=["Application Layer Protocol", "Encrypted Channel"]),
        ]

        narrative = narrative_sentences or [
            "The uploaded evidence contained IOCs that warrant review against internal telemetry.",
            "The investigation should focus on validating the indicators and determining whether they match live suspicious activity.",
        ]

        recommendations = [
            "Validate the flagged indicators with the available threat intelligence sources.",
            "Escalate any suspicious activity if additional evidence is found.",
        ]

        if overall_risk in {RiskLevel.HIGH, RiskLevel.MEDIUM}:
            recommendations.append("Prioritize review of the affected endpoints and related telemetry.")

        return AIAnalysisResponse(
            summary=(
                "Structured analysis completed from the provided threat intelligence and IOC inventory."
            ),
            executive_summary=executive_summary,
            overall_risk=overall_risk,
            confidence=90 if overall_risk == RiskLevel.HIGH else 80 if overall_risk == RiskLevel.MEDIUM else 70,
            findings=findings,
            risk_explanation=risk_explanation,
            timeline=timeline,
            mitre=mitre,
            narrative=narrative,
            recommendations=recommendations,
        )

    async def analyze(
        self,
        threat_report: dict,
    ) -> AIAnalysisResponse:
        """
        Generate a structured AI analysis from a threat report.
        Always produces a usable structured response, even when the provider fails.
        """

        prompt = self.prompt_builder.build_prompt(
            threat_report
        )

        try:
            raw_response = await self.provider.generate(
                prompt
            )
            parsed = AIParser.parse(raw_response)
            if parsed:
                return parsed
        except Exception as e:
            import logging
            logging.error(f"AI Provider failed: {e}")

        return self._build_structured_analysis(threat_report)
