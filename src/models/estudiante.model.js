import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  tipoDocumento: { type: String, required: true },
  numeroDocumento: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  grado: { type: String },
  jornada: { type: String, enum: ["mañana", "tarde", "única"], required: true },
  registroPrestamos: [
    {
      libro: String,
      fechaPrestamo: { type: Date, default: Date.now },
      fechaDevolucion: { type: Date },
      devuelto: { type: Boolean, default: false },
    },
  ],
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  estado: { type: String, enum: ["retirado", "estudiando"], required: true },
});

export default mongoose.model("Estudiante", usuarioSchema);