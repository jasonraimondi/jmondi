function sortInput(map: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(map).sort(([, a], [, b]) => a - b),
  );
}

export function mobileFirst(map: Record<string, number>) {
  const sortedInput = sortInput(map);
  let cnt = 0;
  const values = Object.values(sortedInput);
  const entries = Object.entries(sortedInput);
  const result: Record<string, string> = {};

  for (const [key, breakpoint] of entries) {
    const nextBreakpoint = values[cnt + 1];
    if (cnt === 0) {
      result[`--${key}`] = `(min-width: ${breakpoint}px)`;
      if (nextBreakpoint) result[`--${key}-only`] = `(max-width: ${(nextBreakpoint - 1)}px)`;
    } else if (nextBreakpoint) {
      result[`--${key}`] = `(min-width: ${breakpoint}px)`;
      result[`--${key}-only`] = `(min-width: ${(breakpoint)}px) and (max-width: ${(nextBreakpoint - 1)}px)`;
    } else {
      result[`--${key}`] = `(min-width: ${breakpoint}px)`;
    }
    cnt++;
  }

  return result;
}

