// Código principal para convertir la aplicación web React en una aplicación de escritorio

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

// Variables globales
let mainWindow;
const userDataPath = app.getPath('userData');
const gamesPath = path.join(userDataPath, 'games');
const configPath = path.join(userDataPath, 'config.json');

// Asegurarse de que existen los directorios necesarios
function setupDirectories() {
  if (!fs.existsSync(gamesPath)) {
    fs.mkdirSync(gamesPath, { recursive: true });
  }
  
  // Configuración inicial si no existe
  if (!fs.existsSync(configPath)) {
    const initialConfig = {
      user: {
        username: "Usuario2D",
        avatar: "/assets/default-avatar.png",
        friends: 0,
        gamesOwned: 0
      },
      installedGames: [],
      library: []
    };
    
    fs.writeFileSync(configPath, JSON.stringify(initialConfig, null, 2));
  }
}

// Crear la ventana principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  // Cargar la aplicación
  const startUrl = isDev
    ? 'http://localhost:3000' // Servidor de desarrollo
    : `file://${path.join(__dirname, '../build/index.html')}`; // Versión compilada

  mainWindow.loadURL(startUrl);

  // Abrir DevTools en modo de desarrollo
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Iniciar la aplicación
app.on('ready', () => {
  setupDirectories();
  createWindow();
});

// Salir cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Gestionar eventos IPC para comunicación entre el proceso principal y el renderer
ipcMain.handle('get-user-data', async () => {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    return config.user;
  } catch (error) {
    console.error('Error al leer datos de usuario:', error);
    return null;
  }
});

ipcMain.handle('get-games', async () => {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    return {
      installed: config.installedGames,
      library: config.library
    };
  } catch (error) {
    console.error('Error al leer datos de juegos:', error);
    return { installed: [], library: [] };
  }
});

ipcMain.handle('download-game', async (event, gameId) => {
  try {
    // Simulación de descarga
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    // Buscar el juego en la biblioteca
    const gameToDownload = config.library.find(game => game.id === gameId);
    
    if (!gameToDownload) {
      return { success: false, message: 'Juego no encontrado en la biblioteca' };
    }
    
    // Enviar actualizaciones de progreso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      mainWindow.webContents.send('download-progress', { gameId, progress });
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Agregar juego a instalados
        if (!config.installedGames.some(game => game.id === gameId)) {
          config.installedGames.push(gameToDownload);
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        }
        
        mainWindow.webContents.send('download-complete', { gameId });
      }
    }, 500);
    
    return { success: true, message: 'Descarga iniciada' };
  } catch (error) {
    console.error('Error al descargar juego:', error);
    return { success: false, message: 'Error al iniciar la descarga' };
  }
});

ipcMain.handle('uninstall-game', async (event, gameId) => {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    // Filtrar el juego de la lista de instalados
    config.installedGames = config.installedGames.filter(game => game.id !== gameId);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    return { success: true, message: 'Juego desinstalado correctamente' };
  } catch (error) {
    console.error('Error al desinstalar juego:', error);
    return { success: false, message: 'Error al desinstalar el juego' };
  }
});

ipcMain.handle('purchase-games', async (event, cartItems) => {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    // Agregar juegos a la biblioteca
    cartItems.forEach(item => {
      if (!config.library.some(game => game.id === item.id)) {
        config.library.push(item);
      }
    });
    
    // Actualizar recuento de juegos propiedad del usuario
    config.user.gamesOwned = config.library.length;
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    return { success: true, message: 'Compra completada correctamente' };
  } catch (error) {
    console.error('Error al procesar compra:', error);
    return { success: false, message: 'Error al procesar la compra' };
  }
});