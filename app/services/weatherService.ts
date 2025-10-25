import { WeatherData } from '../types/weather';

/**
 * Obtiene la URL base de la API desde las variables de entorno
 */
function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;
  if (!baseUrl) {
    throw new Error('URL base de la API no configurada');
  }
  return baseUrl;
}

/**
 * Obtiene la API key desde las variables de entorno
 */
function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('API key no configurada');
  }
  return apiKey;
}

/**
 * Obtiene los datos del clima para una ciudad específica
 * @param city - Nombre de la ciudad a buscar
 * @returns Promise con los datos del clima
 * @throws Error si la ciudad no se encuentra o hay un problema con la API
 */
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!city || city.trim() === '') {
    throw new Error('El nombre de la ciudad es requerido');
  }

  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ciudad no encontrada. Por favor verifica el nombre.');
      }
      throw new Error('Error al obtener los datos del clima');
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al obtener los datos del clima');
  }
}
