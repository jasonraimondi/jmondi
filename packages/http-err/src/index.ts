import { HttpStatus } from "@jmondi/http-status";

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
    super(message, HttpStatus.BAD_REQUEST, context);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", context?: any) {
    super(message, HttpStatus.UNAUTHORIZED, context);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Unauthorized", context?: any) {
    super(message, HttpStatus.FORBIDDEN, context);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", context?: any) {
    super(message, HttpStatus.NOT_FOUND, context);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed", context?: any) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED, context);
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message = "Not Acceptable", context?: any) {
    super(message, HttpStatus.NOT_ACCEPTABLE, context);
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = "Request Timeout", context?: any) {
    super(message, HttpStatus.REQUEST_TIMEOUT, context);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests", context?: any) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, context);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", context?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, context);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = "Not Implemented", context?: any) {
    super(message, HttpStatus.NOT_IMPLEMENTED, context);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway", context?: any) {
    super(message, HttpStatus.BAD_GATEWAY, context);
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(message = "Service Unavailable", context?: any) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, context);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout", context?: any) {
    super(message, HttpStatus.GATEWAY_TIMEOUT, context);
  }
}
