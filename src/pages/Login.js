import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Nav } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate ();
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Row className="w-75">
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="p-5 bg-white shadow-sm rounded">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleLogin}>
                            <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
                                <Form.Group controlId="formBasicUsername" className="w-75">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="w-75 mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-75 mt-4">
                                    Login
                                </Button>
                                <span className="d-flex mt-1">Don't have an account?<Nav.Link as={Link} to="/register" className="mx-1 text-primary"> Register</Nav.Link></span>
                            </div>
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
