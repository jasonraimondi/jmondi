import { z } from "zod";

type Options = { flatResult?: boolean };

type FormDataRecord = Record<string, unknown>;
type FormErrors = Record<string, string | Record<string, string>>;

type Params<T extends z.ZodType> = {
  schema: T;
  data: Record<string, unknown> | FormData;
};

export function parseForm<T extends z.ZodType>({ data, schema }: Params<T>, options: Options = {}) {
  type FailResult = { errors: FormErrors; data?: never };
  type PassResult = { errors?: never; data: z.infer<T> };

  if (data instanceof FormData) {
    const result: FormDataRecord = {};
    for (const [key, value] of data.entries()) {
      result[key] = value;
    }
    data = result;
  }

  const result = schema.safeParse(data);

  if (result.success) {
    return { data: result.data } as PassResult;
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

  return { errors } as FailResult;
}
