'use client';

import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';
import SearchInput from './components/SearchInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherByCity } from './services/weatherService';
import { WeatherData } from './types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError('');
    setWeather(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <main className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <WiDaySunny className="text-5xl md:text-6xl" />
            Aplicación del Clima
          </h1>
          <p className="text-white/90 text-lg">
            Consulta el clima actual de cualquier ciudad del mundo
          </p>
        </div>

        <div className="flex flex-col items-center">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          
          {error && <ErrorMessage message={error} />}
          
          {weather && <WeatherDisplay weather={weather} />}
        </div>
      </main>
    </div>
  );
}
