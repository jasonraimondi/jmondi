import joi from "joi";

import { createForm, validateForm } from "./form-validator";

const form = createForm({
  age: joi.number().required(),
  email: joi.string().email({ tlds: false }).required(),
  password: joi.string().min(8).required(),
  rememberMe: joi.boolean().required(),
});

it("validateForm function returns undefined if no errors", async () => {
  const data = {
    age: 1,
    email: "bob@example.com",
    password: "bobobobobbobo",
    rememberMe: true,
  };

  const errors = await validateForm({ schema: form, data });

  expect(errors).toBeUndefined();
});

it("validateForm function returns a list of errors for invalid data", async () => {
  const data = {};

  const errors = await validateForm({ schema: form, data });

  expect(errors).toStrictEqual({
    age: "This field is required",
    email: "This field is required",
    password: "This field is required",
    rememberMe: "This field is required",
  });
});
