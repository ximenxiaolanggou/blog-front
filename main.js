const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
  })

  win.loadURL('http://localhost:5173/')
}

app
  .whenReady()
  .then(() => {
    createWindow()
  })
  .catch((err) => {
    console.log(111)
    console.log(err)
  })
