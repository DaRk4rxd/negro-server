import { Router } from "express";
import {
  prestarLibro,
  devolverLibro,
} from "../controllers/prestamos.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/prestarLibro", auth, prestarLibro);

router.post("/devolverLibro", auth, devolverLibro);

export default router;