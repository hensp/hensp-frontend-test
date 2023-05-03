import React from 'react';

const Tabla = ({ medicamentos }) => {
  const renderFilas = () => {
    return medicamentos.map((medicamento, index) => {
      return (
        <tr key={index}>
          <td>{medicamento.nombre}</td>
          <td>{medicamento.costo}</td>
          {/* Agrega más columnas aquí según los datos que quieras mostrar */}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Costo</th>
          {/* Agrega más encabezados aquí según los datos que quieras mostrar */}
        </tr>
      </thead>
      <tbody>{renderFilas()}</tbody>
    </table>
  );
};

export default Tabla;