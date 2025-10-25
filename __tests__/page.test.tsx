import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import * as weatherService from '@/app/services/weatherService';

jest.mock('@/app/services/weatherService');

const mockWeatherData = {
  name: 'Paris',
  main: {
    temp: 18.5,
    humidity: 60,
    feels_like: 17.2,
    temp_min: 16.0,
    temp_max: 20.0,
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
    speed: 2.5,
  },
  sys: {
    country: 'FR',
  },
};

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el título de la aplicación', () => {
    render(<Home />);
    
    expect(screen.getByText(/aplicación del clima/i)).toBeInTheDocument();
  });

  it('muestra la información del clima después de una búsqueda exitosa', async () => {
    const user = userEvent.setup();
    (weatherService.getWeatherByCity as jest.Mock).mockResolvedValueOnce(
      mockWeatherData
    );

    render(<Home />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, 'Paris');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/paris, fr/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/cielo claro/i)).toBeInTheDocument();
  });

  it('muestra un mensaje de error cuando la ciudad no se encuentra', async () => {
    const user = userEvent.setup();
    (weatherService.getWeatherByCity as jest.Mock).mockRejectedValueOnce(
      new Error('Ciudad no encontrada. Por favor verifica el nombre.')
    );

    render(<Home />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, 'CiudadInvalida');
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/ciudad no encontrada/i)
      ).toBeInTheDocument();
    });
  });

  it('muestra el estado de carga mientras se busca el clima', async () => {
    const user = userEvent.setup();
    (weatherService.getWeatherByCity as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockWeatherData), 100))
    );

    render(<Home />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, 'Paris');
    await user.click(button);

    expect(screen.getByText(/buscando\.\.\./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/paris, fr/i)).toBeInTheDocument();
    });
  });

  it('limpia el error al realizar una nueva búsqueda exitosa', async () => {
    const user = userEvent.setup();
    
    // Primera búsqueda con error
    (weatherService.getWeatherByCity as jest.Mock).mockRejectedValueOnce(
      new Error('Ciudad no encontrada')
    );

    render(<Home />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, 'CiudadInvalida');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/ciudad no encontrada/i)).toBeInTheDocument();
    });

    // Segunda búsqueda exitosa
    (weatherService.getWeatherByCity as jest.Mock).mockResolvedValueOnce(
      mockWeatherData
    );

    await user.clear(input);
    await user.type(input, 'Paris');
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/ciudad no encontrada/i)).not.toBeInTheDocument();
      expect(screen.getByText(/paris, fr/i)).toBeInTheDocument();
    });
  });
});
