import json

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.logger import logger
from app.services.ioc_extractor import extract_iocs
from app.services.threat_intel import ThreatIntelService

router = APIRouter()

threat_service = ThreatIntelService()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a JSON log file, extract IOCs,
    enrich them using Threat Intelligence,
    and return the analysis.
    """

    # Validate extension
    if not file.filename.endswith(".json"):
        raise HTTPException(
            status_code=400,
            detail="Only JSON files are allowed."
        )

    # Read uploaded file
    content = await file.read()

    logger.info(
        "Received file '%s' (%d bytes)",
        file.filename,
        len(content),
    )

    # Validate file size (5 MB)
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 5 MB."
        )

    # Parse JSON
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid JSON file."
        )

    # Convert JSON object to searchable text
    text = json.dumps(data)

    # Extract IOCs
    iocs = extract_iocs(text)

    logger.info(
        "IOC Extraction Complete | IPs=%d Domains=%d URLs=%d Hashes=%d",
        len(iocs["ips"]),
        len(iocs["domains"]),
        len(iocs["urls"]),
        len(iocs["hashes"]),
    )

    # Threat Intelligence
    logger.info("Threat Intelligence Analysis Started")

    threat_intelligence = await threat_service.analyze_iocs(iocs)

    logger.info("Threat Intelligence Analysis Completed")

    logger.info("Analysis Completed Successfully")

    return {
        "message": "Analysis completed successfully.",
        "uploaded_data": data,
        "iocs": iocs,
        "threat_intelligence": threat_intelligence,
    }
