type RouteParams = Record<string, string | number>;

export class Route<Params = RouteParams> {
  private readonly delimiter = ":"

  constructor(public readonly template: string) {}

  create(obj?: Params & RouteParams) {
    let result = this.template;

    if (!obj) return result;

    for (const key of Object.keys(obj)) {
      const regexp = new RegExp(this.getKey(key));
      result = result.replace(regexp, obj[key].toString());
    }

    return result;
  }

  private getKey(key: string) {
    return `${this.delimiter}${key}`;
  }
}