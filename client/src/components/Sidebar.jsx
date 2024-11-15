import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  HomeRounded as HomeIcon,
  PeopleRounded as TeamIcon,
  LibraryBooksRounded as LibraryIcon,
  MenuRounded as ToggleIcon,
} from "@mui/icons-material"; // Import icons
import "../styles/sidebar.css";


function SidebarHome() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed); // Cambia el estado para colapsar o expandir el sidebar
  };

  return (
    <Sidebar
      className="sidebar"
      collapsedWidth="80px"
      width="200px"
      collapsed={isCollapsed} // Controla el estado colapsado
    >
      <Menu className="sidebar-menu">
        <MenuItem
          className="menuItem"
          icon={<ToggleIcon />}
          onClick={handleToggle}
        >
          <h2>{isCollapsed ? "Abrir" : "Cerrar"}</h2>
        </MenuItem>
        <MenuItem
          className="menuItem"
          icon={<HomeIcon />}
          component={<Link to="/Inicio" />}
        >
          Inicio
        </MenuItem>
        <MenuItem
          className="menuItem"
          icon={<TeamIcon />}
          component={<Link to="/MostrarEstudiantes" />}
        >
          Estudiantes
        </MenuItem>
        <MenuItem
          className="menuItem"
          icon={<LibraryIcon />}
          component={<Link to="/MostrarLibros" />}
        >
          Librería
        </MenuItem>
        {/* Agrega más items de menú según sea necesario */}
      </Menu>
    </Sidebar>
  );
}

export default SidebarHome;
