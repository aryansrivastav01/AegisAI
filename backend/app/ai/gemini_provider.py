from app.ai.base_provider import BaseAIProvider
from app.core.config import settings
from app.utils.http_client import HTTPClient


class GeminiProvider(BaseAIProvider):
    """
    Gemini AI Provider.
    Responsible only for communicating with the Gemini API.
    """

    def __init__(self) -> None:
        self.client = HTTPClient()
        self.api_key = settings.gemini_api_key
        self.model = settings.gemini_model

    async def generate(self, prompt: str) -> str:
        """
        Generate a response using the Gemini API.
        """

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "temperature": 0.2
            }
        }

        response = await self.client.post(
            url=url,
            json=payload,
            timeout=120,
        )

        response.raise_for_status()

        data = response.json()

        try:
            content = data["candidates"][0]["content"]["parts"][0]["text"]
            return content
        except (KeyError, IndexError) as e:
            raise ValueError("Invalid response received from Gemini.") from e
