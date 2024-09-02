import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

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
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="p-5 bg-white shadow-sm rounded">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="supervisor">Supervisor</option>

                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Register
                            </Button>

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
