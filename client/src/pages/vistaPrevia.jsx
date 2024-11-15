import "../styles/vistaPrevia.css";
import { useEffect, useState } from "react";
import { useLibros } from "../context/librosContext";

export function VistaPreviaLibros() {
  const { vistaPreviaLibros, vistaPreviaLibro } = useLibros(); // Incluye `vistaPreviaLibro`
  const [libros, setLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLibros, setFilteredLibros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await vistaPreviaLibros();
        setLibros(res || []);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    };
    fetchLibros();
  }, []);

  useEffect(() => {
    const resultadosFiltrados = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLibros(resultadosFiltrados);
  }, [libros, searchTerm]);

  const mostrarInformacionPrevia = async (nombreLibro) => {
    try {
      const libroInfo = await vistaPreviaLibro(nombreLibro);
      console.log(libroInfo);
      
      setSelectedLibro(libroInfo); // Asigna el libro seleccionado
      setShowModal(true); // Muestra el modal
    } catch (error) {
      console.error("Error al obtener información del libro:", error);
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    setSelectedLibro(null);
  };


  

  return (
    <div className="vista-previsualizacion">
      <header className="vista-header">
        <input
          type="text"
          placeholder="Buscar libro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-buscador"
        />
        <p className="contador-libros">
          Libros disponibles: {filteredLibros.length}
        </p>
      </header>
      {filteredLibros.length === 0 ? (
        <div className="no-libros">No hay libros disponibles.</div>
      ) : (
        <div className="libros-grid">
          {filteredLibros.map((libro, index) => (
            <article
              key={index}
              className="libro-card"
              onClick={() => mostrarInformacionPrevia(libro.titulo)}
            >
              <div className="libro-cover">
                <span className="libro-icon">📚</span>
              </div>
              <div className="libro-content">
                <h2>{libro.titulo}</h2>
                <p>Autor: {libro.autor}</p>
                <p>Género: {libro.genero}</p>
              </div>
            </article>
          ))}
        </div>
      )}
      {showModal && selectedLibro && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={cerrarModal}>
              &times;
            </span>
            <h2>{selectedLibro.titulo}</h2>
            <p>Autor: {selectedLibro.autor}</p>
            <p>Género: {selectedLibro.genero}</p>
            <p>Descripción: {selectedLibro.descripcion}</p>
            {/* Agrega más detalles si es necesario */}
          </div>
        </div>
      )}
    </div>
  );
}
