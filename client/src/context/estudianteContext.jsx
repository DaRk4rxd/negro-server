import { createContext, useContext, useState } from "react";
import {
  guardarEstudiante,
  getEstudianteRequest,
  getEstudiantesRequest,
  actualizarEstudiante,
  eliminarEstudianteRequest,
} from "../api/estudiantes";

const EstudiantesContext = createContext();

export const useEstudiantes = () => {
  const context = useContext(EstudiantesContext);

  if (!context)
    throw new Error(
      "useEstudiantes must be used within an EstudiantesProvider" //ERRORRRRRRRRRRRRR
    );

  return context;
};

export const EstudiantesProvider = ({ children }) => {
  const [estudiantes, setEstudiantes] = useState([]);

  const crearEstudiante = async (estudiante) => {
    try {
      const res = await guardarEstudiante(estudiante);
      await getEstudiantes(); // Actualiza la lista de estudiantes
    } catch (error) {
      console.log(error);
    }
  };

  const getEstudiantes = async () => {
    try {
      const res = await getEstudiantesRequest();
      setEstudiantes(res.data);
    } catch (error) {
      console.log("Error encontrado en contexto" + error);
    }
  };

  const getEstudiante = async (numeroDocumento) => {
    try {
      const res = await getEstudianteRequest(numeroDocumento);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editarEstudiante = async (numeroDocumento, datosActualizados) => {
    try {
      await actualizarEstudiante(numeroDocumento, datosActualizados);
      await getEstudiantes();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarEstudiante = async (numeroDocumento) => {
    try {
      await eliminarEstudianteRequest(numeroDocumento);
      await getEstudiantes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EstudiantesContext.Provider
      value={{
        estudiantes,
        crearEstudiante,
        getEstudiantes,
        getEstudiante,
        editarEstudiante,
        eliminarEstudiante,
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};
