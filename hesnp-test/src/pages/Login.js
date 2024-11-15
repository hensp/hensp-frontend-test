import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import api from '../api';
import { Form, Button, Card, Container, InputGroup } from 'react-bootstrap';
import './login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({ usuario: '', password: '' });
    const [validator] = useState(new SimpleReactValidator());
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            try {
                const response = await api.post('/api/auth/login', formData);
                const token = response.data?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    navigate('/medicamentos'); // Redirige a la página de medicamentos
                } else {
                    alert('Error: no se recibió el token de autenticación.');
                }
            } catch (error) {
                console.error(error);
                alert('Error en el inicio de sesión: Verifica tus credenciales.');
            }
        } else {
            validator.showMessages();
        }
    };

    return (
        <Container className="login-container">
            <Card className="login-card text-center">
                <Card.Body>
                    <div className="mb-4">
                        <i className="fas fa-sign-in-alt login-icon"></i>
                        <h3 className="mb-1">Welcome!</h3>
                        <p className="text-muted">Sign in to your account</p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="fas fa-user"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="usuario"
                                    value={formData.usuario}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                />
                            </InputGroup>
                            {validator.message('usuario', formData.usuario, 'required')}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="fas fa-lock"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                />
                            </InputGroup>
                            {validator.message('password', formData.password, 'required')}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 btn-lg mt-3">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
