import { it, expect } from "vitest";

import { example } from "./example";

it("works example", () => {
  expect(example(1, 2)).toBe(3)
});
