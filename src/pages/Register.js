import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Nav } from 'react-bootstrap';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate ();
    const [error, setError] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/auth/register`, { username, password, role });
            navigate('/'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Row className="w-75">
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="p-5 bg-white shadow-sm rounded">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleRegister}>
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

                                <Form.Group controlId="formBasicRole" className="w-75 mt-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="admin1">Admin 1</option>
                                        <option value="admin2">Admin 2</option>
                                        <option value="admin3">Admin 3</option>
                                        <option value="admin4">Admin 4</option>
                                        <option value="admin5">Admin 5</option>
                                        <option value="admin6">Admin 6</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-75 mt-4">
                                    Register
                                </Button>
                                <span className="d-flex mt-1">Don't have an account?<Nav.Link as={Link} to="/" className="mx-1 text-primary"> Login</Nav.Link></span>
                            </div> 
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </Form>
                    </div> 
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
