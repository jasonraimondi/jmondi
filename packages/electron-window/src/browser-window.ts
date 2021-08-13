import { autoUpdater, BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";
import { join } from "path";

export const environment = {
  isMac: process.platform === "darwin",
  isDev: process.env.NODE_ENV !== "production",
};

export class WindowManager {
  private windows: Map<string, BrowserWindow> = new Map();

  constructor(private mainWindowUrl: string) {
    autoUpdater.checkForUpdates();
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
      webPreferences: {
        preload: join(__dirname, "../renderer/preload.js"),
        ...options.webPreferences,
      },
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
    const ids = [];
    for (const id of Array.from(this.windows.keys())) {
      ids.push(id);
    }
    console.log({ ids });
    return ids;
  }

  private get lastWindow(): BrowserWindow | undefined {
    return this.windows.get(this.windowKeys[this.windowKeys.length - 1]);
  }
}
