import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const MitraPage = () => {
    const [mitras, setMitras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMitra, setCurrentMitra] = useState(null);
    const [formData, setFormData] = useState({ nama: '', type: '', no: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMitras = async () => {
            try {
                const response = await axios.get('/api/mitra');
                setMitras(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchMitras();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentMitra) {
                // Update
                await axios.put(`/api/mitra/${currentMitra._id}`, formData);
            } else {
                // Create
                await axios.post('/api/mitra', formData);
            }
            setShowModal(false);
            setFormData({ nama: '', type: '', no: '' });
            setCurrentMitra(null);
            const response = await axios.get('/api/mitra');
            setMitras(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (mitra) => {
        setFormData(mitra);
        setCurrentMitra(mitra);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this mitra?')) {
            try {
                await axios.delete('/api/mitra');
                const response = await axios.get('/api/mitra');
                setMitras(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Mitra Management</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Mitra
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Type</th>
                        <th>No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mitras.map(mitra => (
                        <tr key={mitra._id}>
                            <td>{mitra.nama}</td>
                            <td>{mitra.type}</td>
                            <td>{mitra.no}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(mitra)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(mitra._id)} className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentMitra ? 'Edit Mitra' : 'Add New Mitra'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNo">
                            <Form.Label>No</Form.Label>
                            <Form.Control
                                type="number"
                                name="no"
                                value={formData.no}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentMitra ? 'Update Mitra' : 'Add Mitra'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MitraPage;
