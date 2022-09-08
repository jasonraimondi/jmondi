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
  constructor(message = "Bad Request", context?: any) {
    super(message, 400, context);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", context?: any) {
    super(message, 401, context);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Unauthorized", context?: any) {
    super(message, 403, context);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", context?: any) {
    super(message, 404, context);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed", context?: any) {
    super(message, 405, context);
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message = "Not Acceptable", context?: any) {
    super(message, 406, context);
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = "Request Timeout", context?: any) {
    super(message, 408, context);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests", context?: any) {
    super(message, 429, context);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", context?: any) {
    super(message, 500, context);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = "Not Implemented", context?: any) {
    super(message, 501, context);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway", context?: any) {
    super(message, 502, context);
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(message = "Service Unavailable", context?: any) {
    super(message, 503, context);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout", context?: any) {
    super(message, 504, context);
  }
}
