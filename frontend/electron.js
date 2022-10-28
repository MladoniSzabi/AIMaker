const { app, BrowserWindow } = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  tryLoadUntillSucceed = () => {
    win.loadURL('http://localhost:5000').then(() => {}, (reason) => {
      console.log("Trying")
      setTimeout(tryLoadUntillSucceed, 1000)
    })
  }

  tryLoadUntillSucceed()
}

console.log("Waiting")
app.whenReady().then(() => {
  console.log("Ready")
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
