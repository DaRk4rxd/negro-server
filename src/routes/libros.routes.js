import { Router } from "express";
import {
  guardarLibro,
  getLibro,
  getLibros,
  editarLibro,
  eliminarLibro,
} from "../controllers/libros.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/guardarLibro", auth, guardarLibro);

router.get("/getLibro", auth, getLibro);

router.get("/getLibros", auth, getLibros);

router.put("/editarLibro/:id", auth, editarLibro); // Ruta para editar un libro

router.delete("/eliminarLibro/:id", auth, eliminarLibro); // Ruta para eliminar un libro

export default router;
