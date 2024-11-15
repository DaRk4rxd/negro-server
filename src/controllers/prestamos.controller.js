import Libro from "../models/libro.model.js";
import Estudiante from "../models/estudiante.model.js";

export const prestarLibro = async (req, res) => {
  const { numeroDocumento, tituloLibro } = req.body;

  try {
    const usuario = await Estudiante.findOne({ numeroDocumento });
    const libro = await Libro.findOne({ titulo: tituloLibro });
    console.log("solicitud");
    
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    if (!libro || libro.disponibles === 0) return res.status(404).json({ message: "Libro no disponible" });
    
    usuario.registroPrestamos.push({ libro: libro.titulo, fechaPrestamo: new Date(), devuelto: false });
    libro.disponibles -= 1;
    libro.prestados.push({ usuario: usuario._id, fechaPrestamo: new Date(), devuelto: false, nombreDeEstudiante: usuario.nombres });

    await usuario.save();
    await libro.save();

    res.status(200).json({ message: "Libro prestado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al prestar el libro", error });
  }
};

export const devolverLibro = async (req, res) => {
  const { numeroDocumento, tituloLibro } = req.body;

  try {
    const usuario = await Estudiante.findOne({ numeroDocumento });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const libro = await Libro.findOne({
      'titulo': tituloLibro,
      'prestados.usuario': usuario._id,
      'prestados.devuelto': false
    });

    
    if (!libro) return res.status(404).json({ message: 'El libro no está prestado o ya fue devuelto' });

    const prestamoLibro = libro.prestados.find(
      prestamo => prestamo.usuario.equals(usuario._id) && !prestamo.devuelto
    );
    if (prestamoLibro) {
      prestamoLibro.devuelto = true;
      prestamoLibro.fechaDevolucion = new Date();
    }
    libro.disponibles += 1;

    await libro.save();

    const prestamoUsuario = usuario.registroPrestamos.find(
      prestamo => prestamo.libro === tituloLibro && !prestamo.devuelto
    );
    if (prestamoUsuario) {
      prestamoUsuario.devuelto = true;
      prestamoUsuario.fechaDevolucion = new Date();
    }

    await usuario.save();

    res.status(200).json({ message: 'Libro devuelto exitosamente', libro, usuario });
  } catch (error) {
    console.error('Error al devolver el libro:', error);
    res.status(500).json({ message: 'Hubo un error al procesar la devolución del libro' });
  }
};
