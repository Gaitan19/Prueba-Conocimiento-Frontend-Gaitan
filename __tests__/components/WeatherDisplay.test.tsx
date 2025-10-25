import { render, screen } from '@testing-library/react';
import WeatherDisplay from '@/app/components/WeatherDisplay';
import { WeatherData } from '@/app/types/weather';

const mockWeatherData: WeatherData = {
  name: 'Madrid',
  main: {
    temp: 22.5,
    humidity: 65,
    feels_like: 21.3,
    temp_min: 20.0,
    temp_max: 25.0,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'cielo claro',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.5,
  },
  sys: {
    country: 'ES',
  },
};

describe('WeatherDisplay', () => {
  it('muestra el nombre de la ciudad y país correctamente', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    expect(screen.getByText(/madrid, es/i)).toBeInTheDocument();
  });

  it('muestra la temperatura correctamente', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    expect(screen.getByText(/23°c/i)).toBeInTheDocument();
  });

  it('muestra la descripción del clima', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    expect(screen.getByText(/cielo claro/i)).toBeInTheDocument();
  });

  it('muestra la humedad correctamente', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    expect(screen.getByText(/65%/)).toBeInTheDocument();
  });

  it('muestra la sensación térmica', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    const feelsLike = Math.round(mockWeatherData.main.feels_like);
    expect(screen.getByText(new RegExp(`${feelsLike}°C`, 'i'))).toBeInTheDocument();
  });

  it('muestra el icono del clima con la URL correcta', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    const img = screen.getByAltText(/cielo claro/i);
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('openweathermap.org')
    );
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('01d')
    );
  });

  it('muestra la velocidad del viento', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    // La velocidad del viento se convierte de m/s a km/h (3.5 * 3.6 = 12.6 ≈ 13)
    expect(screen.getByText(/13 km\/h/i)).toBeInTheDocument();
  });

  it('muestra las temperaturas mínima y máxima', () => {
    render(<WeatherDisplay weather={mockWeatherData} />);

    expect(screen.getByText(/20° \/ 25°/i)).toBeInTheDocument();
  });
});
