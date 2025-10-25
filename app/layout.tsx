import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aplicación del Clima",
  description: "Consulta el clima actual de cualquier ciudad del mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
