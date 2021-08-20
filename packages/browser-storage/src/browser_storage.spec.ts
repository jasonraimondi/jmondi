import { AbstractStorage } from "./browser_storage";

class MockStorageProvider implements Storage {
  private storage = new Map<string, string | null>();

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  key(_: number): string | null {
    return null;
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  get length() {
    return this.storage.size;
  }
}

class TestStorage extends AbstractStorage {
  constructor(public readonly adapter = new MockStorageProvider(), namespace?: string) {
    super(namespace);
  }
}

describe("abstract storage spec", () => {
  let testStorage: TestStorage;

  beforeEach(() => {
    testStorage = new TestStorage();
  });

  it("can remove values", () => {
    testStorage.set("one", "hello world");
    expect(testStorage.get("one")).toBe("hello world");
    testStorage.remove("one");
    expect(testStorage.get("one")).toBeNull();
  });

  it("can set, get, and clear fields and objects", () => {
    testStorage.set("one", { hello: "world" });
    testStorage.set("2", "hello world");
    testStorage.set("3", null);
    testStorage.set("4");
    expect(testStorage.get("one")).toStrictEqual({ hello: "world" });
    expect(testStorage.get("2")).toBe("hello world");
    expect(testStorage.get("3")).toBeNull();
    expect(testStorage.get("4")).toBeNull();

    testStorage.clear();
    expect(testStorage.get("one")).toBeNull();
    expect(testStorage.get("2")).toBeNull();
    expect(testStorage.get("3")).toBeNull();
    expect(testStorage.get("4")).toBeNull();
  });

  it("namespaces storage", () => {
    const mockStorage = new MockStorageProvider();
    testStorage = new TestStorage(mockStorage, "@testing:");

    mockStorage.setItem("1", "the wrong value");
    testStorage.set("1", "the correct value");

    expect(mockStorage.getItem("1")).toBe("the wrong value");
    expect(testStorage.get("1")).toBe("the correct value");
    expect(mockStorage.getItem("@testing:1")).toBe(JSON.stringify("the correct value"));
  });

  it("catches error", () => {
    const mockStorage = new MockStorageProvider();
    testStorage = new TestStorage(mockStorage);

    const throwable = () => {
      throw new Error();
    };
    JSON.parse = throwable;
    mockStorage.setItem = throwable;

    testStorage.set("1", "hello world");
    expect(testStorage.get("1")).toBeNull();
  });
});
