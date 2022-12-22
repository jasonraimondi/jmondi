import { z } from "zod";

type Options = { flatResult?: boolean };

type FormDataRecord = Record<string, any>;
type Params = { schema: z.Schema; data: FormDataRecord | FormData };

export type FormErrors = Record<string, any>;
export type ValidationResponse = undefined | FormErrors;

function getFormData(formData: FormDataRecord | FormData) {
  if (formData instanceof FormData) {
    const result: FormDataRecord = {};
    for (const [key, value] of formData.entries()) {
      result[key] = value;
    }
    return result;
  }

  return formData;
}

export function validateForm(params: Params, options: Options = {}): ValidationResponse {
  const formData = getFormData(params.data);

  const result = params.schema.safeParse(formData);

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
