import { useState, useEffect } from "react";
import "../styles/modalsFormularios.css";
import { usePrestamos } from "../context/prestamosContext";
import { useEstudiantes } from "../context/estudianteContext";
import { useLibros } from "../context/librosContext"; // Importa el contexto de libros

export function ModalRegistrarEstudiante({ isOpen, onClose, onSubmit }) {
  const initialFormData = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    grado: "",
    jornada: "",
    telefono: "",
    direccion: "",
    estado: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData); // Reiniciar el formulario después de enviar
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormData); // Reiniciar el formulario al cerrar
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrar Estudiante</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nombres"
              placeholder="Nombres"
              required
              value={formData.nombres}
              onChange={handleChange}
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              required
              value={formData.apellidos}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <select
              name="tipoDocumento"
              required
              value={formData.tipoDocumento}
              onChange={handleChange}
            >
              <option value="">Selecciona el tipo de documento</option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="PAS">Pasaporte</option>
              <option value="Otro">Otro</option>
            </select>
            <input
              type="number"
              name="numeroDocumento"
              placeholder="Número de Documento"
              required
              value={formData.numeroDocumento}
              onChange={handleChange}
            />
          </div>

          <input
            type="date"
            name="fechaNacimiento"
            required
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />

          <div className="form-group">
            <input
              type="number"
              name="grado"
              placeholder="Grado"
              value={formData.grado}
              onChange={handleChange}
            />
            <select
              name="jornada"
              required
              value={formData.jornada}
              onChange={handleChange}
            >
              <option value="">Selecciona la jornada</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="única">Única</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              required
              value={formData.telefono}
              onChange={handleChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              required
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          <select
            name="estado"
            required
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="">Selecciona el estado</option>
            <option value="retirado">Retirado</option>
            <option value="estudiando">Estudiando</option>
          </select>

          <button type="submit">Registrar</button>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export function ModalDetallesEstudiante({
  isOpen,
  onClose,
  onRefresh,
  estudiante,
}) {
  if (!isOpen || !estudiante) return null;

  const { editarEstudiante, eliminarEstudiante } =
    useEstudiantes();
    const { devolverLibro } = usePrestamos(); // Cambia a `usePrestamos`
  const [showPrestamos, setShowPrestamos] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [editData, setEditData] = useState(estudiante);

  if (!isOpen || !estudiante) return null;

  const handleShowPrestamos = () => {
    setShowFullDetails(false);
    setShowPrestamos(true);
  };

  const handleShowFullDetails = () => {
    setShowFullDetails(true);
    setShowPrestamos(false);
  };

  const handleBackToEstudiante = () => {
    setShowPrestamos(false);
    setShowFullDetails(false);
  };

  const handleDevolverLibro = (tituloLibro) => {
    devolverLibro({
      numeroDocumento: estudiante.numeroDocumento,
      tituloLibro,
    }).then(() => {
      setConfirmMessage(
        `El libro "${tituloLibro}" ha sido devuelto con éxito.`
      );
      setTimeout(() => {
        setConfirmMessage("");
        onClose();
        onRefresh();
        alert("Libro devuelto correctamente");
      }, 3000);
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = () => {
    editarEstudiante(estudiante.numeroDocumento, editData).then(() => {
      setIsEditing(false);
      onRefresh();
      alert("Estudiante editado correctamente");
    });
  };

  const handleDeleteEstudiante = () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")
    ) {
      eliminarEstudiante(estudiante.numeroDocumento).then(() => {
        onClose();
        onRefresh();
        alert("Estudiante eliminado correctamente");
      });
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // En el componente, asegúrate de pasar la fecha formateada
  const fechaNacimiento = estudiante.fechaNacimiento
    ? formatDate(estudiante.fechaNacimiento)
    : "";

  const prestamosOrdenados = [
    ...estudiante.registroPrestamos.filter((prestamo) => !prestamo.devuelto),
    ...estudiante.registroPrestamos.filter((prestamo) => prestamo.devuelto),
  ].sort((a, b) => new Date(b.fechaPrestamo) - new Date(a.fechaPrestamo));

  return (
    <div className="modal-overlay">
      {showPrestamos ? (
        <div className="modal-content">
          <h2>Registro de Préstamos</h2>
          {confirmMessage && (
            <p className="confirm-message">{confirmMessage}</p>
          )}
          {estudiante.registroPrestamos.length > 0 ? (
            <div className="prestamos-container">
              {prestamosOrdenados.map((prestamo, index) => (
                <div key={index} className="prestamo-item">
                  <p>
                    <strong>Libro:</strong> {prestamo.libro}
                  </p>
                  <p>
                    <strong>Fecha de Préstamo:</strong>{" "}
                    {new Date(prestamo.fechaPrestamo).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de Devolución:</strong>{" "}
                    {prestamo.fechaDevolucion
                      ? new Date(prestamo.fechaDevolucion).toLocaleDateString()
                      : "No devuelto"}
                  </p>
                  <p>
                    <strong>Devuelto:</strong> {prestamo.devuelto ? "Sí" : "No"}
                  </p>
                  {!prestamo.devuelto && (
                    <button onClick={() => handleDevolverLibro(prestamo.libro)}>
                      Devolver
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No hay registros de préstamos.</p>
          )}
          <button type="button" onClick={handleBackToEstudiante}>
            Volver a Detalles del Estudiante
          </button>
        </div>
      ) : showFullDetails ? (
        <div className="modal-content">
          <h2>Detalles Completos del Estudiante</h2>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="nombres"
                value={editData.nombres}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="apellidos"
                value={editData.apellidos}
                onChange={handleEditChange}
              />

              {/* Selección de Tipo de Documento */}
              <select
                name="tipoDocumento"
                value={editData.tipoDocumento}
                onChange={handleEditChange}
              >
                <option value="">Selecciona el tipo de documento</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="PAS">Pasaporte</option>
                <option value="Otro">Otro</option>
              </select>

              <input
                type="text"
                name="numeroDocumento"
                value={editData.numeroDocumento}
                onChange={handleEditChange}
              />

              <input
                type="date"
                name="fechaNacimiento"
                value={fechaNacimiento}
                onChange={handleEditChange}
              />

              <input
                type="text"
                name="grado"
                value={editData.grado}
                onChange={handleEditChange}
              />

              {/* Selección de Jornada */}
              <select
                name="jornada"
                value={editData.jornada}
                onChange={handleEditChange}
              >
                <option value="">Selecciona la jornada</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="única">Única</option>
              </select>

              <input
                type="text"
                name="telefono"
                value={editData.telefono}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="direccion"
                value={editData.direccion}
                onChange={handleEditChange}
              />

              {/* Selección de Estado */}
              <select
                name="estado"
                value={editData.estado}
                onChange={handleEditChange}
              >
                <option value="">Selecciona el estado</option>
                <option value="retirado">Retirado</option>
                <option value="estudiando">Estudiando</option>
              </select>

              <button type="button" onClick={handleEditSave}>
                Guardar Cambios
              </button>
            </div>
          ) : (
            <>
              <p>
                <strong>Nombre:</strong> {estudiante.nombres}{" "}
                {estudiante.apellidos}
              </p>
              <p>
                <strong>Tipo de Documento:</strong> {estudiante.tipoDocumento}
              </p>
              <p>
                <strong>Número de Documento:</strong>{" "}
                {estudiante.numeroDocumento}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(estudiante.fechaNacimiento).toLocaleDateString()}
              </p>
              <p>
                <strong>Grado:</strong> {estudiante.grado}
              </p>
              <p>
                <strong>Jornada:</strong> {estudiante.jornada}
              </p>
              <p>
                <strong>Teléfono:</strong> {estudiante.telefono}
              </p>
              <p>
                <strong>Dirección:</strong> {estudiante.direccion}
              </p>
              <p>
                <strong>Estado:</strong> {estudiante.estado}
              </p>
            </>
          )}
          <button
            type="button"
            className="espacio"
            onClick={handleBackToEstudiante}
          >
            Volver a Información Básica
          </button>
          <button type="button" className="espacio" onClick={handleEditToggle}>
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          <button
            type="button"
            className="btnEliminar"
            onClick={handleDeleteEstudiante}
          >
            Eliminar Estudiante
          </button>
        </div>
      ) : (
        <div className="modal-content">
          <h2>Información Básica del Estudiante</h2>
          <p>
            <strong>Nombre:</strong> {estudiante.nombres} {estudiante.apellidos}
          </p>
          <p>
            <strong>Grado:</strong> {estudiante.grado}
          </p>
          <p>
            <strong>Estado:</strong> {estudiante.estado}
          </p>
          <button type="button" onClick={handleShowFullDetails}>
            Ver Detalles Completos
          </button>
          <br />
          <button type="button" onClick={handleShowPrestamos}>
            Ver Registro de Préstamos
          </button>
          <br />
          <br />
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

// --> LIBROS <--

export function ModalRegistrarLibro({ isOpen, onClose, onSubmit }) {
  const initialFormData = {
    titulo: "",
    autor: "",
    genero: "",
    categoria: "",
    editorial: "",
    idioma: "",
    descripcion: "",
    cantidad: 1,
    pastaDura: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData); // Reiniciar el formulario después de enviar
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormData); // Reiniciar el formulario al cerrar
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrar Libro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            required
            value={formData.titulo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            required
            value={formData.autor}
            onChange={handleChange}
          />
          <input
            type="text"
            name="genero"
            placeholder="Género"
            required
            value={formData.genero}
            onChange={handleChange}
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            required
            value={formData.categoria}
            onChange={handleChange}
          />
          <input
            type="text"
            name="editorial"
            placeholder="Editorial"
            required
            value={formData.editorial}
            onChange={handleChange}
          />
          <input
            type="text"
            name="idioma"
            placeholder="Idioma"
            required
            value={formData.idioma}
            onChange={handleChange}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
          />
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            required
            min="1"
            value={formData.cantidad}
            onChange={handleChange}
          />
          <select
            name="pastaDura"
            required
            value={formData.pastaDura}
            onChange={handleChange}
          >
            <option value="">¿Pasta dura?</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>

          <button type="submit">Registrar</button>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export function ModalDetallesLibro({ isOpen, onClose, libro }) {
  const { getEstudiante } = useEstudiantes();
  const { prestarLibro } = usePrestamos();
  const { borrarLibro } = useLibros(); // Desestructuramos la función de eliminar
  const [showPrestamos, setShowPrestamos] = useState(false);
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [estudianteEncontrado, setEstudianteEncontrado] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNumeroDocumento("");
      setEstudianteEncontrado(null);
    }
  }, [isOpen]);

  if (!isOpen || !libro) return null;

  const handleShowPrestamos = () => setShowPrestamos(true);
  const handleBackToLibro = () => setShowPrestamos(false);

  const buscarEstudiante = async () => {
    const estudiante = await getEstudiante(numeroDocumento);
    setEstudianteEncontrado(estudiante);
    if (!estudiante) {
      alert("Debes ingresar un número de documento registrado");
    }
  };

  const realizarPrestamo = async () => {
    if (!estudianteEncontrado) return;

    const prestamoData = {
      numeroDocumento: estudianteEncontrado.numeroDocumento,
      tituloLibro: libro.titulo,
    };

    try {
      const response = await prestarLibro(prestamoData);
      if (response.status === 200) {
        setConfirmMessage("Libro prestado exitosamente");
        setTimeout(() => setConfirmMessage(""), 3000);
        setNumeroDocumento("");
        setEstudianteEncontrado(null);
        alert("Libro guardado exitosamente");
        onClose();
      } else {
        alert(response?.data?.message || "Error al prestar el libro");
      }
    } catch (error) {
      console.error("Error al realizar el préstamo:", error);
      alert(error?.response?.data?.message || "Error al prestar el libro");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      try {
        await borrarLibro(libro._id); // Llama a la función de eliminación con el id
        alert("Libro eliminado exitosamente");
        onClose(); // Cierra el modal tras la eliminación
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        alert("Error al eliminar el libro");
      }
    }
  };

  const prestamosOrdenados = [
    ...libro.prestados.filter((prestamo) => !prestamo.devuelto),
    ...libro.prestados.filter((prestamo) => prestamo.devuelto),
  ].sort((a, b) => new Date(b.fechaPrestamo) - new Date(a.fechaPrestamo));

  return (
    <div className="modal-overlay">
      {showPrestamos ? (
        <div className="modal-content">
          <h2>Registro de Préstamos</h2>
          {confirmMessage && (
            <p className="confirm-message">{confirmMessage}</p>
          )}
          {libro.prestados.length > 0 ? (
            <div className="prestamos-container">
              {prestamosOrdenados.map((prestamo, index) => (
                <div key={index} className="prestamo-item">
                  <p>
                    <strong>Estudiante:</strong> {prestamo.nombreDeEstudiante}
                  </p>
                  <p>
                    <strong>Fecha de Préstamo:</strong>{" "}
                    {new Date(prestamo.fechaPrestamo).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de Devolución:</strong>{" "}
                    {prestamo.fechaDevolucion
                      ? new Date(prestamo.fechaDevolucion).toLocaleDateString()
                      : "No devuelto"}
                  </p>
                  <p>
                    <strong>Devuelto:</strong> {prestamo.devuelto ? "Sí" : "No"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay registros de préstamos.</p>
          )}
          <button type="button" onClick={handleBackToLibro}>
            Volver a Detalles del Libro
          </button>
        </div>
      ) : (
        <div className="modal-content">
          <h2>Detalles del Libro</h2>
          <p>
            <strong>Título:</strong> {libro.titulo}
          </p>
          <p>
            <strong>Autor:</strong> {libro.autor}
          </p>
          <p>
            <strong>Género:</strong> {libro.genero}
          </p>
          <p>
            <strong>Categoría:</strong> {libro.categoria}
          </p>
          <p>
            <strong>Editorial:</strong> {libro.editorial}
          </p>
          <p>
            <strong>Idioma:</strong> {libro.idioma}
          </p>
          <p>
            <strong>Descripción:</strong> {libro.descripcion || "No disponible"}
          </p>
          <p>
            <strong>Cantidad Total:</strong> {libro.cantidad}
          </p>
          <p>
            <strong>Disponibles:</strong> {libro.disponibles}
          </p>
          <p>
            <strong>Pasta Dura:</strong>{" "}
            {libro.pastaDura === "si" ? "Sí" : "No"}
          </p>
          <button type="button" onClick={handleShowPrestamos}>
            Ver Registro de Préstamos
          </button>
          <br />
          <br />

          {libro.disponibles > 0 ? (
            <>
              <h2>Información de Préstamo</h2>
              <div id="div-buscarEstudiante">
                <h1>Identifica al estudiante que se le prestará el libro</h1>
                <input
                  type="text"
                  placeholder="Número de Documento"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
                <button
                  className="btn-buscarEstudiante"
                  onClick={buscarEstudiante}
                >
                  Buscar Estudiante
                </button>
              </div>

              {estudianteEncontrado && (
                <div>
                  <p>
                    <strong>Nombre:</strong> {estudianteEncontrado.nombres}{" "}
                    {estudianteEncontrado.apellidos}
                  </p>
                  <p>
                    <strong>Grado:</strong> {estudianteEncontrado.grado}
                  </p>
                  <button
                    className="btn-buscarEstudiante"
                    onClick={realizarPrestamo}
                  >
                    Prestar Libro
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="error-message">
              No hay ejemplares disponibles para prestar.
            </p>
          )}
          <br />
          <br />
          <button type="button" className="espacio" onClick={onClose}>
            Cerrar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btnEliminar"
          >
            Eliminar Libro
          </button>
        </div>
      )}
    </div>
  );
}