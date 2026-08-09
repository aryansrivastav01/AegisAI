from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions import AegisAIException
from app.core.logger import logger


async def aegis_exception_handler(
    request: Request,
    exc: AegisAIException,
):
    """
    Handle all custom AegisAI exceptions.
    """

    logger.error(
        "%s %s -> %s",
        request.method,
        request.url.path,
        exc.message,
    )

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.message,
        },
    )


async def unhandled_exception_handler(
    request: Request,
    exc: Exception,
):
    """
    Handle unexpected exceptions.
    """

    logger.exception(
        "Unhandled exception during %s %s",
        request.method,
        request.url.path,
    )

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal Server Error",
        },
    )
