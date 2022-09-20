
// https://type-level-typescript.com/
type ParseUrlParams<url> =
  url extends `${infer path}(${infer optionalPath})`
    ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
    : url extends `${infer start}/${infer rest}`
      ? ParseUrlParams<start> & ParseUrlParams<rest>
      : url extends `:${infer param}`
        ? { [k in param]: string | number }
        : {};

export class Route<T extends string> {
  constructor(public readonly template: T) {
  }

  create(params: ParseUrlParams<T> = {}) {
    let url = Object.entries<string>(params).reduce<string>(
      (path, [key, value]) => path.replace(`:${key}`, value),
      this.template,
    );

    url = url.replace(/(\(|\)|\/?:[^\/]+)/g, "");

    return url;
  }
}

export const route = (template: string) => new Route(template);
export default route;
