import { mobileFirst } from "./mobile_first";

const map = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

const result = {
  '--xs-only': `(max-width: ${(map.sm - 1)}px)`,
  '--xs': `(min-width: ${map.xs}px)`,
  '--sm-only': `(min-width: ${map.sm}px) and (max-width: ${(map.md - 1)}px)`,
  '--sm': `(min-width: ${map.sm}px)`,
  '--md-only': `(min-width: ${map.md}px) and (max-width: ${(map.lg - 1)}px)`,
  '--md': `(min-width: ${map.md}px)`,
  '--lg-only': `(min-width: ${map.lg}px) and (max-width: ${(map.xl - 1)}px)`,
  '--lg': `(min-width: ${map.lg}px)`,
  '--xl-only': `(min-width: ${map.xl}px) and (max-width: ${(map.xxl - 1)}px)`,
  '--xl': `(min-width: ${map.xl}px)`,
  '--xxl': `(min-width: ${map.xxl}px)`,
};

it("works example", () => {
  expect(mobileFirst(map)).toEqual(result);
});
