import React from 'react'
import { Col, Table, Row, Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Medicamento from './Medicamento'
import FormMedicamentos from './FormMedicamentos'
const ListaMedicamentos = ({token}) => {

  const [medicamentos, setMedicamentos] = useState([])
  const [modalShow, setModalShow] = useState(false);
  // const [token, setToken] = useState(currentToken => currentToken = JSON.parse(localStorage.getItem("token")))
  useEffect(() => {
    let myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch("https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setMedicamentos(result.medicamento)
      })
      .catch(error => console.log('error', error))
  }, [token])

  const handleModal = () => {
    setModalShow(true)
  }


  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Lista de Medicamentos</h1>
          </Col>
          <Button variant="primary" onClick={handleModal}>Agregar Medicamento</Button>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Proveedor</th>
                  <th>Costo</th>
                  <th>Precio Venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  medicamentos.map(medicamento => {
                    return(
                      <Medicamento key={medicamento.id} medicamento={medicamento} />
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <FormMedicamentos
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>

  )
}

export default ListaMedicamentos