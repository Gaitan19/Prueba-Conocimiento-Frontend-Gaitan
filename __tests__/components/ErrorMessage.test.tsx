import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/app/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renderiza el mensaje de error correctamente', () => {
    const errorText = 'Ciudad no encontrada';
    render(<ErrorMessage message={errorText} />);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it('tiene el role de alerta', () => {
    render(<ErrorMessage message="Error de prueba" />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('muestra el icono de error', () => {
    const { container } = render(<ErrorMessage message="Error" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renderiza diferentes mensajes de error', () => {
    const { rerender } = render(<ErrorMessage message="Error 1" />);
    expect(screen.getByText('Error 1')).toBeInTheDocument();

    rerender(<ErrorMessage message="Error 2" />);
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });
});
