import json

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.core.exceptions import (
    FileTooLargeException,
    InvalidFileException,
    InvalidJSONException,
)

from app.core.logger import logger

from app.schemas.upload import IOCSummary

from app.services.ai_service import AIService
from app.services.history import HistoryService
from app.services.ioc_extractor import extract_iocs, extract_activity, extract_timeline
from app.services.threat_intel import ThreatIntelService

router = APIRouter()

threat_service = ThreatIntelService()
ai_service = AIService()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a JSON log file,
    extract IOCs,
    perform threat intelligence lookup,
    generate an AI report,
    and save the analysis.
    """

    if not file.filename.lower().endswith(".json"):
        raise InvalidFileException()

    content = await file.read()

    if len(content) > 5 * 1024 * 1024:
        raise FileTooLargeException()

    logger.info(
        "Received file '%s' (%d bytes)",
        file.filename,
        len(content),
    )

    try:
        data = json.loads(content)

    except json.JSONDecodeError as exc:
        raise InvalidJSONException() from exc

    text = json.dumps(data)

    iocs = extract_iocs(text)

    logger.info(
        "IOC Extraction Complete | IPs=%d Domains=%d URLs=%d Hashes=%d",
        len(iocs["ips"]),
        len(iocs["domains"]),
        len(iocs["urls"]),
        len(iocs["hashes"]),
    )

    logger.info(
        "Threat Intelligence Analysis Started"
    )

    threat_report = await threat_service.analyze_iocs(
        iocs
    )

    logger.info(
        "Threat Intelligence Analysis Completed"
    )

    extracted_activity = extract_activity(text)
    extracted_timeline = extract_timeline(text)

    summary = {
        "overall_risk": "Clean",
        "total_ips": len(iocs["ips"]),
        "total_domains": len(iocs["domains"]),
        "total_urls": len(iocs["urls"]),
        "total_hashes": len(iocs["hashes"]),
    }

    for ip in threat_report["ips"]:

        reputation = ip.get(
            "overall_reputation"
        )

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

    logger.info(
        "AI Analysis Started"
    )

    try:
        ai_report = await ai_service.analyze(
            {
                "summary": summary,
                "threat_intelligence": threat_report,
                "extracted_activity": extracted_activity,
                "extracted_timeline": extracted_timeline,
            }
        )

    except Exception as exc:
        logger.exception(
            "AI Analysis Failed"
        )

        ai_report = None

    if ai_report is None:
        ai_report = await AIService().analyze(
            {
                "summary": summary,
                "threat_intelligence": threat_report,
                "extracted_activity": extracted_activity,
                "extracted_timeline": extracted_timeline,
            }
        )

    logger.info(
        "AI Analysis Completed"
    )

    ai_analysis_payload = ai_report.model_dump()

    fallback_summary = ai_analysis_payload.get("summary") or (
        f"Threat summary for {file.filename}"
    )

    fallback_executive_summary = (
        ai_analysis_payload.get("executive_summary")
        or ai_analysis_payload.get("summary")
        or f"Threat summary for {file.filename}"
    )

    response_payload = {
        "message": "Analysis completed successfully.",
        "uploaded_data": data,
        "iocs": IOCSummary(
            **iocs
        ).model_dump(),
        "summary": summary,
        "threat_intelligence": threat_report,
        "ai_analysis": {
            **ai_analysis_payload,
            "summary": fallback_summary,
            "executive_summary": fallback_executive_summary,
            "findings": ai_analysis_payload.get("findings") or [],
            "recommendations": ai_analysis_payload.get("recommendations") or [],
        },
    }

    if not response_payload["ai_analysis"].get("executive_summary"):
        response_payload["ai_analysis"]["executive_summary"] = (
            f"The dataset contains {summary['total_ips']} IP indicators, {summary['total_domains']} domain indicators, {summary['total_urls']} URL indicators, and {summary['total_hashes']} hash indicators. Overall risk is {summary['overall_risk']}."
        )

    history_service = HistoryService(db)
    history_service.save_analysis(
        filename=file.filename,
        overall_risk=summary["overall_risk"],
        summary=response_payload["ai_analysis"].get("summary") or fallback_summary,
        analysis_json=response_payload,
    )

    logger.info(
        "Analysis Saved Successfully"
    )

    logger.info(
        "Analysis Completed Successfully"
    )

    return response_payload