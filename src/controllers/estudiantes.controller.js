import Estudiante from "../models/estudiante.model.js";

export const guardarEstudiante = async (req, res) => {
  try {
    const nuevoUsuario = new Estudiante(req.body);
    await nuevoUsuario.save();
    res.status(201).send(nuevoUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getEstudiante = async (req, res) => {
  try {
    const usuario = await Estudiante.findOne({
      numeroDocumento: req.params.numeroDocumento,
    });
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.send(usuario);
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

export const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().sort({ nombres: 1, apellidos: 1 });
    res.json(estudiantes); // Devuelve la lista de estudiantes en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los estudiantes" }); 
  }
};

export const actualizarEstudiante = async (req, res) => {
  try {
    const estudianteActualizado = await Estudiante.findOneAndUpdate(
      { numeroDocumento: req.params.numeroDocumento },
      req.body,
      { new: true, runValidators: true } // Devuelve el estudiante actualizado y aplica validaciones
    );

    if (!estudianteActualizado) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }

    res.status(200).send(estudianteActualizado);
  } catch (error) {
    res.status(400).send({ message: "Error al actualizar el estudiante", error });
  }
};

// Controlador para eliminar un estudiante
export const eliminarEstudiante = async (req, res) => {
  try {
    const estudianteEliminado = await Estudiante.findOneAndDelete({
      numeroDocumento: req.params.numeroDocumento,
    });

    if (!estudianteEliminado) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }

    res.status(200).send({ message: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el estudiante", error });
  }
};