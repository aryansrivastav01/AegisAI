from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    """
    Application configuration.
    """

    app_name: str
    app_version: str
    debug: bool

    secret_key: str
    jwt_algorithm: str

    virustotal_api_key: str = ""
    abuseipdb_api_key: str = ""

    database_url: str = ""

    ollama_base_url: str = "http://localhost:11434"

    llm_provider: str = "gemini"
    ollama_model: str = "llama3.1:8b"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.5-flash"

    # SMTP for emails
    smtp_server: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    emails_from_email: str = ""
    frontend_url: str = "http://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )

    @field_validator("llm_provider")
    @classmethod
    def validate_llm_provider(cls, value: str) -> str:
        allowed = {
            "ollama",
            "openai",
            "gemini",
        }

        value = value.lower()

        if value not in allowed:
            raise ValueError(
                f"Unsupported LLM provider: {value}"
            )

        return value

    def validate_required_settings(self) -> None:
        """
        Validate required configuration
        based on enabled features.
        """

        if not self.virustotal_api_key:
            raise RuntimeError(
                "VIRUSTOTAL_API_KEY is missing."
            )

        if not self.abuseipdb_api_key:
            raise RuntimeError(
                "ABUSEIPDB_API_KEY is missing."
            )

        if self.llm_provider == "ollama":
            if not self.ollama_base_url:
                raise RuntimeError(
                    "OLLAMA_BASE_URL is missing."
                )
                
        if self.llm_provider == "gemini":
            if not self.gemini_api_key:
                raise RuntimeError(
                    "GEMINI_API_KEY is missing."
                )

settings = Settings()

settings.validate_required_settings()
