from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    app_version: str
    debug: bool

    secret_key: str
    jwt_algorithm: str

    openai_api_key: str = ""
    virustotal_api_key: str = ""
    abuseipdb_api_key: str = ""

    database_url: str = ""

    ollama_base_url: str = "http://localhost:11434"

    llm_provider: str = "openai"
    openai_model: str = "gpt-4.1-mini"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
