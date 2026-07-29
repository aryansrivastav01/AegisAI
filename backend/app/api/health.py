from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AegisAI",
        "version": "0.0.1"
    }
