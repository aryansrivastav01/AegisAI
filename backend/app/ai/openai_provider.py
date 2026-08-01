from openai import AsyncOpenAI

from app.ai.base_provider import BaseAIProvider
from app.core.config import settings


class OpenAIProvider(BaseAIProvider):
    """
    OpenAI implementation of the AI provider.
    """

    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=settings.openai_api_key
        )

    async def generate(self, prompt: str) -> str:

        response = await self.client.chat.completions.create(
            model=settings.openai_model,
            temperature=0.2,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an experienced SOC Analyst. "
                        "Only analyze the supplied evidence. "
                        "Never invent indicators or attacks."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        return response.choices[0].message.content
