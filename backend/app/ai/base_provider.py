from abc import ABC, abstractmethod


class BaseAIProvider(ABC):
    """
    Base interface for all AI providers.
    """

    @abstractmethod
    async def generate(self, prompt: str) -> str:
        """
        Generate an AI response from the given prompt.
        """
        raise NotImplementedError
