import "../styles/inicio.css";
import "../styles/home.css";
import SidebarHome from "../components/Sidebar";
import { useLibros } from "../context/librosContext";
import { useEstudiantes } from "../context/estudianteContext"; // Importa el contexto de estudiantes
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Inicio() {
  const { libros, getLibros } = useLibros();
  const { estudiantes, getEstudiantes } = useEstudiantes(); // Desestructura los estudiantes y la función para obtenerlos
  const [totalLibros, setTotalLibros] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los libros y estudiantes al cargar la página
    getLibros();
    getEstudiantes();
  }, []);

  useEffect(() => {
    // Actualizar la cantidad total de libros cuando cambie la lista de libros
    setTotalLibros(libros.length);
  }, [libros]);

  return (
    <div className="divHome">
      <SidebarHome />
      <div className="divPadre2">
        {/* Encabezado */}
        <header className="header">
          <h1>Bienvenido a la Biblioteca</h1>
          <p>Explora y gestiona tu colección de libros y estudiantes</p>
        </header>

        {/* Estadísticas Visuales */}
        <section className="stats">
          <div className="stat" key="total-libros">
            <h3>Total de Libros</h3>
            <p>{totalLibros}</p>
          </div>
          <div className="stat" key="total-estudiantes">
            <h3>Estudiantes Registrados</h3>
            <p>{estudiantes.length}</p> {/* Muestra el número de estudiantes */}
          </div>
        </section>

        {/* Libros Destacados */}
        <section className="featured-books">
          <h2>Libros Destacados</h2>
          <div className="books-grid">
            {libros.slice(0, 5).map((libro, index) => (
              <div key={libro.id || index} className="book-card">
                <h3>{libro.titulo}</h3>
                <p>Autor: {libro.autor}</p>
                <p>Género: {libro.genero}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accesos Rápidos */}
        <section className="quick-access">
          <h2>Acceso Rápido</h2>
          <div className="quick-links">
            <button
              className="quick-link"
              key="ver-libros"
              onClick={() => navigate("/MostrarLibros")}
            >
              Ver Todos los Libros
            </button>
            <button
              className="quick-link"
              key="ver-estudiantes"
              onClick={() => navigate("/MostrarEstudiantes")}
            >
              Lista de Estudiantes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
