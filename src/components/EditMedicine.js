import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditMedicine() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [costo, setCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
  
        const medicineDetails = response.data;
        setNombre(medicineDetails.nombre);
        setProveedor(medicineDetails.proveedor);
        setCosto(medicineDetails.costo);
        setPrecioVenta(medicineDetails.precioVenta);
      } catch (error) {
        console.error('Failed to fetch medicine details:', error);
      }
    };
  
    fetchMedicine();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedCost = parseFloat(costo);
    const parsedPrecioVenta = parseFloat(precioVenta);

    try {
      await axios.put(`https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos/${id}`, {
        nombre,
        proveedor,
        costo: parsedCost,
        precioVenta: parsedPrecioVenta
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/medicines');
    } catch (error) {
      console.error('Failed to update medicine:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Medicine</h1>
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
            type="number" 
            className="form-control"
            id="costo"
            value={costo}
            onChange={e => setCosto(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precioVenta" className="form-label">Precio de venta</label>
          <input
            type="number"
            className="form-control"
            id="precioVenta"
            value={precioVenta}
            onChange={e => setPrecioVenta(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Modificar medicamento</button>
      </form>
    </div>
  );
}

export default EditMedicine;
