import { autoUpdater, BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";

export const environment = {
  isMac: process.platform === "darwin",
  isDev: process.env.NODE_ENV !== "production",
};

export type Config = {
  mainUrl: string;
  shouldAutoUpdate?: boolean;
};

export class WindowManager {
  private readonly windows = new Map<string, BrowserWindow>();
  private readonly mainUrl: string;

  constructor(config: Config) {
    this.mainUrl = config.mainUrl;
    if (config.shouldAutoUpdate) autoUpdater.checkForUpdates();
  }

  async reload(): Promise<void> {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      await window.loadURL(this.mainUrl);
    }
  }

  async reloadAll(): Promise<void> {
    for (const window of this.windows.values()) {
      await window.loadURL(this.mainUrl);
    }
  }

  async focusOrCreate(): Promise<void> {
    const window = this.lastWindow;
    if (window) {
      window.focus();
    } else {
      await this.createWindow();
    }
  }

  async createWindow(options?: Partial<BrowserWindowConstructorOptions>): Promise<BrowserWindow> {
    const browserOptions: BrowserWindowConstructorOptions = {
      title: "@jmondi/electron-window",
      width: 1440,
      height: 900,
      frame: !environment.isMac,
      titleBarStyle: "hidden",
      resizable: true,
      backgroundColor: "#FFF",
      minHeight: 400,
      minWidth: 500,
      ...options,
    };

    const { height } = screen.getPrimaryDisplay().workAreaSize;

    if (this.lastWindow) {
      browserOptions.x = this.lastWindow.getBounds().x + 20;
      browserOptions.y = this.lastWindow.getBounds().y;
    }

    if (height < (browserOptions.height ?? 0)) {
      browserOptions.height = 900;
      browserOptions.width = 700;
    }

    const window = new BrowserWindow(browserOptions);

    if (environment.isDev) {
      window.webContents.openDevTools();
    }

    const windowId = `window.${window.id}`;

    window.on("closed", () => {
      this.windows.delete(windowId);
    });

    await window.loadURL(this.mainUrl);

    this.windows.set(windowId, window);

    return window;
  }

  private get windowKeys(): string[] {
    return Array.from(this.windows.keys()).map(id => id);
  }

  private get lastWindow(): BrowserWindow | undefined {
    return this.windows.get(this.windowKeys[this.windowKeys.length - 1]);
  }
}
