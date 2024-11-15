import React, { useEffect, useState } from 'react';
import api from '../api';
import { Table, Button, Container, Card } from 'react-bootstrap';
import './Medicamentos.css';

const Medicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([]);

    // Función para obtener los datos de los medicamentos
    const fetchMedicamentos = async () => {
        try {
            const response = await api.get('/api/medicamentos');
            setMedicamentos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error al obtener los medicamentos:', error);
            alert('Error al obtener los datos de HENSP.');
        }
    };

    useEffect(() => {
        fetchMedicamentos();
    }, []);

    return (
        <Container className="medicamentos-container d-flex align-items-center justify-content-center min-vh-100">
            <Card className="medicamentos-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Lista de Medicamentos</h2>
                    <Table responsive="sm" bordered hover className="medicamentos-table text-center">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Proveedor</th>
                                <th>Costo</th>
                                <th>Precio de Venta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicamentos.length > 0 ? (
                                medicamentos.map((med) => (
                                    <tr key={med.id}>
                                        <td>{med.nombre}</td>
                                        <td>{med.proveedor}</td>
                                        <td>${med.costo}</td>
                                        <td>${med.precioVenta}</td>
                                        <td>
                                            <Button variant="warning" size="sm" className="me-2">Editar</Button>
                                            <Button variant="danger" size="sm">Eliminar</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No hay medicamentos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Medicamentos;
