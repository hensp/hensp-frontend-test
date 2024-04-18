import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchMedicines();
  }, [page, limit, filter]);

  const fetchMedicines = async () => {
    try {
      const { data } = await axios.get('https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { filter, page, limit }
      });

      if (data && data.medicamento && Array.isArray(data.medicamento)) {
        setMedicines(data.medicamento);
      } else {
        setMedicines([]);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Error fetching medicines, check console for more information');
    }
  };
  

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const deleteMedicine = async (idToDelete) => {
    try {
      await axios.delete(`https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos/${idToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMedicines(medicines.filter(medicamento => medicamento.id !== idToDelete));
    } catch (error) {
      console.error('Failed to delete medicine:', error);
    }
  };

  return (
    <div className="container">
      <h1>Medicamentos</h1>
      <div className="controls">
        <input type="text" placeholder="Buscar medicamento" value={filter} onChange={handleFilterChange} />
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>Página anterior</button>
        <button onClick={() => setPage(page + 1)}>Página siguiente</button>
      </div>
      <Link to="/add-medicine" className="btn btn-primary">Agregar un nuevo medicamento</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Proveedor</th>
            <th>Precio de venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(medicines) && medicines.length > 0 ? (
    medicines.map((medicamento) => (
      <tr key={medicamento.id}>
        <td>{medicamento.id}</td>
        <td>{medicamento.nombre}</td>
        <td>${medicamento.costo}</td>
        <td>{medicamento.proveedor}</td>
        <td>${medicamento.precio_venta}</td>
        <td>
          <Link to={`/edit-medicine/${medicamento.id}`} className="btn btn-secondary">Editar</Link>
          <button onClick={() => deleteMedicine(medicamento.id)} className="btn btn-danger">Eliminar</button> {/* Implement deletion logic */}
        </td>
      </tr>
    ))
  ) : (
        <tr>
            <td colSpan="6">No se encontraron medicamentos</td>
        </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineList;


