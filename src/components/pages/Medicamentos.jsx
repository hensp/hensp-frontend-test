import React from 'react'
import { useState,useEffect } from 'react'
import { Global } from '../../helpers/Global'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export const Medicamento = () => {
  const [medicamentosArray,setMedicamentosArray]=useState([])
  const navigate = useNavigate();
  useEffect(()=>{

    //lo chondo 
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
        console.log("No estas logueado");
        navigate('/login');
    }else{
        fetchMedicamentos()
    }
    
  },[])  

  const fetchMedicamentos = async ()=>{
    const url=Global.URL+"medicamentos"
    const token=localStorage.getItem("token")

    try {
        let peticion = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
    
        let datos=await peticion.json()
       
        setMedicamentosArray(datos.medicamento)
        localStorage.setItem("token",token)
        
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
                            <p className="description">Desarrollo web</p>
                            <Link to={"/editar/"+component.id} className="edit" >Editar</Link>
                            <button className="delete" onClick={()=>{
                                eliminarMedicamento(component.id)
                            }}>Eliminar</button>
                        </div>
                    </article>
                )
            })
        ):(
            <h1>sadsad</h1>
        )
     }
    </>
  );
}
