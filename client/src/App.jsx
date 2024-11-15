import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

import { Inicio } from "./pages/Inicio";
import { Estudiantes } from "./pages/Estudiantes";
import { Libros } from "./pages/Libros";
import { VistaPreviaLibros } from "./pages/vistaPrevia";
import { EstudiantesProvider } from "./context/estudianteContext";
import { LibrosProvider } from "./context/librosContext";
import { PrestamosProvider } from "./context/prestamosContext";

function App() {
  return (
    <AuthProvider>
      <LibrosProvider>
      <EstudiantesProvider>
      <PrestamosProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vistaPrevia" element={<VistaPreviaLibros />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/Inicio" element={<Inicio />} />
                <Route path="/mostrarEstudiantes" element={<Estudiantes />} />
                <Route path="/MostrarLibros" element={<Libros />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PrestamosProvider>
      </EstudiantesProvider>
      </LibrosProvider>
    </AuthProvider>
  );
}

export default App;
