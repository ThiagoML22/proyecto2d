// Archivo preload.js - Puente entre el proceso principal (Electron) y el renderer (React)
const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs seguras al proceso de renderizado
contextBridge.exposeInMainWorld(
  'electronAPI',
  {
    // Datos del usuario
    getUserData: () => ipcRenderer.invoke('get-user-data'),
    
    // Obtener juegos (instalados y biblioteca)
    getGames: () => ipcRenderer.invoke('get-games'),
    
    // Gestión de juegos
    downloadGame: (gameId) => ipcRenderer.invoke('download-game', gameId),
    uninstallGame: (gameId) => ipcRenderer.invoke('uninstall-game', gameId),
    
    // Compras
    purchaseGames: (cartItems) => ipcRenderer.invoke('purchase-games', cartItems),
    
    // Escuchar eventos
    onDownloadProgress: (callback) => {
      ipcRenderer.on('download-progress', (event, data) => callback(data));
    },
    onDownloadComplete: (callback) => {
      ipcRenderer.on('download-complete', (event, data) => callback(data));
    },
    
    // Eliminar escuchadores de eventos
    removeProgressListeners: () => {
      ipcRenderer.removeAllListeners('download-progress');
      ipcRenderer.removeAllListeners('download-complete');
    }
  }
);