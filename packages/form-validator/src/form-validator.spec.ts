import joi from "joi";

import { createForm, validateForm } from "./form-validator";

describe("", () => {
  const form = createForm({
    age: joi.number().required(),
    email: joi.string().email({ tlds: false }).required(),
    password: joi.string().min(8).required(),
    rememberMe: joi.boolean().required(),
  });

  it("works example", async () => {
    const data = {};

    const errors = await validateForm({ schema: form, data });

    expect(errors).toStrictEqual({
      email: "This field is required",
      password: "This field is required",
      rememberMe: "This field is required",
    });
  });
});