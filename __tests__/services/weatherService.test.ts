// Mock de las variables de entorno ANTES de importar el servicio
const MOCK_API_KEY = '3c78787451b69941382f2ab76b080223';
const MOCK_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = MOCK_API_KEY;
process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL = MOCK_BASE_URL;

import { getWeatherByCity } from '@/app/services/weatherService';

// Mock de fetch global
global.fetch = jest.fn();

const mockWeatherResponse = {
  name: 'London',
  main: {
    temp: 15.5,
    humidity: 70,
    feels_like: 14.2,
    temp_min: 13.0,
    temp_max: 17.0,
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'nubes dispersas',
      icon: '02d',
    },
  ],
  wind: {
    speed: 4.5,
  },
  sys: {
    country: 'GB',
  },
};

describe('weatherService', () => {
  const originalApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const originalBaseUrl = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = MOCK_API_KEY;
    process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL = MOCK_BASE_URL;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = originalApiKey;
    process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL = originalBaseUrl;
  });

  it('obtiene datos del clima exitosamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    });

    const result = await getWeatherByCity('London');

    expect(result).toEqual(mockWeatherResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=London')
    );
  });

  it('lanza error cuando la ciudad está vacía', async () => {
    await expect(getWeatherByCity('')).rejects.toThrow(
      'El nombre de la ciudad es requerido'
    );
  });

  it('lanza error cuando la ciudad es solo espacios en blanco', async () => {
    await expect(getWeatherByCity('   ')).rejects.toThrow(
      'El nombre de la ciudad es requerido'
    );
  });

  it('lanza error cuando no hay API key configurada', async () => {
    delete process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    await expect(getWeatherByCity('London')).rejects.toThrow(
      'API key no configurada'
    );
  });

  it('lanza error cuando no hay URL base configurada', async () => {
    delete process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

    await expect(getWeatherByCity('London')).rejects.toThrow(
      'URL base de la API no configurada'
    );
  });

  it('lanza error cuando la ciudad no se encuentra (404)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getWeatherByCity('CiudadInvalida')).rejects.toThrow(
      'Ciudad no encontrada. Por favor verifica el nombre.'
    );
  });

  it('lanza error genérico cuando hay un error de red', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getWeatherByCity('London')).rejects.toThrow(
      'Error al obtener los datos del clima'
    );
  });

  it('maneja errores inesperados', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherByCity('London')).rejects.toThrow('Network error');
  });

  it('maneja errores no-Error en el catch', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('String error');

    await expect(getWeatherByCity('London')).rejects.toThrow(
      'Error inesperado al obtener los datos del clima'
    );
  });
});
