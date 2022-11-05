export class ApiError extends Error {
  public readonly statusCode: number;
  protected previousError: Error | null;

  constructor(message: string, statusCode: number, previousError?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.previousError = previousError;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnprocessedEntityError extends ApiError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class DatabaseError extends ApiError {
  constructor(message: string, previousError?: Error) {
    super(message, 500, previousError);
  }
}
