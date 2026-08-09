from sqlalchemy.orm import Session

from app.models.analysis import Analysis


class HistoryService:
    def __init__(self, db: Session):
        self.db = db

    def save_analysis(
        self,
        filename: str,
        overall_risk: str,
        summary: str,
        analysis_json: dict,
    ):
        analysis = Analysis(
            filename=filename,
            overall_risk=overall_risk,
            summary=summary,
            analysis_json=analysis_json,
        )

        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)

        return analysis

    @staticmethod
    def _serialize_analysis(analysis: Analysis) -> dict:
        return {
            "id": analysis.id,
            "filename": analysis.filename,
            "overall_risk": analysis.overall_risk,
            "summary": analysis.summary,
            "analysis_json": analysis.analysis_json,
            "created_at": (
                analysis.created_at.isoformat()
                if analysis.created_at
                else None
            ),
        }

    def get_history(self):
        analyses = (
            self.db.query(Analysis)
            .order_by(Analysis.created_at.desc())
            .all()
        )

        return [
            self._serialize_analysis(analysis)
            for analysis in analyses
        ]

    def get_analysis(
        self,
        analysis_id: int,
    ):
        analysis = (
            self.db.query(Analysis)
            .filter(
                Analysis.id == analysis_id
            )
            .first()
        )

        if analysis is None:
            return None

        return self._serialize_analysis(analysis)

    def delete_analysis(
        self,
        analysis_id: int,
    ) -> bool:
        analysis = (
            self.db.query(Analysis)
            .filter(
                Analysis.id == analysis_id
            )
            .first()
        )

        if analysis is None:
            return False

        self.db.delete(analysis)
        self.db.commit()

        return True