import { it, expect } from "vitest";

import {
  BadGatewayError,
  BadRequestError,
  ForbiddenError,
  GatewayTimeoutError,
  HttpError,
  InternalServerError,
  MethodNotAllowedError,
  NotAcceptableError,
  NotFoundError,
  NotImplementedError,
  RequestTimeoutError,
  ServiceUnavailable,
  TooManyRequestsError,
  UnauthorizedError,
} from "./index";

it("HttpError defaults to 500 status", () => {
  const error = new HttpError();
  expect(error.status).toBe(500);
  expect(error.message).toBe("Something went wrong!");
});

it("BadRequestError is a 400", () => {
  const stackTrace = ["something happened", "something else happened", "another thing happened"]
  const error = new BadRequestError("has custom message", stackTrace);

  expect(error.status).toBe(400);
  expect(error.message).toBe("has custom message");
  expect(error.context).toBe(stackTrace);
});

it("UnauthorizedError is a 401", () => {
  const error = new UnauthorizedError();
  expect(error.status).toBe(401);
});

it("ForbiddenError is a 403", () => {
  const error = new ForbiddenError();
  expect(error.status).toBe(403);
});

it("NotFoundError is a 404", () => {
  const error = new NotFoundError();
  expect(error.status).toBe(404);
});

it("MethodNotAllowedError is a 405", () => {
  const error = new MethodNotAllowedError();
  expect(error.status).toBe(405);
});

it("NotAcceptableError is a 406", () => {
  const error = new NotAcceptableError();
  expect(error.status).toBe(406);
});

it("RequestTimeoutError is a 408", () => {
  const error = new RequestTimeoutError();
  expect(error.status).toBe(408);
});

it("TooManyRequestsError is a 429", () => {
  const error = new TooManyRequestsError();
  expect(error.status).toBe(429);
});

it("InternalServerError is a 500", () => {
  const error = new InternalServerError();
  expect(error.status).toBe(500);
});

it("NotImplementedError is a 501", () => {
  const error = new NotImplementedError();
  expect(error.status).toBe(501);
});

it("BadGatewayError is a 502", () => {
  const error = new BadGatewayError();
  expect(error.status).toBe(502);
});

it("ServiceUnavailable is a 503", () => {
  const error = new ServiceUnavailable();
  expect(error.status).toBe(503);
});

it("GatewayTimeoutError is a 504", () => {
  const error = new GatewayTimeoutError();
  expect(error.status).toBe(504);
});
