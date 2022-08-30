export class Route<Params extends Record<string, string|number>> {
  constructor(public readonly template: string) {}

  create(params?: Params) {
    let result = this.template;

    if (!params) return result;

    for (let [key, value] of Object.entries(params)) {
      result = result.replace(`:${key}`, `${value}`);
    }

    return result;
  }
}

export const route = (template: string) => new Route(template);
export default route;
