import "../styles/inicio.css";
import "../styles/estudiantes.css";
import { useEffect, useState } from "react";
import { useEstudiantes } from "../context/estudianteContext";
import {
  ModalRegistrarEstudiante,
  ModalDetallesEstudiante,
} from "../components/ModalsFormularios";
import SidebarHome from "../components/Sidebar";

export function Estudiantes() {
  const { estudiantes, crearEstudiante, getEstudiantes } = useEstudiantes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getEstudiantes();
  }, []);

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);
  const abrirDetailModal = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setIsDetailModalOpen(true);
  };
  const cerrarDetailModal = () => {
    setSelectedEstudiante(null);
    setIsDetailModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    crearEstudiante(formData);
    cerrarModal();
  };

  const estudiantesFiltrados = estudiantes.filter((estudiante) =>
    `${estudiante.nombres} ${estudiante.apellidos}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const onRefresh = () => {
    getEstudiantes();
    // Lógica para refrescar datos, como una llamada API
    console.log("Datos refrescados");
  };

  return (
    <>
      <div className="divPadre">
        <SidebarHome />

        <div className="divEstudiantes-secundario">
          <div className="estudiantes-header">
            <button className="btnRegistrarEstudiantes" onClick={abrirModal}>
              + Registrar Estudiante
            </button>

            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-buscador"
            />
          </div>

          <ModalRegistrarEstudiante
            isOpen={isModalOpen}
            onClose={cerrarModal}
            onSubmit={handleFormSubmit}
          />
          <ModalDetallesEstudiante
            isOpen={isDetailModalOpen}
            onClose={cerrarDetailModal}
            estudiante={selectedEstudiante}
            onRefresh={onRefresh}
          />

          {estudiantesFiltrados.length === 0 ? (
            <div className="no-estudiantes">
              No hay estudiantes disponibles.
            </div>
          ) : (
            <div className="grid-estudiantes">
              {estudiantesFiltrados.map((estudiante, index) => (
                <div
                  key={index}
                  className="estudiante-card"
                  onClick={() => abrirDetailModal(estudiante)}
                >
                  <h2>
                    {estudiante.nombres} {estudiante.apellidos}
                  </h2>
                  <p>Grado: {estudiante.grado}</p>
                  <p>
                    Edad:{" "}
                    {new Date().getFullYear() -
                      new Date(estudiante.fechaNacimiento).getFullYear()}{" "}
                    años
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
