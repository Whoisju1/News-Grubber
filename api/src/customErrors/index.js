export class CustomError extends Error {
  constructor(message, status, errorType = null) {
    super(message);
    this.message = message;
    this.status = status || null;
    this.errorType = errorType;
  }
}

export class AuthenticationError extends CustomError {
  constructor(message, status = 400) {
    super(message, status);
    this.message = message;
  }
}

export class AuthorizationError extends CustomError {
  constructor(message = 'Unauthorized', status = 401) {
    super(message, status);
    this.message = message;
  }
}

export class ValidationError extends CustomError {
  constructor(message, status = 422) {
    super(message, status);
  }
}
