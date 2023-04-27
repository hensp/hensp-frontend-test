import React from 'react'
import { Button } from 'react-bootstrap'
const Medicamento = ({medicamento}) => {

  
  return (
    <>
      <tr>
        <td>{medicamento.id}</td>
        <td>{medicamento.nombre}</td>
        <td>{medicamento.proveedor}</td>
        <td>{medicamento.costo}</td>
        <td>{medicamento.precio_venta}</td>
        <td>
          <Button variant="primary">Editar</Button>
          <Button onClick={() => handleEliminar(medicamento.id)} variant="danger">Eliminar</Button>
        </td>
      </tr>
    </>
  )
}

export default Medicamento