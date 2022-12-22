// https://type-level-typescript.com/
type ParseUrlParams<url> = url extends `${infer path}(${infer optionalPath})`
  ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
  : url extends `${infer start}/${infer rest}`
  ? ParseUrlParams<start> & ParseUrlParams<rest>
  : url extends `:${infer param}`
  ? { [k in param]: string | number }
  : {};

let RouteGlobalPrefix: string | undefined;

export function setRouteGlobalPrefix(prefix?: string) {
  RouteGlobalPrefix = prefix;
}

export type RouteGroupConfig = {
  prefix?: string;
};

export class RouteGroup {
  constructor(private readonly config: RouteGroupConfig) {}

  add<T extends string>(route: T) {
    return new Route(route, this.config.prefix);
  }
}

export class Route<T extends string> {
  constructor(public readonly template: T, public readonly prefix?: string) {}

  toString(): string {
    return this.template;
  }

  create(params?: ParseUrlParams<T>) {
    if (!params) return this.template;

    let url = Object.entries<string>(params).reduce<string>(
      (path, [key, value]) => path.replace(`:${key}`, value),
      this.template,
    );

    url = url.replace(/(\(|\)|\/?:[^\/]+)/g, "");

    const prefix = this.prefix ?? RouteGlobalPrefix;

    return prefix ? prefix + url : url;
  }
}

export const route = (template: string) => new Route(template);
export default route;
