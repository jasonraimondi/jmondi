// import joi, { ObjectSchema, SchemaMap, ValidationError } from "joi";

import { z } from "zod";

type FormData = { schema: z.Schema; data: any };

/**
 * @deprecated use z.object directly
 * @param schema
 */
export function createForm<T extends z.ZodRawShape>(schema: T) {
  return z.object(schema);
}

export type Errors = Record<string, string>;
export type ValidationResponse = undefined | Errors;

export async function validateForm(formData: FormData): Promise<ValidationResponse> {
  const { schema, data } = formData;

  const result = await schema.safeParseAsync(data);

  if (result.success) return;

  return result.error.errors.reduce((prev, next) => {
    const [key] = next.path;
    return {
      ...prev,
      [key]: next.message,
    };
  }, {});
}
