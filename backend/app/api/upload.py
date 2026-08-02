import json

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.logger import logger
from app.schemas.upload import IOCSummary
from app.services.ai_service import AIService
from app.services.ioc_extractor import extract_iocs
from app.services.threat_intel import ThreatIntelService

router = APIRouter()

threat_service = ThreatIntelService()
ai_service = AIService()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a JSON log file, extract IOCs,
    perform threat intelligence lookup,
    and generate an AI security report.
    """

    if not file.filename.endswith(".json"):
        raise HTTPException(
            status_code=400,
            detail="Only JSON files are allowed.",
        )

    content = await file.read()

    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 5 MB.",
        )

    logger.info(
        "Received file '%s' (%d bytes)",
        file.filename,
        len(content),
    )

    try:
        data = json.loads(content)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid JSON file.",
        )

    text = json.dumps(data)

    iocs = extract_iocs(text)

    logger.info(
        "IOC Extraction Complete | IPs=%d Domains=%d URLs=%d Hashes=%d",
        len(iocs["ips"]),
        len(iocs["domains"]),
        len(iocs["urls"]),
        len(iocs["hashes"]),
    )

    logger.info("Threat Intelligence Analysis Started")

    threat_report = await threat_service.analyze_iocs(iocs)

    logger.info("Threat Intelligence Analysis Completed")

    summary = {
        "overall_risk": "Clean",
        "total_ips": len(iocs["ips"]),
        "total_domains": len(iocs["domains"]),
        "total_urls": len(iocs["urls"]),
        "total_hashes": len(iocs["hashes"]),
    }

    for ip in threat_report["ips"]:
        reputation = ip.get("overall_reputation")

        if reputation == "High Risk":
            summary["overall_risk"] = "High Risk"
            break

        if (
            reputation == "Medium Risk"
            and summary["overall_risk"] != "High Risk"
        ):
            summary["overall_risk"] = "Medium Risk"

        elif (
            reputation == "Low Risk"
            and summary["overall_risk"] == "Clean"
        ):
            summary["overall_risk"] = "Low Risk"

    ai_report = await ai_service.analyze(
        {
            "summary": summary,
            "threat_intelligence": threat_report,
        }
    )

    logger.info("AI Analysis Completed")

    logger.info("Analysis Completed Successfully")

    return {
        "message": "Analysis completed successfully.",
        "uploaded_data": data,
        "iocs": IOCSummary(**iocs).model_dump(),
        "summary": summary,
        "threat_intelligence": threat_report,
        "ai_analysis": ai_report.model_dump(),
    }
