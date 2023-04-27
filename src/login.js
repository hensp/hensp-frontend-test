import React, { useState } from 'react';
import axios from 'axios';

export const setToLocalStorange = (key, value) => {
    localStorage.setItem(key, JSON.stringify((value)));
}
export const getFromLocalStorange = (key) =>{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}


const Login = () =>  {
    const [Usuario, setUsuario] = useState('');
    const [Password, setPassword] = useState('');

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Login = async ({Password, usuario}) => {
            try {
                const response = await axios.post("https://backend-dummy.hospitaldeespecialidades.com.sv/api/auth/login",{
                Usuario,
                Password
                })
                if(response.status === 200){

                }

                const {jwt, Usuario} = await response.data();
                setToLocalStorange("token", jwt);
                setToLocalStorange("usuario", Usuario)
                console.log(response)
            } catch(e){
                console.log(e)

            }
    }
    setPassword('');
    setPassword('');
};
return (
    <form onSubmit={handleSubmit}>
    <input type="input" value={Usuario} onChange={handleUsuarioChange} placeholder="Usuario" />
    <input type="password" value={Password} onChange={handlePasswordChange} placeholder="Contraseña" />
    <button type="submit">Iniciar sesión</button>
  </form>
);
};

export default Login