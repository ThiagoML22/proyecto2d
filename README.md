# GameHub 2D

Plataforma de juegos 2D desarrollada con React y Electron, que permite a los usuarios gestionar, descargar y jugar a sus juegos favoritos tanto en versión web como aplicación de escritorio.

## 🚀 Características Principales

- Interfaz moderna y responsive con Tailwind CSS
- Modo escritorio con Electron
- Gestión de biblioteca de juegos
- Sistema de descargas e instalación
- Perfil de usuario personalizable
- Carrito de compras integrado

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)


## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [https://github.com/ThiagoML22/proyecto2d.git]
cd proyecto2d
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
# Para versión web
npm run dev

# Para versión escritorio
npm run electron-dev
```

## 📁 Estructura del Proyecto

```
proyecto2d/
├── electron/
│   ├── main.js         # Proceso principal de Electron
│   └── preload.js      # Script de precarga para APIs seguras
├── public/
│   └── assets/         # Recursos estáticos
├── src/
│   ├── components/     # Componentes React
│   └── index.js        # Punto de entrada React
└── package.json        # Dependencias y scripts
```

## 🔧 Tecnologías Utilizadas

- **React**: Framework de UI
- **Electron**: Framework para aplicaciones de escritorio
- **Tailwind CSS**: Framework de estilos utilitarios
- **Node.js**: Entorno de ejecución

## 💻 Características Técnicas

### Gestión de Estado
- Manejo de estado local con React Hooks
- Persistencia de datos con sistema de archivos local

### Seguridad
- Aislamiento de contexto en Electron
- Comunicación segura entre procesos
- Sin integración Node.js directa en el renderer

### Interfaz de Usuario
- Diseño responsivo
- Temas oscuros
- Feedback visual en operaciones

## 🎮 Uso

### Versión Web
1. Ejecutar `npm run dev`
2. Abrir navegador en `http://localhost:3000`

### Versión Escritorio
1. Ejecutar `npm run electron-dev`
2. La aplicación se iniciará automáticamente

## ⚙️ Configuración

La aplicación almacena la configuración en:
- Windows: `%APPDATA%/[nombre-app]/config.json`
- macOS: `~/Library/Application Support/[nombre-app]/config.json`
- Linux: `~/.config/[nombre-app]/config.json`

## 🐛 Solución de Problemas

- **Error de conexión**: Verificar que el servidor de desarrollo esté activo
- **Problemas de instalación**: Limpiar caché de npm (`npm cache clean --force`)
- **Electron no inicia**: Verificar que todas las dependencias estén instaladas
