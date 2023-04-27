import React, {useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FormMedicamentos = (props) => {
  const [dataForm, setDataForm] = useState({});//[{nombre: "paracetamol", proveedor: "farmacia", costo: 1, precio_venta: 2}
  const token = JSON.parse(localStorage.getItem("token"));
  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setDataForm({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onHide();
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token)
    let raw = JSON.stringify({
      "nombre": dataForm.nombre,
      "proveedor": dataForm.proveedor,
      "costo": Number(dataForm.costo),
      "precioVenta": Number(dataForm.precio_venta)
    })
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    console.log(dataForm)
    fetch('https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
      handleReset()
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Medicamento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre Medicamento</Form.Label>
          <Form.Control
            value={dataForm.nombre}
            onChange={handleChange}
            name="nombre"
            type="text"
            placeholder="Nombre medicamento"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Proveedor</Form.Label>
          <Form.Control
            value={dataForm.proveedor}
            onChange={handleChange}
            name="proveedor"
            type="text"
            placeholder="Nombre proveedor"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Precio Venta</Form.Label>
          <Form.Control
            value={dataForm.precio_venta}
            onChange={handleChange}
            name="precio_venta"
            type="number"
            placeholder="Precio venta"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Costo</Form.Label>
          <Form.Control
            value={dataForm.costo}
            onChange={handleChange}
            name="costo"
            type="number"
            placeholder="Costo"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
      </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default FormMedicamentos;
