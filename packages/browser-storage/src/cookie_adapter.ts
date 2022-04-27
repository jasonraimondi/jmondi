import cookies from "js-cookie";

export class CookieAdapter {
  clear(): void {
  }

  getItem(key: string): string | null {
    return cookies.get(key) ?? null;
  }

  removeItem(key: string): void {
    return cookies.remove(key);
  }

  setItem(key: string, value: string): void {
    cookies.set(key, value);
  }
}