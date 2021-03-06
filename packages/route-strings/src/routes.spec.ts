import { route, Route } from "./routes";

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

it("creates templates from input params", () => {
  expect(route("/user").create()).toBe("/user");
  expect(new Route("/user").create()).toBe("/user");
  expect(new Route<{ id: number }>("/user/:id").create({ id: 1 })).toBe("/user/1");
  expect(new Route<{ id: number }>("/user/:id/comments").create({ id: 1 })).toBe("/user/1/comments");
  expect(new Route("/user/:user/comments/:comment").create({ user: 1, comment: "something" })).toBe("/user/1/comments/something");
  expect(new Route<{ user: number, comment: string }>("/user/:user/comments/:comment").create({ user: 2, comment: "else" })).toBe("/user/2/comments/else");
});
