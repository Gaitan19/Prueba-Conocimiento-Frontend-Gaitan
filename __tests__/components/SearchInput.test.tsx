import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '@/app/components/SearchInput';

describe('SearchInput', () => {
  it('renderiza el campo de entrada y el botón correctamente', () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('actualiza el valor del input cuando el usuario escribe', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByLabelText(/nombre de la ciudad/i) as HTMLInputElement;
    
    await user.type(input, 'Madrid');
    
    expect(input.value).toBe('Madrid');
  });

  it('llama a onSearch cuando se envía el formulario con una ciudad válida', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, 'Londres');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Londres');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('no llama a onSearch cuando el input está vacío', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} isLoading={false} />);

    const button = screen.getByRole('button', { name: /buscar clima/i });
    
    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('deshabilita el botón cuando isLoading es true', () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} isLoading={true} />);

    const button = screen.getByRole('button', { name: /buscar clima/i });
    
    expect(button).toBeDisabled();
  });

  it('muestra "Buscando..." cuando isLoading es true', () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} isLoading={true} />);

    expect(screen.getByText(/buscando\.\.\./i)).toBeInTheDocument();
  });

  it('elimina espacios en blanco al enviar', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar clima/i });

    await user.type(input, '  Tokyo  ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Tokyo');
  });
});
