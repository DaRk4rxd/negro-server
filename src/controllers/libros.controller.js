import Libro from "../models/libro.model.js";

export const guardarLibro = async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.status(201).send(nuevoLibro);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getLibro = async (req, res) => {
  try {
    
    const { titulo } = req.query;
    const libros = await Libro.find({
      titulo: { $regex: `^${titulo}`, $options: "i" },
    });

    if (libros.length === 0) {
      return res.status(403).json({ message: "No se encontraron libros" });
    }

    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: "Error en la búsqueda de libros" });
  }
};


export const getLibros = async (req, res) => {
  try {
    const libros = await Libro.find(); // Trae todos los libros de la base de datos
    console.log("libros obtenidos");
    res.json(libros); // Envía los libros como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Controlador para actualizar un libro por ID
export const editarLibro = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del libro a actualizar
    const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); // Actualizar el libro con los datos proporcionados en req.body y devolver el nuevo documento actualizado

    if (!libroActualizado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(libroActualizado); // Enviar el libro actualizado al cliente
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el libro" });
  }
};

// Controlador para eliminar un libro por ID
export const eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del libro a eliminar
    const libroEliminado = await Libro.findByIdAndDelete(id); // Eliminar el libro de la base de datos

    if (!libroEliminado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json({ message: "Libro eliminado exitosamente" }); // Confirmación de eliminación
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
