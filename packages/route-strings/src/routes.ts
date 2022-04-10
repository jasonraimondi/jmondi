export class Route<Params extends Record<string, string|number>> {
  constructor(public readonly template: string) {}


  create(params?: Params) {
    let result = this.template;

    const matches = result.match(/:[a-zA-Z_-]+/g) ?? [];

    if (!params || matches.length === 0) return result;

    for (const match of matches) {
      let key = match.slice(1, match.length);
      if (params[key]) result = result.replace(match, `${params[key]}`)
    }

    return result;
  }
}

export const route = (template: string) => new Route(template);
