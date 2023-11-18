import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Global } from "../../helpers/Global";
export const Login = () => {
  const [resultado,setResultado]=useState("no_enviado")
  const enviarDatos =async (e) =>{
    e.preventDefault()
    let target= e.target
    let usuario=target.usuario.value
    let password=target.password.value
    

    let objetoUsuario={
      usuario,
      password,
      
    }

    console.log(objetoUsuario);
    
    
    const url=Global.URL+"auth/login"
    try {
      let peticion = await fetch(url,{
        method: "POST",
        headers:{
          
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(objetoUsuario)
      })

      if(peticion.ok){
        let respuestaJSON= await peticion.json()
        const token=respuestaJSON.token
        localStorage.setItem("token",token)
        setResultado("registrado")
      }else{
        setResultado("error")
        console.log("error");
      }
    } catch (error) {

      console.log("Error en la solicitud", error);
      
    }
  }
    
  
  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <strong>{resultado == "registrado" ? "Usuario registrado correctamente":""}</strong>
      <strong>{resultado == "error" ? "Hubo un error":""}</strong>
      <div className="">
        <form className='formulario' onSubmit={enviarDatos}>
          <div className="form-group">
            <label htmlFor="">Usuario</label>
            <input type="text" name="usuario" />
          </div>

          <div className="form-group">
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
          </div>

          <input type="submit" value="Identificate" className="btn btn-sucess" />
        </form>
      </div>
    </>
  )
}
