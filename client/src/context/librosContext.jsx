import { createContext, useContext, useState } from "react";
import {
  guardarLibro,
  getLibroRequest,
  getLibrosRequest,
  editarLibro, // Importa la nueva función
  eliminarLibro, // Importa la nueva función
  getVistaPreviaLibros,
  getVistaPreviaLibro,
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

  const vistaPreviaLibros = async () => {
    try {
      const res = await getVistaPreviaLibros();
      setLibros(res.data); // Asegúrate de que `res.data` sea un array
      return res.data; // Retorna `res.data` para que esté disponible en `VistaPreviaLibros`
    } catch (error) {
      console.error("Error al obtener libros:", error);
      return []; // Retorna un array vacío en caso de error para evitar `undefined`
    }
  };
  

  const vistaPreviaLibro = async (nombreLibro) => {
    try {
      const res = await getVistaPreviaLibro(nombreLibro);
      console.log(res);
      
      return res.data;
    } catch (error) {
      console.error("Error al obtener libro:", error);
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
        vistaPreviaLibros,
        vistaPreviaLibro,
      }}
    >
      {children}
    </LibrosContext.Provider>
  );
};
