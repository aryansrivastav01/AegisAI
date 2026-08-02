from app.ai.ollama_provider import OllamaProvider
from app.ai.parser import AIParser
from app.ai.prompt_builder import PromptBuilder


class AIService:
    """
    AI analysis service.

    Orchestrates:
    Prompt Builder -> Ollama -> Parser
    """

    def __init__(self) -> None:
        self.provider = OllamaProvider()
        self.prompt_builder = PromptBuilder()

    async def analyze(
        self,
        threat_report: dict,
    ):
        """
        Generate a structured AI analysis from a threat report.
        """

        prompt = self.prompt_builder.build_prompt(
            threat_report
        )

        raw_response = await self.provider.generate(
            prompt
        )

        return AIParser.parse(raw_response)
