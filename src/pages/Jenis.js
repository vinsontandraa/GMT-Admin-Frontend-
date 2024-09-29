import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const JenisPage = () => {
    const [jenis, setJenis] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentJenis, setCurrentJenis] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchJenis = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/jenis`);
                setJenis(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchJenis();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentJenis) {
                // Update
                await axios.put(`${apiUrl}/api/jenis${currentJenis._id}`, formData);
            } else {
                // Create
                await axios.post(`${apiUrl}/api/jenis`, formData);
            }
            setShowModal(false);
            setFormData({ name: '' });
            setCurrentJenis(null);
            const response = await axios.get('/api/jenis');
            setJenis(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (item) => {
        setFormData({ name: item.name });
        setCurrentJenis(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this type?')) {
            try {
                await axios.delete(`${apiUrl}/api/jenis`);
                const response = await axios.get('/api/jenis');
                setJenis(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Jenis Management</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Jenis
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jenis.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(item._id)} className="mx-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentJenis ? 'Edit Jenis' : 'Add New Jenis'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentJenis ? 'Update Jenis' : 'Add Jenis'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default JenisPage;
