# Aplicación del Clima ☀️

Una aplicación web desarrollada con Next.js que permite a los usuarios consultar el clima actual de cualquier ciudad del mundo utilizando la API de OpenWeatherMap.


## Tecnologías Utilizadas

- **Next.js 16** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos
- **Jest** - Framework de pruebas
- **React Testing Library** - Pruebas de componentes
- **OpenWeatherMap API** - Datos meteorológicos

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Gaitan19/Prueba-Conocimiento-Frontend-Gaitan.git
cd Prueba-Conocimiento-Frontend-Gaitan

```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather
```

Para obtener una API key gratuita, visita: https://openweathermap.org/api

## Uso

### Modo de Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Pruebas

### Ejecutar todas las pruebas:
```bash
npm test
```

### Ejecutar pruebas en modo watch:
```bash
npm run test:watch
```

### Ver reporte de cobertura:
```bash
npm run test:coverage
```

La aplicación cuenta con más del 85% de cobertura en branches, functions, lines y statements.

## Estructura del Proyecto

```
.
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── SearchInput.tsx  # Campo de búsqueda
│   │   ├── WeatherDisplay.tsx # Visualización del clima
│   │   └── ErrorMessage.tsx # Mensajes de error
│   ├── services/            # Servicios API
│   │   └── weatherService.ts # Servicio de clima
│   ├── types/               # Definiciones TypeScript
│   │   └── weather.ts       # Tipos de datos del clima
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
├── __tests__/               # Pruebas unitarias
│   ├── components/          # Tests de componentes
│   ├── services/            # Tests de servicios
│   └── page.test.tsx        # Tests de la página principal
├── jest.config.mjs          # Configuración de Jest
├── jest.setup.js            # Setup de Jest
└── next.config.ts           # Configuración de Next.js
```

## Funcionalidades Implementadas

### 1. Interfaz de Usuario
- ✅ Campo de entrada para el nombre de la ciudad
- ✅ Botón de búsqueda con estados de carga
- ✅ Visualización de:
  - Temperatura actual
  - Sensación térmica
  - Humedad
  - Velocidad del viento
  - Temperaturas mínima y máxima

### 2. Funcionalidades
- ✅ Búsqueda de clima por ciudad
- ✅ Manejo de errores (ciudad no encontrada, problemas de red)
- ✅ Validación de entrada
- ✅ Integración con OpenWeatherMap API

### 3. Pruebas Unitarias
- ✅ Pruebas de componentes individuales
- ✅ Pruebas del servicio de API
- ✅ Pruebas de integración de la página principal
- ✅ Pruebas de manejo de errores
- ✅ Cobertura superior al 80%
