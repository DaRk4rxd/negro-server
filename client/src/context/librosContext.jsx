import { createContext, useContext, useState } from "react";
import {
  guardarLibro,
  getLibroRequest,
  getLibrosRequest,
  editarLibro, // Importa la nueva función
  eliminarLibro, // Importa la nueva función
} from "../api/libros";

const LibrosContext = createContext();

export const useLibros = () => {
  const context = useContext(LibrosContext);

  if (!context) {
    throw new Error("useLibros must be used within a LibrosProvider");
  }

  return context;
};

export const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);

  const crearLibro = async (libro) => {
    try {
      const res = await guardarLibro(libro);
      await getLibros(); // Vuelve a cargar la lista de libros
    } catch (error) {
      console.error("Error al crear libro:", error);
    }
  };

  const getLibros = async () => {
    try {
      const res = await getLibrosRequest();
      setLibros(res.data);
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  const getLibro = async (nombreLibro) => {
    try {
      const res = await getLibroRequest(nombreLibro);
      return res.data;
    } catch (error) {
      console.error("Error al obtener libro:", error);
    }
  };

  const actualizarLibro = async (nombreLibro, datosActualizados) => {
    try {
      const res = await editarLibro(nombreLibro, datosActualizados);
      await getLibros(); // Vuelve a cargar la lista de libros
    } catch (error) {
      console.error("Error al actualizar libro:", error);
    }
  };

  const borrarLibro = async (id) => {
    try {
      const res = await eliminarLibro(id);
      await getLibros(); // Vuelve a cargar la lista de libros
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  return (
    <LibrosContext.Provider
      value={{
        libros,
        crearLibro,
        getLibro,
        getLibros,
        actualizarLibro,
        borrarLibro,
      }}
    >
      {children}
    </LibrosContext.Provider>
  );
};
