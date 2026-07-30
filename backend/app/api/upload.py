import json

from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Step 1: Extension Validation
    if not file.filename.endswith(".json"):
        raise HTTPException(
            status_code=400,
            detail="Only JSON files are allowed."
        )

    # Step 2: Read File (Only Once)
    content = await file.read()

    # Step 3: File Size Validation
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds 5 MB."
        )

    # Step 4: JSON Validation
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid JSON file."
        )

    # Step 5: Success Response
    return {
        "message": "JSON file uploaded successfully.",
        "filename": file.filename,
        "content_type": file.content_type,
        "file_size": len(content),
        "data": data
    }
