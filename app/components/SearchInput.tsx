'use client';

import { FormEvent, useState } from 'react';

interface SearchInputProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export default function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="city-input" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Buscar ciudad
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ej: Madrid, Londres, Tokyo"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={isLoading}
            aria-label="Nombre de la ciudad"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Buscar clima"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
}
