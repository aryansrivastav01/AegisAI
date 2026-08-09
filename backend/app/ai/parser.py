import json
import re

from pydantic import ValidationError

from app.ai.schemas import AIAnalysisResponse, RiskLevel


class AIParser:
    """
    Parses and validates raw LLM responses.
    """

    @staticmethod
    def _extract_json(response: str) -> str:
        """
        Extract JSON from a raw LLM response.
        """

        response = response.strip()

        # Remove Markdown code fences if present
        response = re.sub(
            r"^```(?:json)?\s*",
            "",
            response,
            flags=re.IGNORECASE,
        )

        response = re.sub(
            r"\s*```$",
            "",
            response,
        )

        # Extract first JSON object
        match = re.search(
            r"\{.*\}",
            response,
            flags=re.DOTALL,
        )

        if not match:
            raise ValueError(
                "No JSON object found in AI response."
            )

        return match.group(0)

    @classmethod
    def parse(
        cls,
        response: str,
    ) -> AIAnalysisResponse:
        """
        Parse, validate and return a structured AI response.
        """

        try:
            json_text = cls._extract_json(response)

            data = json.loads(json_text)

            if isinstance(data, dict):
                risk_value = data.get("overall_risk")

                if isinstance(risk_value, str):
                    data["overall_risk"] = RiskLevel.normalize(risk_value).value

            return AIAnalysisResponse.model_validate(data)

        except json.JSONDecodeError as exc:
            raise ValueError(
                "Invalid JSON returned by AI."
            ) from exc

        except ValidationError as exc:
            raise ValueError(
                "AI response does not match the required schema."
            ) from exc
