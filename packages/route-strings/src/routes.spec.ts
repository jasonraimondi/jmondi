import { describe, it, expect, beforeEach } from "vitest";

import { route, Route, RouteGroup, setRouteGlobalPrefix } from "./routes.js";

describe("without global prefix", () => {
  it("supports camel case template ids", () => {
    const r = new Route("/user/:userId/uploads");
    expect(r.template).toBe("/user/:userId/uploads");
    expect(r.create({ userId: "1" })).toBe("/user/1/uploads");
  });

  it("returns the input templates", () => {
    expect(route("/user").template).toBe("/user");
    expect(new Route("/user").template).toBe("/user");
    expect(route("/user/:id").template).toBe("/user/:id");
    expect(new Route("/user/:id").template).toBe("/user/:id");
    expect(new Route("/user/:id/comments").template).toBe("/user/:id/comments");
  });

  it("returns template when cast to a string", () => {
    expect(new Route("/user/:id").toString()).toBe("/user/:id");
    expect(String(new Route("/user/:id"))).toBe("/user/:id");
  });

  it("creates templates from input params", () => {
    expect(route("/user").create()).toBe("/user");
    expect(new Route("/user/:id").create({ id: 1 })).toBe("/user/1");
    expect(new Route("/user/:id/comments").create({ id: 1 })).toBe("/user/1/comments");
    expect(new Route("/user/:user/comments/:comment").create({ user: 1, comment: "something" })).toBe("/user/1/comments/something");
    expect(new Route("/user/:user/comments/:comment").create({ user: 2, comment: "else" })).toBe("/user/2/comments/else");
  });
})

describe("with global prefix", () => {
  beforeEach(() => {
    setRouteGlobalPrefix("https://example.com");
  });

  it("supports global prefix", () => {
    expect(new Route("/user/:id").create({ id: 1 })).toBe("https://example.com/user/1");
    expect(new Route("/user/:user/comments/:comment").create({ user: 1, comment: "something" })).toBe("https://example.com/user/1/comments/something");
  });
})

describe("with router", () => {
  let router: RouteGroup;

  beforeEach(() => {
    router = new RouteGroup({
      prefix: "https://example.com"
    })
  });

  it("supports global prefix", () => {
    expect(router.add("/user/:id").create({ id: 1 })).toBe("https://example.com/user/1");
    expect(router.add("/user/:user/comments/:comment").create({ user: 1, comment: "something" })).toBe("https://example.com/user/1/comments/something");
  });

  it("returns template when cast to a string", () => {
    expect(router.add("/user/:id").toString()).toBe("/user/:id");
    expect(String(router.add("/user/:id"))).toBe("/user/:id");
  });
})

