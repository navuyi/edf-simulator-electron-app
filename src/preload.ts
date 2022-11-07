import {ipcRenderer, contextBridge} from "electron"

// This setup is taken from Electron React Boilerplate webpage | Advanced -> Electron Store
contextBridge.exposeInMainWorld('electron', {
    store: {
        get(key:string) {
            return ipcRenderer.sendSync('electron-store-get', key);
        },
        set(key:string, payload:any) {
            ipcRenderer.send('electron-store-set', key, payload);
        },
        // Other method you want to add like has(), reset(), etc.
    },
    // Any other methods you want to expose in the window object.
    // ...
});