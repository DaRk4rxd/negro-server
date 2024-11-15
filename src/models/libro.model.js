import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  genero: { type: String, required: true },
  categoria: { type: String, required: true },
  editorial: { type: String, required: true },
  idioma: { type: String, required: true },
  descripcion: { type: String },
  cantidad: { type: Number, default: 1, required: true },
  disponibles: { type: Number, default: 1 }, // No se incluirá en el formulario pero se puede modificar en otros lados
  prestados: [
    {
      usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      fechaPrestamo: { type: Date, default: Date.now }, 
      fechaDevolucion: { type: Date },
      devuelto: { type: Boolean, default: false },
      nombreDeEstudiante: { type: String, ref: "Nombres" },
    },
  ],
  pastaDura: { type: String, enum: ["si", "no"], required: true },
});

export default mongoose.model("Libro", libroSchema);
