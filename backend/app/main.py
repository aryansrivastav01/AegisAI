from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.upload import router as upload_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup and shutdown lifecycle.
    """

    print(f"Starting {settings.app_name} v{settings.app_version}")

    yield

    print(f"Shutting down {settings.app_name}")


app = FastAPI(
    title=settings.app_name,
    description="AI-Powered SOC Analyst Platform",
    version=settings.app_version,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later replace with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    tags=["Health"],
)

app.include_router(
    upload_router,
    tags=["Upload"],
)
