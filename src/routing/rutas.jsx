import React from "react";
import { Routes, 
         Route,
         BrowserRouter,
         Navigate } from "react-router-dom";
import {Inicio} from "../components/pages/Inicio"
import { Medicamento } from "../components/pages/Medicamentos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Crear } from "../components/pages/Crear";
import { Busqueda } from "../components/pages/Busqueda";
import { Editar } from "../components/pages/Editar";
import {Login} from "../components/pages/Login"

export const Rutas = ()=>{
    return (
        <BrowserRouter>
            
            <Header/>
            <Nav/>
            <Sidebar/>

            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/inicio" element={<Inicio/>}/>
                    <Route path="/medicamentos" element={<Medicamento/>}/>
                    <Route path="/crear-medicamentos" element={<Crear/>}/>
                    <Route path="/buscar/:busqueda" element={<Busqueda/>}/>
                    <Route path="/editar/:id" element={<Editar/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={
                        <div className="jumbo">
                            <h1>Error 404</h1>
                        </div>
                    }
                    />
                </Routes>
            </section>
        </BrowserRouter>
    )
}