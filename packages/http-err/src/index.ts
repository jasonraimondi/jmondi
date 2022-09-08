export class HttpError extends Error {
  readonly status: number;
  readonly context?: any;

  constructor(message = "Something went wrong!", status = 500, context?: any) {
    super(message);
    this.status = status;
    this.context = context;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", status = 400, context?: any) {
    super(message, status, context);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", status = 401, context?: any) {
    super(message, status, context);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Unauthorized", status = 403, context?: any) {
    super(message, status, context);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", status = 404, context?: any) {
    super(message, status, context);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed", status = 405, context?: any) {
    super(message, status, context);
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message = "Not Acceptable", status = 406, context?: any) {
    super(message, status, context);
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = "Request Timeout", status = 408, context?: any) {
    super(message, status, context);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests", status = 429, context?: any) {
    super(message, status, context);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", status = 500, context?: any) {
    super(message, status, context);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = "Not Implemented", status = 501, context?: any) {
    super(message, status, context);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway", status = 502, context?: any) {
    super(message, status, context);
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(message = "Service Unavailable", status = 503, context?: any) {
    super(message, status, context);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout", status = 504, context?: any) {
    super(message, status, context);
  }
}
