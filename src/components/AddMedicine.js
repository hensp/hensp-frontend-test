import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMedicine() {
  const [nombre, setNombre] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [costo, setCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const costNumber = parseFloat(costo);
    const salePriceNumber = parseFloat(precioVenta);
    try {
      await axios.post('https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos', {
        nombre,
        proveedor,
        costo: costNumber,
        precioVenta: salePriceNumber
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/medicines');
    } catch (error) {
      console.error('Failed to add medicine:', error);
    }
  };

  return (
    <div className="container">
      <h1>Agregar medicamento</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="proveedor" className="form-label">Proveedor</label>
          <input
            type="text"
            className="form-control"
            id="proveedor"
            value={proveedor}
            onChange={e => setProveedor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="costo" className="form-label">Costo</label>
          <input
            type="text"
            className="form-control"
            id="costo"
            value={costo}
            onChange={e => setCosto(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precioVenta" className="form-label">Precio de venta</label>
          <input
            type="text" 
            className="form-control"
            id="precioVenta"
            value={precioVenta}
            onChange={e => setPrecioVenta(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar medicamento</button>
      </form>
    </div>
  );
}

export default AddMedicine;

