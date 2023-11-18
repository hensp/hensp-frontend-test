import React from 'react'
import { useState,useEffect } from 'react'
import { Global } from '../../helpers/Global'
import {useParams} from "react-router-dom"
import {Link} from 'react-router-dom'

export const Busqueda = () => {
  const [medicamentosArray,setMedicamentosArray]=useState([])
  const params = useParams()
  useEffect(()=>{
    console.log(params);
    fetchMedicamentos()
  },[])  

  const fetchMedicamentos = async ()=>{
    const url=Global.URL+`medicamentos/${params.busqueda}`
    const token=localStorage.getItem("token")

    try {
        let peticion = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
    
        if (peticion.ok) {
            let datos = await peticion.json();
            console.log(datos);
            setMedicamentosArray(datos);
          } else {
            console.log("Error en la solicitud. Código de estado:", peticion.status);
          }
    } catch (error) {
        console.log(error);
    }
    
   
  }

  const eliminarMedicamento=async (id)=>{
    console.log(id);
    const url=Global.URL+`medicamentos/${id}`
    const token=localStorage.getItem("token")
    try {
        let peticion = await fetch(url,{
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        
        })
        if (peticion.ok) {
            alert(`Medicamento con ID ${id} eliminado exitosamente`)
        }else{
            alert(`Error al eliminar el medicamento con ID ${id}. Código de estado: ${peticion.status}`)
        }
    } catch (error) {
        console.log("Error en la solicitud "+error);
    }
  }
  return (
    <>  
     {
        medicamentosArray.length >=1 ? (
            medicamentosArray.map(component=>{
                return(
                    <article key={component.id} className="medicamento-item">
                        <div className='mascara'>
                            <img src="https://png.pngtree.com/png-vector/20210729/ourlarge/pngtree-cute-medicine-drawing-vector-illustration-png-image_3750940.jpg" alt="" />
                        </div>
                        <div className='datos'>
                            <h3 className="title">{component.nombre}</h3>
                            <p className="description">PrecioVenta: {component.precio_venta}</p>
                            <p className="description">Proveedor: {component.proveedor}</p>
                            <p className="description">Costo: {component.costo}</p>
                            <Link to={"/editar/"+component.id} className="edit" >Editar</Link>
                            <button className="delete" onClick={()=>{
                                eliminarMedicamento(component.id)
                            }}>Eliminar</button>
                        </div>
                    </article>
                )
            })
        ):(
            <h1>No existe el medicamento</h1>
        )
     }
    </>
  );
}
