import { createContext, useContext, useState } from "react";
import { prestarLibroRequest, devolverLibroRequest } from "../api/prestamos";

const PrestamosContext = createContext();

export const usePrestamos = () => {
  const context = useContext(PrestamosContext);
  if (!context)
    throw new Error("usePrestamos must be used within a PrestamosProvider");
  return context;
};

export const PrestamosProvider = ({ children }) => {
  const [prestamo, setPrestamo] = useState([]);

  const prestarLibro = async (prestamos) => {
    try {
      const response = await prestarLibroRequest(prestamos);
      if (response.status === 200) {
        setPrestamo((prev) => [...prev, response.data]); // Actualización de estado
        console.log("Libro prestado exitosamente:", response.data);
        return response; // Puedes devolver la respuesta si es necesario para alguna lógica adicional
      } else {
        console.log("No se pudo prestar el libro:", response.data.message);
        return null; // O devolver algo adecuado si no se pudo prestar
      }
    } catch (error) {
      console.error(
        "Error al prestar el libro:",
        error.response?.data?.message || error.message
      );
      return null; // Manejo de error
    }
  };

  const devolverLibro = async (prestamos) => {
    try {
      const response = await devolverLibroRequest(prestamos);
      setPrestamo((prev) =>
        prev.map((p) =>
          p.libro === prestamos.tituloLibro && !p.devuelto
            ? { ...p, devuelto: true, fechaDevolucion: new Date() }
            : p
        )
      );
      console.log("Libro devuelto exitosamente:", response.data);
    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };

  return (
    <PrestamosContext.Provider
      value={{
        prestamo,
        prestarLibro,
        devolverLibro,
      }}
    >
      {children}
    </PrestamosContext.Provider>
  );
};
