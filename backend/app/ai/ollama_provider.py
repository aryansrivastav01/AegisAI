from app.ai.base_provider import BaseAIProvider
from app.core.config import settings
from app.utils.http_client import HTTPClient


class OllamaProvider(BaseAIProvider):
    """
    Ollama AI Provider.
    Responsible only for communicating with the Ollama API.
    """

    def __init__(self) -> None:
        self.client = HTTPClient()
        self.base_url = settings.ollama_base_url.rstrip("/")
        self.model = "llama3.1:8b"

    async def generate(self, prompt: str) -> str:
        """
        Generate a response using the local Ollama model.
        """

        response = await self.client.post(
            url=f"{self.base_url}/api/generate",
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
            },
            timeout=120,
        )

        response.raise_for_status()

        payload = response.json()

        if "response" not in payload:
            raise ValueError(
                "Invalid response received from Ollama."
            )

        return payload["response"]
