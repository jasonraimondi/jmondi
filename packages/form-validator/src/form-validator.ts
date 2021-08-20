import joi, { ObjectSchema, SchemaMap, ValidationError } from "joi";

type FormData = { schema: ObjectSchema; data: any; };

const defaultValues = {
  "string.base": `Should be a type of 'text'`,
  "string.email": `Invalid Email Address`,
  "string.min": `Should have a minimum length of {#limit}`,
  "any.required": `This field is required`,
};

export function createForm<TSchema = any, isStrict = false, T = TSchema>(schema?: SchemaMap<T, isStrict>) {
  return joi.object(schema).messages(defaultValues);
}

export async function validateForm({ schema, data }: FormData): Promise<undefined|Record<string, string>> {
  try {
    await schema.validateAsync(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      return err.details.reduce((acc, err) => ({ ...acc, ...(err.context?.key ? { [err.context.key]: err.message } : {}) }), {});
    }
  }
  return;
}