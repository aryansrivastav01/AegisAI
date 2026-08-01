from app.ai.base_provider import BaseAIProvider
from app.core.config import settings
from app.utils.http_client import HTTPClient


class OllamaProvider(BaseAIProvider):
    """
    Local Ollama implementation.
    """

    def __init__(self):
        self.client = HTTPClient()

    async def generate(self, prompt: str) -> str:

        response = await self.client.post(
            url=f"{settings.ollama_base_url}/api/generate",
            json={
                "model": "llama3.1:8b",
                "prompt": prompt,
                "stream": False,
            },
        )

        if response.status_code != 200:
            raise RuntimeError(
                f"Ollama Error: {response.text}"
            )

        return response.json()["response"]
