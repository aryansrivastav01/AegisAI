from enum import Enum

from pydantic import BaseModel


class IOCType(str, Enum):
    IP = "ip"
    DOMAIN = "domain"
    URL = "url"
    HASH = "hash"


class Reputation(str, Enum):
    CLEAN = "Clean"
    LOW_RISK = "Low Risk"
    MEDIUM_RISK = "Medium Risk"
    HIGH_RISK = "High Risk"
    UNKNOWN = "Unknown"


class APIResponse(BaseModel):
    """
    Standard API response.
    """

    success: bool
    message: str
