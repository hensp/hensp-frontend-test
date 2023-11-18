import React from 'react'
import { useState,useEffect } from 'react'
import { Global } from '../../helpers/Global'
import {useParams} from 'react-router-dom'
export const Editar = () => {

  const [resultado,setResultado]=useState("no_enviado")
  const [medicamento,setMedicamento]=useState([])
  const params = useParams()

  useEffect(()=>{
    conseguirMedicamentos()
  },[])
  const conseguirMedicamentos=async ()=>{
    const url=Global.URL+`medicamentos/${params.id}`
    const token=localStorage.getItem("token")

    try {
        let peticion = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
    
        
        if (peticion.ok) {
          let datos=await peticion.json()
          console.log(datos);
          setMedicamento(datos)
        }else{

        }
        //setMedicamento(datos)
        
        
    } catch (error) {
        console.log(error);
    }
    
  }

  const enviarDatos =async (e) =>{
    //e.preventDefault()
    //console.log(e.target.nombre.value);
    e.preventDefault()
    let target= e.target
    let nombre=target.nombre.value
    let proveedor=target.proveedor.value
    let costo=Number(target.costo.value)    
    let precioVenta=Number(target.precioVenta.value)

    let objetoMedicamento={
      nombre,
      proveedor,
      costo,
      precioVenta
    }

    console.log(objetoMedicamento);

    const token =localStorage.getItem("token")
    const url=Global.URL+`medicamentos/${params.id}`
    try {
      let peticion = await fetch(url,{
        method: "PUT",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(objetoMedicamento)
      })

      if(peticion.ok){
        let respuestaJSON= await peticion.json()
        setResultado("guardado")
      }else{
        setResultado("error")
      }
    } catch (error) {

      console.log("Error en la solicitud", error);
      
    }
  }
  return (
    <div className='jumbo'>
      
      <strong>{resultado == "guardado" ? "Medicamento editado con exito":""}</strong>
      <strong>{resultado == "error" ? "Hubo un error al guardar el medicamento":""}</strong>
      
      {/*CREAR EL DISEÑO DEL FORMULARIO */}
      {medicamento.map(component=>{
        return (
          <form key={component.id} className='formulario' onSubmit={enviarDatos}>
              <h1>Editar Medicamentos</h1>
              <p>Formulario para crear medicamentos</p>
              <div key={component.id} className='form-group'>
                <label>Nombre</label>
                <input type="text" name='nombre' defaultValue={component.nombre} />
              </div>
            <div className='form-group'>
              <label htmlFor="">Proveedor</label>
              <input type="text" name='proveedor' defaultValue={component.proveedor} />
            </div>
            <div className='form-group'>
              <label >Costo</label>
              <input type="text" name='costo' defaultValue={component.costo} />
            </div>

            <div className='form-group'>
              <label>Precio Venta</label>
              <input type="text" name='precioVenta' defaultValue={component.precio_venta} />
            </div>

            <input type="submit" value="Guardar" className='btn btn-sucess' />
          </form>
        )
      })}
      
      
    </div>
  
  )
}
