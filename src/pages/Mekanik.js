import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const MekanikPage = () => {
    const [mekaniks, setMekaniks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMekanik, setCurrentMekanik] = useState(null);
    const [formData, setFormData] = useState({no: '', tanggal: '', noForm: '', noSO: '', mekanik: '', noPlat: '', ekspedisi: '', namaMekanik: '', noID: '', perbaikan: '', borongan: '' });
    const [error, setError] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchMekanik = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/mekanik`);
                setMekaniks(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchMekanik();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentMekanik) {
                // Update
                await axios.put(`${apiUrl}/api/mekanik/${currentMekanik._id}`, formData);
            } else {
                // Create
                await axios.post(`${apiUrl}/api/mekanik`, formData);
            }
            setShowModal(false);
            setFormData({ nama: '', type: '', no: '' });
            setCurrentMekanik(null);
            const response = await axios.get(`${apiUrl}api/mekanik`);
            setMekaniks(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (mekanik) => {
        setFormData(mekanik);
        setCurrentMekanik(mekanik);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this mekanik?')) {
            try {
                await axios.delete(`${apiUrl}/api/mekanik`);
                const response = await axios.get(`${apiUrl}/api/mekanik`);
                setMekaniks(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Mekanik</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Mekanik
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Form</th>
                        <th>No. SO</th>
                        <th>Mekanik</th>
                        <th>No. Plat</th>
                        <th>Ekspedisi</th>
                        <th>Nama Mekanik</th>
                        <th>No. ID</th>
                        <th>Perbaikan</th>
                        <th>Borongan</th>
                    </tr>
                </thead>
                <tbody>
                    {mekaniks.map(mekanik => (
                        <tr key={mekanik._id}>
                            <td>{mekanik.nama}</td>
                            <td>{mekanik.type}</td>
                            <td>{mekanik.no}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(mekanik)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(mekanik._id)} className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentMekanik ? 'Edit Mekanik' : 'Add New Mekanik'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoForm">
                            <Form.Label>No. Form</Form.Label>
                            <Form.Control
                                type="number"
                                name="noForm"
                                value={formData.noForm}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoSO">
                            <Form.Label>No. SO</Form.Label>
                            <Form.Control
                                type="number"
                                name="noSO"
                                value={formData.noSO}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMekanik">
                            <Form.Label>Mekanik</Form.Label>
                            <Form.Control
                                type="text"
                                name="mekanik"
                                value={formData.mekanik}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoPlat">
                            <Form.Label>No. Plat</Form.Label>
                            <Form.Control
                                type="text"
                                name="noPlat"
                                value={formData.noPlat}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEkspedisi">
                            <Form.Label>Ekspedisi</Form.Label>
                            <Form.Control
                                type="text"
                                name="ekspedisi"
                                value={formData.ekspedisi}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoForm">
                            <Form.Label>No. Form</Form.Label>
                            <Form.Control
                                type="number"
                                name="no"
                                value={formData.no}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNamaMekanik">
                            <Form.Label>Nama Mekanik</Form.Label>
                            <Form.Control
                                type="text"
                                name="namaMekanik"
                                value={formData.namaMekanik}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoID">
                            <Form.Label>No. Form</Form.Label>
                            <Form.Control
                                type="number"
                                name="noID"
                                value={formData.noID}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPerbaikan">
                            <Form.Label>Perbaikan</Form.Label>
                            <Form.Control
                                type="number"
                                name="perbaikan"
                                value={formData.perbaikan}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBorongan">
                            <Form.Label>Borongan</Form.Label>
                            <Form.Control
                                type="text"
                                name="borongan"
                                value={formData.borongan}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentMekanik ? 'Update Mekanik' : 'Add Mekanik'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MekanikPage;
