import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Enable Node integration for simplicity in this prototype
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // In development, load Vite dev server URL
  const devUrl = 'http://localhost:5173';
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(devUrl);
  } else {
    // In production, load the built index.html
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
