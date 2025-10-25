'use client';

import Image from 'next/image';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const { name, main: temperatureData, weather: weatherInfo, wind, sys } = weather;
  const weatherDescription = weatherInfo[0]?.description || '';
  const weatherIcon = weatherInfo[0]?.icon || '';

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {name}, {sys.country}
        </h2>

        {weatherIcon && (
          <Image
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherDescription}
            width={96}
            height={96}
          />
        )}

        <p className="text-xl text-gray-600 dark:text-gray-300 capitalize mb-4">
          {weatherDescription}
        </p>

        <div className="text-6xl font-bold text-gray-800 dark:text-white mb-6">
          {Math.round(temperatureData.temp)}°C
        </div>

        <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Sensación térmica</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {Math.round(temperatureData.feels_like)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Humedad</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {temperatureData.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Viento</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {Math.round(wind.speed * 3.6)} km/h
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Min / Max</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {Math.round(temperatureData.temp_min)}° / {Math.round(temperatureData.temp_max)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
