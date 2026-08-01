from enum import Enum

from pydantic import BaseModel


class Reputation(str, Enum):
    CLEAN = "Clean"
    LOW = "Low Risk"
    MEDIUM = "Medium Risk"
    HIGH = "High Risk"
    UNKNOWN = "Unknown"


class IOCType(str, Enum):
    IP = "ip"
    DOMAIN = "domain"
    URL = "url"
    HASH = "hash"


class APIMessage(BaseModel):
    message: str
