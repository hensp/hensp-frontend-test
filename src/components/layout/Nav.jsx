import React from 'react'
import {NavLink} from "react-router-dom"
export const Nav = () => {
  return (
    <nav className="nav">
    <ul>
        <li><NavLink to="/inicio">Inicio</NavLink></li>
        <li><NavLink to="/medicamentos">Medicamentos</NavLink></li>
        <li><NavLink to="/crear-medicamentos">Crear Medicamentos</NavLink></li>
    </ul>
</nav>
  )
}
