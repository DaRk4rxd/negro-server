import axios from "./axios";

export const guardarLibro = async (libro) => axios.post("/guardarLibro", libro);

export const getLibroRequest = async (nombreLibro) =>
  axios.get(`/getLibro/${nombreLibro}`);

export const getLibrosRequest = async () => axios.get(`/getLibros`);

// Nueva función para editar un libro
export const editarLibro = async (nombreLibro, datosActualizados) =>
  axios.put(`/editarLibro/${nombreLibro}`, datosActualizados);

// Nueva función para eliminar un libro enviando el ID correcto
export const eliminarLibro = async (id) =>
  axios.delete(`/eliminarLibro/${id}`);
