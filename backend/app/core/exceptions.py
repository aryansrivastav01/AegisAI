class ElyvexAIException(Exception):
    """
    Base exception for ElyvexAI.
    """

    def __init__(
        self,
        message: str,
        status_code: int = 500,
    ) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class InvalidFileException(ElyvexAIException):
    """
    Raised when an unsupported file type is uploaded.
    """

    def __init__(self) -> None:
        super().__init__(
            message="Only JSON files are allowed.",
            status_code=400,
        )


class InvalidJSONException(ElyvexAIException):
    """
    Raised when uploaded JSON is invalid.
    """

    def __init__(self) -> None:
        super().__init__(
            message="Invalid JSON file.",
            status_code=400,
        )


class FileTooLargeException(ElyvexAIException):
    """
    Raised when uploaded file exceeds size limit.
    """

    def __init__(self) -> None:
        super().__init__(
            message="File size exceeds 5 MB.",
            status_code=400,
        )


class AIAnalysisException(ElyvexAIException):
    """
    Raised when AI analysis fails.
    """

    def __init__(self) -> None:
        super().__init__(
            message="AI analysis failed.",
            status_code=500,
        )
