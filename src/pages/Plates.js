import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const Plates = () => {
    const [plates, setPlates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPlate, setCurrentPlate] = useState(null);
    const [formData, setFormData] = useState({ noPlat: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlates = async () => {
            try {
                const response = await axios.get('/api/plates');
                setPlates(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchPlates();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentPlate) {
                // Update
                await axios.put(`/api/plates/${currentPlate._id}`, formData);
            } else {
                // Create
                await axios.post('/api/plates', formData);
            }
            setShowModal(false);
            setFormData({ noPlat: '' });
            setCurrentPlate(null);
            const response = await axios.get('/api/plates');
            setPlates(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (plate) => {
        setFormData(plate);
        setCurrentPlate(plate);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this plate?')) {
            try {
                await axios.delete(`/api/plates/${id}`);
                const response = await axios.get('/api/plates');
                setPlates(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Plates</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Plate
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No Plat</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plates.map(plate => (
                        <tr key={plate._id}>
                            <td>{plate.noPlat}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(plate)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(plate._id)} className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentPlate ? 'Edit Plate' : 'Add New Plate'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNoPlat">
                            <Form.Label>No Plat</Form.Label>
                            <Form.Control
                                type="text"
                                name="noPlat"
                                value={formData.noPlat}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentPlate ? 'Update Plate' : 'Add Plate'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Plates;
