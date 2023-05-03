import React, { useState, useEffect } from 'react';
import { login, getMedicines, addMedicine, updateMedicine, deleteMedicine } from './api';

function App() {

    // USE STATES
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [nuevoMedicamento, setNuevoMedicamento] = useState({id: '', nombre: '', proveedor: '', costo: '', precioVenta: ''});
    const [medicamentos, setMedicamentos] = useState([]);


    // HANDLERS PARA LOS INPUTS
    // LOGIN --------------------------------------------------------------------------------------
    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await login(credentials.email, credentials.password);
        console.log(result);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };


    // CREATE -------------------------------------------------------------------------------------
    const handleAddMedicine = async () => {
        try {
          const result = await addMedicine(nuevoMedicamento);
          console.log(result);
          setMedicamentos([...medicamentos, result.medicamento]);
          setNuevoMedicamento({ id: '', nombre: '', proveedor: '', costo: 0, precioVenta: 0 });
        } catch (error) {
          console.error(error.message);
        }
    };

    const handleNewMedicineChange = (event) => {
        const { name, value } = event.target;
        setNuevoMedicamento({ ...nuevoMedicamento, [name]: value });
    };


    const [valorInput, setValorInput] = useState("");

    function handleChange(evento) {
        setValorInput(evento.target.value);
    }
      
      


    
    // USEEFFECT PARA RECUPERAR LOS DATOS
    useEffect(() => {
        const obtenerMedicamentos = async () => {
          try {
            const data = await getMedicines();
            setMedicamentos(data.medicamento);
          } catch (error) {
            console.error(error.message);
          }
        };
    
        obtenerMedicamentos();
    }, []);

    

    return (
        <div className="main">
            <div className="body login">
            <section className="login1">
            <div className="containerScreen">
                <div className="containerImage">
                <img src="https://hospitaldeespecialidades.com.sv/wp-content/uploads/2017/09/logo.png" alt="logo"></img>
                </div>
                <div className="containerInfor">
                <div className="title"></div>
                <div className="descrition"></div>
                </div>
            </div>
            <div className="containerLogin">
                <div className="login">
                <section className="targetaLogin1">
                    <div className="title">
                    <div className="interno">
                        <p>INICIAR SESIÓN</p>
                    </div>
                    </div>
                    <div className="formulario">
                    <section className="targetaForm1">
                        <form onSubmit={handleLogin}>
                        <div className="formInputs">
                            <div className="containerData">
                            <div className="inpuTitle">
                                <label htmlFor="email">Correo:</label>
                            </div>
                            <div className="inpuHTML">
                                <input type="text" id="email" name="email" value={credentials.email} placeholder="correo" onChange={handleInputChange}></input>
                            </div>
                            </div>
                            <div className="containerData">
                            <div className="inpuTitle">
                                <label htmlFor="password">Contraseña:</label>
                            </div>
                            <div className="inpuHTML">
                                <input type="password" id="password" name="password" value={credentials.password} placeholder="contraseña" onChange={handleInputChange}></input>
                            </div>
                            </div>
                        </div>
                        <div className="formSubmit">
                            <div className="containerData">
                            <button type="submit">Iniciar sesión</button>
                            </div>
                        </div>
                        </form>
                    </section>
                    </div>
                    <div className="signup">
                    </div>
                </section>
                </div>
            </div>
            </section>
                <div className="body">
                <table className="formUser1">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Proveedor</th>
                        <th>Costo</th>
                        <th>Precio de venta</th>
                        <th>Nuevo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><input type="text" id="id" name="id" placeholder="Id" value={nuevoMedicamento.id} onChange={handleNewMedicineChange}></input></td>
                        <td><input type="text" id="nombre" name="nombre" placeholder="Nombre del producto" value={nuevoMedicamento.nombre} onChange={handleNewMedicineChange}></input></td>
                        <td><input type="text" id="proveedor" name="proveedor" placeholder="Nombre del proveedor" value={nuevoMedicamento.proveedor} onChange={handleNewMedicineChange}></input></td>
                        <td><input type="number" id="costo" name="costo" placeholder="Costo" value={nuevoMedicamento.costo} onChange={handleNewMedicineChange}></input></td>
                        <td><input type="number" id="precioVenta" name="precioVenta" placeholder="Precio de venta" value={nuevoMedicamento.precioVenta} onChange={handleNewMedicineChange}></input></td>
                        <td><button className='create' type="button" onClick={handleAddMedicine}>Crear Producto</button></td>
                        </tr>
                    </tbody>
                </table>
                <table className="formUser1">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Proveedor</th>
                        <th>Costo</th>
                        <th>Precio de venta</th>
                        <th>Actualizar</th>
                        <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicamentos.map((medicamento) => (
                            <tr key={medicamento.id}>
                            <td><input type="text" id="id" name="id" placeholder="Id del producto" value={medicamento.id} onChange={handleChange}></input></td>
                            <td><input type="text" id="nombre" name="nombre" placeholder="Nombre del producto" value={medicamento.nombre} onChange={handleChange}></input></td>
                            <td><input type="text" id="proveedor" name="proveedor" placeholder="Nombre del proveedor" value={medicamento.proveedor} onChange={handleChange}></input></td>
                            <td><input type="text" id="costo" name="costo" placeholder="Costo" value={medicamento.costo} onChange={handleChange}></input></td>
                            <td><input type="text" id="precioVenta" name="precioVenta" placeholder="Precio de venta" value={medicamento.precio_venta} onChange={handleChange}></input></td>
                            <td><button className='update' type="submit" >Actualizar</button></td>
                            <td><button className='borrar' type="submit" >Borrar</button></td>
                            </tr>
                        ),)}
                    </tbody>
                </table>

            </div>
            </div>
        </div>
    );
}

export default App;
