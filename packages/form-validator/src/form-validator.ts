import { z } from "zod";

type Options = { flatResult?: boolean };

type FormDataRecord<T> = Record<string, T>;
type Params<T = z.Schema> = { schema: T; data: FormDataRecord<T | unknown> | FormData };

// @todo if someone knows how to type this better... please.
export type FormErrors = Record<string, string | Record<string, string | Record<string, string>>>;
export type ValidationResponse<T> = [FormDataRecord<T>, undefined] | [undefined, FormErrors];

export function parseForm<T extends z.Schema>(
  params: Params<T>,
  options: Options = {},
): ValidationResponse<T> {
  let formData = params.data;

  if (formData instanceof FormData) {
    const result: FormDataRecord<any> = {};
    for (const [key, value] of formData.entries()) {
      result[key] = value;
    }
    formData = result;
  }

  const result = params.schema.safeParse(formData);

  if (result.success) {
    return [result.data, undefined];
  }

  const errors = result.error.errors.reduce<FormErrors>((prev, next) => {
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

  return [undefined, errors];
}
