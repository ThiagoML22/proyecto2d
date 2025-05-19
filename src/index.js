import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import GamePlatform from './components/gameplatform';
import './components/index.css';

// Comprobar si estamos usando Electron o ejecutando como aplicación web
const isElectron = window.electronAPI !== undefined;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si estamos en Electron, cargar datos del sistema
    if (isElectron) {
      Promise.all([
        window.electronAPI.getUserData(),
        window.electronAPI.getGames()
      ])
      .then(([user, games]) => {
        setUserData(user);
        setGamesData(games);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error cargando datos:', err);
        setError('Error al cargar los datos de la aplicación');
        setIsLoading(false);
      });
    } else {
      // Si estamos en navegador web, usar datos de muestra
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">GameHub 2D</h1>
          <p>Cargando plataforma...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <button 
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return <GamePlatform electronData={isElectron ? { userData, gamesData } : null} />;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);