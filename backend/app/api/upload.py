import json

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.ioc_extractor import extract_iocs

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a JSON log file and extract IOCs.
    """

    # Allow only JSON files
    if not file.filename.endswith(".json"):
        raise HTTPException(
            status_code=400,
            detail="Only JSON files are allowed."
        )

    # Read file content
    content = await file.read()

    # Maximum file size: 5 MB
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

    # Convert JSON object into text
    text = json.dumps(data)

    # Extract IOCs
    iocs = extract_iocs(text)

    return {
        "message": "File uploaded successfully.",
        "uploaded_data": data,
        "iocs": iocs,
    }
