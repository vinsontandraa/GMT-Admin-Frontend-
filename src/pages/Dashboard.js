import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Row, Col, Table, Card, Button, Alert } from 'react-bootstrap';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/api/users`, {
                    headers: { Authorization: token }
                });
                setUsers(response.data);
                // Assuming you have a way to get role info from token
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchData();
    }, []);

    const isManager = role === 'admin3';

    return (
        <Container fluid className="mt-4 w-75">
        <Row>
            <Col>
                <h2 className="mb-4">Dashboard</h2>
                
                {/* Error Alert */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Users Table */}
                <Card>
                    <Card.Header>Users List</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Manager-Only Section */}
                {isManager && (
                    <Card className="mt-4">
                        <Card.Header>Manager Section</Card.Header>
                        <Card.Body>
                            <h4>Global Cash Daily</h4>
                            <p>Details and functionalities for the Global Cash Daily feature.</p>
                            <Button variant="primary" href="/global-cash-daily">
                                View Global Cash Daily
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    </Container>
    );
};

export default Dashboard;
