export class Route<Params extends Record<string, string|number>> {
  constructor(public readonly template: string) {}


  create(params?: Params) {
    let result = this.template;

    const matches = result.match(/:[a-z_-]+/g) ?? [];

    if (!params || matches.length === 0) return result;

    for (const match of matches) {
      const isOptional = match.slice(-1) === "?";
      let key = match.slice(1, match.length);
      if (isOptional) key = key.slice(0, -1);
      if (params[key]) result = result.replace(match, `${params[key]}`)
    }

    return result;
  }
}
