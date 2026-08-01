from app.ai.ollama_provider import OllamaProvider
from app.ai.openai_provider import OpenAIProvider
from app.ai.prompt_builder import PromptBuilder
from app.core.config import settings


class AIService:
    """
    AI analysis service.
    """

    def __init__(self):

        provider = settings.llm_provider.lower()

        if provider == "ollama":
            self.provider = OllamaProvider()
        else:
            self.provider = OpenAIProvider()

        self.prompt_builder = PromptBuilder()

    async def analyze(
        self,
        threat_report: dict,
    ) -> str:

        prompt = self.prompt_builder.build_prompt(
            threat_report
        )

        return await self.provider.generate(
            prompt
        )
