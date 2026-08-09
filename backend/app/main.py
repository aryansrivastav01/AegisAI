from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.upload import router as upload_router
from app.api.history import router as history_router

from app.core.config import settings
from app.core.exceptions import AegisAIException
from app.core.handlers import (
    aegis_exception_handler,
    unhandled_exception_handler,
)
from app.core.logger import logger

from app.database import Base, engine

app = FastAPI(
    title=settings.app_name,
    description="Your AI SOC Analyst",
    version=settings.app_version,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    AegisAIException,
    aegis_exception_handler,
)

app.add_exception_handler(
    Exception,
    unhandled_exception_handler,
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(history_router)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

    logger.info(
        "Starting %s v%s",
        settings.app_name,
        settings.app_version,
    )


@app.on_event("shutdown")
async def shutdown_event():
    logger.info(
        "Shutting down %s",
        settings.app_name,
    )