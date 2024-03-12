const { app, BrowserWindow } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default

const createWindow = () => {
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
  })
  const win = new BrowserWindow({
    ...winState.winOptions,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.ts'),
    },
    show: false,
  })

  win.loadURL('http://blog.helloworld.center/')
  //打开开发工具
  win.webContents.openDevTools()

  winState.manage(win)

  win.on('ready-to-show', () => {
    win.show()
  })
}

app
  .whenReady()
  .then(() => {
    createWindow()

    app.on('activate', () => {
      // 在 macOS 系统内, 如果没有已开启的应用窗口
      // 点击托盘图标时通常会重新创建一个新窗口
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  .catch((err) => {
    console.log(111)
    console.log(err)
  })

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
