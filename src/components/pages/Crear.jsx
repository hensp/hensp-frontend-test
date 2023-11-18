import React from 'react'
import { useState } from 'react'
import { Global } from '../../helpers/Global'
export const Crear = () => {

  const [resultado,setResultado]=useState("no_enviado")

  const enviarDatos =async (e) =>{
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
    console.log(token);
    const url=Global.URL+"medicamentos"
    try {
      let peticion = await fetch(url,{
        method: "POST",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(objetoMedicamento)
      })

      if(peticion.ok){
        let respuestaJSON= await peticion.json()
        alert("El medicamento con id " + respuestaJSON.id + "Fue creado")
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

      <strong>{resultado == "guardado" ? "Medicamento guardado con exito":""}</strong>
      <strong>{resultado == "error" ? "Hubo un error al guardar el medicamento":""}</strong>
      <form className='formulario' onSubmit={enviarDatos}>
      <h1>Crear Medicamentos</h1>
      <p>Formulario para crear medicamentos</p>
      {/*CREAR EL DISEÑO DEL FORMULARIO */}
    
      <div className='form-group'>
        <label>Nombre</label>
        <input type="text" name='nombre' />
      </div>
      <div className='form-group'>
        <label htmlFor="">Proveedor</label>
        <input type="text" name='proveedor' />
      </div>
      <div className='form-group'>
        <label >Costo</label>
        <input type="text" name='costo' />
      </div>

      <div className='form-group'>
        <label>Precio Venta</label>
        <input type="text" name='precioVenta' />
      </div>

      <input type="submit" value="Guardar" className='btn btn-sucess' />
      </form>
    </div>
  
  )
}
