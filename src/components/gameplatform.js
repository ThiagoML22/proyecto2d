import React, { useState } from 'react';

const GamePlatform = ({ electronData }) => {
  const [activeSection, setActiveSection] = useState('store');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Datos de muestra para modo web
  const sampleData = {
    userData: {
      username: "Usuario2D",
      avatar: "/assets/default-avatar.png",
      friends: 12,
      gamesOwned: 8,
      level: 5
    },
    gamesData: {
      installed: [
        {
          id: 1,
          title: "Super Adventure 2D",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Super+Adventure+2D",
          lastPlayed: "Hace 2 días",
          category: "adventure"
        }
      ],
      library: [
        {
          id: 1,
          title: "Super Adventure 2D",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Super+Adventure+2D",
          price: 19.99,
          category: "adventure",
          description: "Un emocionante juego de aventuras en 2D",
          discount: 0
        },
        {
          id: 2,
          title: "Pixel Warriors",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Pixel+Warriors",
          price: 14.99,
          category: "action",
          description: "Batalla épica en un mundo pixel art",
          discount: 25
        },
        {
          id: 3,
          title: "Platform Master",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Platform+Master",
          price: 9.99,
          category: "platformer",
          description: "Desafiante juego de plataformas",
          discount: 0
        },
        {
          id: 4,
          title: "Dungeon Explorer",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Dungeon+Explorer",
          price: 24.99,
          category: "rpg",
          description: "Explora mazmorras llenas de tesoros y peligros",
          discount: 15
        },
        {
          id: 5,
          title: "Space Shooter Deluxe",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Space+Shooter",
          price: 12.99,
          category: "action",
          description: "Intensas batallas espaciales en 2D",
          discount: 0
        },
        {
          id: 6,
          title: "Puzzle Master",
          image: "https://placehold.co/600x400/1a1a1a/white?text=Puzzle+Master",
          price: 7.99,
          category: "puzzle",
          description: "Desafía tu mente con complejos rompecabezas",
          discount: 50
        }
      ],
      featured: [
        {
          id: 7,
          title: "Epic Quest 2D",
          image: "https://placehold.co/1920x600/1a1a1a/white?text=Epic+Quest+2D",
          price: 29.99,
          category: "rpg",
          description: "La aventura más épica jamás contada en 2D",
          discount: 10
        },
        {
          id: 8,
          title: "Racing Legends",
          image: "https://placehold.co/1920x600/1a1a1a/white?text=Racing+Legends",
          price: 19.99,
          category: "racing",
          description: "Compite en las pistas más desafiantes",
          discount: 0
        }
      ]
    }
  };

  const data = electronData || sampleData;
  const { userData, gamesData } = data;
  
  // Asegurar que todas las propiedades de gamesData existan para evitar errores
  if (!gamesData.featured) gamesData.featured = [];
  if (!gamesData.library) gamesData.library = [];
  if (!gamesData.installed) gamesData.installed = [];

  // Renderizar precio con descuento
  const renderPrice = (price, discount) => {
    if (discount > 0) {
      const discountedPrice = price - (price * discount / 100);
      return (
        <div className="flex items-center space-x-2">
          <span className="bg-green-600 text-xs px-2 py-1 rounded">-{discount}%</span>
          <span className="text-gray-400 line-through text-sm">${price.toFixed(2)}</span>
          <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
        </div>
      );
    }
    return <span className="text-lg font-bold">${price.toFixed(2)}</span>;
  };

  return (
    <div className="flex h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Barra lateral */}
      <div className="w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 flex flex-col shadow-xl">
        <div className="p-4 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-gradient">GameHub 2D</h1>
        </div>
        
        {/* Navegación principal */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                className={`nav-button ${activeSection === 'store' ? 'nav-button-active' : 'nav-button-inactive'}`}
                onClick={() => setActiveSection('store')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span>Tienda</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${activeSection === 'library' ? 'nav-button-active' : 'nav-button-inactive'}`}
                onClick={() => setActiveSection('library')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span>Biblioteca</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${activeSection === 'friends' ? 'nav-button-active' : 'nav-button-inactive'}`}
                onClick={() => setActiveSection('friends')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Amigos</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${activeSection === 'downloads' ? 'nav-button-active' : 'nav-button-inactive'}`}
                onClick={() => setActiveSection('downloads')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Descargas</span>
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Perfil de usuario */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <img 
              src={userData.avatar} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div>
              <p className="font-semibold">{userData.username}</p>
              <p className="text-xs text-gray-400">Nivel {userData.level}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'store' && (
          <div className="p-6">
            {/* Carrusel de juegos destacados */}
            <div className="mb-10">
              <div className="relative rounded-xl overflow-hidden group h-80">
                {/* Carrusel simple con 2 imágenes */}
                <div className="relative h-full">
                  {gamesData.featured.map((game, index) => (
                    <div key={game.id} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: index === 0 ? 1 : 0}}>
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-8">
                        <h2 className="text-4xl font-bold mb-2">{game.title}</h2>
                        <p className="text-gray-300 mb-4">{game.description}</p>
                        <div className="flex items-center space-x-4">
                          {renderPrice(game.price, game.discount)}
                          <button className="primary-button">
                            Comprar ahora
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Controles del carrusel */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Filtros de categorías */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Explorar juegos</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('all')}
                >
                  Todos
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'action' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('action')}
                >
                  Acción
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'adventure' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('adventure')}
                >
                  Aventura
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'rpg' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('rpg')}
                >
                  RPG
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'platformer' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('platformer')}
                >
                  Plataformas
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'puzzle' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory('puzzle')}
                >
                  Puzzle
                </button>
              </div>
            </div>
            
            {/* Grid de juegos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.library
                .filter(game => activeCategory === 'all' || game.category === activeCategory)
                .map(game => (
                  <div
                    key={game.id}
                    className="game-card hover-glow"
                  >
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="game-card-image"
                      />
                      {game.discount > 0 && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{game.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{game.description}</p>
                      <div className="flex items-center justify-between">
                        {renderPrice(game.price, game.discount)}
                        <button className="secondary-button">
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeSection === 'library' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Tu biblioteca</h2>
            {gamesData.installed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamesData.installed.map(game => (
                  <div
                    key={game.id}
                    className="game-card hover-glow"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">Última vez jugado: {game.lastPlayed}</p>
                      <div className="flex space-x-2">
                        <button className="primary-button flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                          Jugar
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No hay juegos instalados</h3>
                <p className="text-gray-400 mb-4">Explora la tienda para encontrar juegos</p>
                <button 
                  className="secondary-button"
                  onClick={() => setActiveSection('store')}
                >
                  Ir a la tienda
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'friends' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Amigos</h2>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Lista de amigos</h3>
              <p className="text-gray-400 mb-4">Tienes {userData.friends} amigos</p>
              <button className="secondary-button">
                Añadir amigo
              </button>
            </div>
          </div>
        )}
        
        {activeSection === 'downloads' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Descargas</h2>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No hay descargas activas</h3>
              <p className="text-gray-400 mb-4">Tus juegos comprados aparecerán aquí</p>
              <button 
                className="secondary-button"
                onClick={() => setActiveSection('store')}
              >
                Explorar juegos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlatform;