"""Custom exception hierarchy for the application."""

__all__ = ["AppError", "NotFoundError", "ValidationError", "ConflictError"]


class AppError(Exception):
    """Base class for all application errors."""

    def __init__(self, message: str, code: int = 500) -> None:
        super().__init__(message)
        self.code = code


class NotFoundError(AppError):
    def __init__(self, resource: str, identifier: object) -> None:
        super().__init__(f"{resource} '{identifier}' not found", code=404)
        self.resource = resource
        self.identifier = identifier


class ValidationError(AppError):
    def __init__(self, field: str, message: str) -> None:
        super().__init__(f"{field}: {message}", code=400)
        self.field = field


class ConflictError(AppError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code=409)
