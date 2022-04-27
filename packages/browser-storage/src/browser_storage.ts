import { CookieAdapter } from "./cookie_adapter";

export abstract class AbstractStorage {
  abstract readonly adapter: Storage | CookieAdapter;

  readonly storagePrefix: string;

  constructor(storagePrefix: string = "@jmondi:") {
    this.storagePrefix = storagePrefix;
  }

  get<T>(key: string): T | null {
    const item = this.adapter.getItem(this.storagePrefix + key);

    if (!item || item === "null") {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  set(key: string, value?: any): boolean {
    if (value === undefined) {
      value = null;
    } else {
      value = JSON.stringify(value);
    }

    try {
      this.adapter.setItem(this.storagePrefix + key, value);
    } catch (e) {
      console.log(e);
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

export class CookieStorage extends AbstractStorage {
  readonly adapter = new CookieAdapter();
}

