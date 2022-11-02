import cookies, { CookieAttributes } from "js-cookie";

export abstract class AbstractStorage {
  abstract readonly adapter: Storage;

  readonly storagePrefix: string;

  constructor(storagePrefix: string = "") {
    this.storagePrefix = storagePrefix;
  }

  get<T>(key: string): T | null {
    return fromStore<T>(this.adapter.getItem(this.storagePrefix + key));
  }

  set(key: string, value?: unknown): boolean {
    try {
      this.adapter.setItem(this.storagePrefix + key, toStore(value));
      return true;
    } catch (e) {
    }
    return false;
  }

  remove(key: string) {
    this.adapter.removeItem(this.storagePrefix + key);
  }

  clear(): void {
    this.adapter.clear();
  }
}

export class LocalStorage extends AbstractStorage {
  readonly adapter = window.localStorage;
}

export class SessionStorage extends AbstractStorage {
  readonly adapter = window.sessionStorage;
}

export class CookieStorage {
  readonly storagePrefix: string;

  constructor(storagePrefix: string = "") {
    this.storagePrefix = storagePrefix;
  }

  get<T>(key: string): T | null {
    return fromStore(cookies.get(this.storagePrefix + key));
  }

  remove(key: string, options?: CookieAttributes): void {
    cookies.remove(this.storagePrefix + key, options);
  }

  set(key: string, value: unknown, options?: CookieAttributes): void {
    cookies.set(this.storagePrefix + key, toStore(value), options);
  }
}

function toStore(value: unknown): string {
  if (value === undefined) value = null;
  return JSON.stringify(value);
}

function fromStore<T>(item: unknown): T | null {
  if (typeof item !== "string" || item === "null") {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch (e) {
  }

  return null;
}