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

export type Errors = Record<string, any>;
export type ValidationResponse = undefined | Errors;

export async function validateForm(formData: FormData, options?: { flatResult?: boolean }): Promise<ValidationResponse> {
  const { schema, data } = formData;

  const result = await schema.safeParseAsync(data);

  if (result.success) return;

  return result.error.errors.reduce<ValidationResponse>((prev, next) => {
    let result = { ...prev };

    if (options?.flatResult) {
      const key = next.path.join(".");
      result[key] = next.message;
    } else {
      const inner = next.path.reduceRight((innerPrev, innerNext, idx) => {
        const isLastElement = idx === next.path.length - 1;
        if (isLastElement) return { [innerNext]: next.message };
        return { [innerNext]: innerPrev };
      }, {});
      result = { ...result, ...inner };
    }

    return result;
  }, {});
}
