import { Router } from "express";
import {
  guardarEstudiante,
  getEstudiante,
  getEstudiantes,
  actualizarEstudiante,
  eliminarEstudiante,
} from "../controllers/estudiantes.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/guardarEstudiante", auth, guardarEstudiante);

router.get("/getEstudiante/:numeroDocumento", auth, getEstudiante);

router.get("/getEstudiantes", auth, getEstudiantes); 
 
// Ruta para actualizar un estudiante
router.put("/estudiantes/:numeroDocumento", auth, actualizarEstudiante);

// Ruta para eliminar un estudiante
router.delete("/estudiantes/:numeroDocumento", auth, eliminarEstudiante);

export default router;