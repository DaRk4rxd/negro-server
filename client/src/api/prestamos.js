import axios from "./axios";

export const prestarLibroRequest = async (prestamos) =>
  axios.post("/prestarLibro", prestamos);

export const devolverLibroRequest = async (prestamos) =>
  axios.post("/devolverLibro", prestamos);
