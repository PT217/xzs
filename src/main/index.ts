import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from "electron";
import {
  // path,
  join,
} from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
// import { spawn } from "child_process";

// 窗口实例
let mainWindow: BrowserWindow;
let jarProcess;
// 创建窗口
const createWindow = () => {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 999, // 窗口宽
    height: 777, // 窗口高
    resizable: false, // 不可改变窗口大小
    show: false, // 窗口在创建时不立即显示
    frame: false, // 创建无边框窗口
    autoHideMenuBar: true, // 菜单栏自动隐藏
    transparent: true, // 无痕边框透明，可自定义标题栏样式
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      // 预加载脚本配置
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // 加载远程URL或本地html文件
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // 应用关闭后
  mainWindow.on("closed", function () {
    closeJar();
  });
};

// 已准备就绪
app.whenReady().then(() => {
  // 设置应用用户模型id
  electronApp.setAppUserModelId("com.tsfwx.str");

  // 当一个新的 browserWindow 被创建时触发
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  /**
   * 自定义内容
   */
  // 启动 JAR 包
  // startJar();

  // 创建窗口
  createWindow();

  // 设置托盘
  setTray();
});

// 所有窗口关闭时触发
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * 以下为自定义内容
 */
// 关闭
ipcMain.on("close-window", () => {
  closeJar();
  if (mainWindow) {
    // 隐藏，非关闭
    mainWindow.hide();
  }
});
// 最小化
ipcMain.on("min-window", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});
// 限制只可以打开一个应用
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      mainWindow.show();
    }
  });
}
// 启动jar包
// const startJar = () => {
//   if (!jarProcess) {
//     const jarPath = path.resolve("server", "yznrq-pdazs.jar");
//     const jrePath = path.resolve("server", "jre", "bin", "java");
//     jarProcess = spawn(jrePath, ["-jar", jarPath]);

//     jarProcess.stdout.on("data", (data) => {
//       console.log(`stdout: ${data}`);
//     });

//     jarProcess.stderr.on("data", (data) => {
//       console.error(`stderr: ${data}`);
//     });

//     jarProcess.on("close", (code) => {
//       console.log(`child process exited with code ${code}`);
//       jarProcess = null;
//     });
//   }
// };
// 关闭Jar
const closeJar = () => {
  if (jarProcess) {
    // jarProcess.kill('SIGINT')
    jarProcess.kill("SIGTERM");
    jarProcess = null;
  }
};
// 设置托盘
const setTray = () => {
  const tray = new Tray(join(__dirname, "../renderer/icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开程序",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "退出程序",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("electronStr");
  tray.on("double-click", () => {
    mainWindow.show();
  });
  tray.setContextMenu(contextMenu);
};
