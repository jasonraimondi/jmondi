import { autoUpdater, BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";

export const environment = {
  isMac: process.platform === "darwin",
  isDev: process.env.NODE_ENV !== "production",
};

type Config = {
  mainWindowUrl: string;
  shouldAutoUpdate?: boolean;
}

export class WindowManager {
  private readonly windows: Map<string, BrowserWindow> = new Map();
  private readonly mainWindowUrl: string;

  constructor(config: Config) {
    this.mainWindowUrl = config.mainWindowUrl;

    if (config.shouldAutoUpdate) autoUpdater.checkForUpdates();
  }

  reload(): void {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      window.loadURL(this.mainWindowUrl);
    }
  }

  reloadAll() {
    this.windows.forEach((window: BrowserWindow, _id: string) => {
      window.loadURL(this.mainWindowUrl);
    });
  }

  async focusOrCreate(): Promise<void> {
    const window = this.lastWindow;
    if (window) {
      window.focus();
    } else {
      await this.createWindow();
    }
  }

  async createWindow(options: Partial<BrowserWindowConstructorOptions> = {}): Promise<BrowserWindow> {
    const browserOptions: BrowserWindowConstructorOptions = {
      title: "Default Window",
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

    await window.loadURL(this.mainWindowUrl);

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
