/**
 * Tipos de datos para la respuesta de la API de OpenWeatherMap
 */

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export interface WeatherError {
  message: string;
  cod?: string;
}
