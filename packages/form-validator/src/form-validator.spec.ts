import { it, expect } from "vitest";
import { z } from "zod";

import { createForm, validateForm } from "./form-validator";

const schema = z.object({
  age: z.number().positive().max(150),
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

it("returns undefined if no errors", async () => {
  const data = {
    age: 99,
    email: "bob@example.com",
    password: "bobobobobbobo",
    rememberMe: true,
  };

  const errors = await validateForm({ schema, data });

  expect(errors).toBeUndefined();
});

it("returns a dict of errors", async () => {
  const data = { age: 199, email: "jason" };

  const errors = await validateForm({ schema, data });

  expect(errors).toStrictEqual({
    age: "Number must be less than or equal to 150",
    email: "Invalid email",
    password: "Required",
    rememberMe: "Required",
  });
});

it("ignores optional fields", async () => {
  const data = {};
  const schema = z.object({ nickname: z.optional(z.number()) });

  const errors = await validateForm({ schema, data });

  expect(errors).toBeUndefined();
});

it("can use custom messages", async () => {
  const data = {};
  const schema = z.object({
    quote: z.string({ required_error: "Quote is required" }),
  });

  const errors = await validateForm({ schema, data });

  expect(errors).toStrictEqual({ quote: "Quote is required" });
});

it("createForm function still works", async () => {
  const schema = createForm({});
  const data = {};

  const errors = await validateForm({ schema, data });

  expect(errors).toBeUndefined();
});

it("supports objects", async () => {
  const innerSchema = z.object({
    user: schema,
  });
  const data = {
    user: {
      age: 99,
      password: "bobloblaw",
      rememberMe: true,
    },
  };

  const errors = await validateForm({ schema: innerSchema, data });

  expect(errors).toStrictEqual({
    user: {
      email: "Required",
    },
  });
});

it("supports objects with flatResult", async () => {
  const innerSchema = z.object({
    user: schema,
  });
  const data = {
    user: {
      age: 99,
      email: "jason",
    },
  };

  const errors = await validateForm({ schema: innerSchema, data }, { flatResult: true });

  expect(errors).toStrictEqual({
    "user.email": "Invalid email",
    "user.password": "Required",
    "user.rememberMe": "Required",
  });
});