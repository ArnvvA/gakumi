const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 292,
        height: 420,
        resizable: false, // Prevent resizing
        frame: false, // Remove window frame
        transparent: true, // Make background transparent
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // If you have a preload script
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');

    //mainWindow.setBounds({ x: 0, y: 0, width: 292, height: 430 });
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
