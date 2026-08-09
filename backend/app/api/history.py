from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.database import get_db
from app.services.history import HistoryService

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get("")
def history(
    db: Session = Depends(get_db),
):
    service = HistoryService(db)

    return service.get_history()


@router.get("/{analysis_id}")
def history_by_id(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    service = HistoryService(db)

    result = service.get_analysis(analysis_id)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )

    return result


@router.delete("/{analysis_id}")
def delete_history(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    service = HistoryService(db)

    deleted = service.delete_analysis(analysis_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )

    return {"message": "Analysis deleted successfully"}
