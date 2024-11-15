import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import "../styles/navbar.css"

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <h1>
        <Link to={isAuthenticated ? "/inicio" : "/"}>BIBLIOTECA</Link>
      </h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar sesion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Iniciar sesion</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
