export class LocalStorage {
  constructor(private readonly storagePrefix: string = "@jmondi.") {
  }

  get<T>(key: string): T | null {
    const item = window.localStorage.getItem(this.storagePrefix + key);

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

  set(key: string, value: any): boolean {
    if (value === undefined) {
      value = null;
    } else {
      value = JSON.stringify(value);
    }

    try {
      window.localStorage.setItem(this.storagePrefix + key, value);
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  remove(key: string) {
    window.localStorage.removeItem(this.storagePrefix + key);
  }
}
