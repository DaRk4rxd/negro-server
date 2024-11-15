import "../styles/inicio.css";
import "../styles/libros.css";
import { useEffect, useState } from "react";
import { useLibros } from "../context/librosContext";
import SidebarHome from "../components/Sidebar";
import {
  ModalRegistrarLibro,
  ModalDetallesLibro,
} from "../components/ModalsFormularios";

export function Libros() {
  const { libros, crearLibro, getLibros } = useLibros();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLibros, setFilteredLibros] = useState([]);

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);
  const abrirDetailModal = (libro) => {
    setSelectedLibro(libro);
    setIsDetailModalOpen(true);
  };
  const cerrarDetailModal = () => {
    setSelectedLibro(null);
    setIsDetailModalOpen(false);
  };

  useEffect(() => {
    getLibros();
  }, []);

  useEffect(() => {
    const resultadosFiltrados = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLibros(resultadosFiltrados);
  }, [libros, searchTerm]);

  const handleFormSubmit = (formData) => {
    crearLibro(formData);
    cerrarModal();
  };

  return (
    <div className="divPadre">
      <SidebarHome />
      <div className="divLibros-secundario">
        <header className="biblioteca-header">
          <button className="btnRegistrarLibros" onClick={abrirModal}>
            Registrar libro
          </button>
          <input
            type="text"
            placeholder="Buscar libro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-buscador"
          />
        </header>
        <ModalRegistrarLibro
          isOpen={isModalOpen}
          onClose={cerrarModal}
          onSubmit={handleFormSubmit}
        />
        <ModalDetallesLibro
          isOpen={isDetailModalOpen}
          onClose={cerrarDetailModal}
          libro={selectedLibro}
        />
        {filteredLibros.length === 0 ? (
          <div className="no-libros">No hay libros disponibles.</div>
        ) : (
          <div className="libros-grid">
            {filteredLibros.map((libro, index) => (
              <article
                key={index}
                className="libro-card"
                onClick={() => abrirDetailModal(libro)}
              >
                <div className="libro-cover">
                  {/* Imagen o placeholder para la portada */}
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
      </div>
    </div>
  );
}
