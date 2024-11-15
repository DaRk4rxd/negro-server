import axios from "./axios";

export const guardarEstudiante = async (estudiante) => axios.post("/guardarEstudiante", estudiante);

export const getEstudianteRequest = async (numeroDocumento) => axios.get(`/getEstudiante/${numeroDocumento}`);

export const getEstudiantesRequest = async () => axios.get(`/getEstudiantes`); 

export const actualizarEstudiante = (numeroDocumento, datosActualizados) => axios.put(`/estudiantes/${numeroDocumento}`, datosActualizados);

export const eliminarEstudianteRequest = (numeroDocumento) => axios.delete(`/estudiantes/${numeroDocumento}`);
