from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ElyvexAI",
        "version": "0.0.1"
    }
