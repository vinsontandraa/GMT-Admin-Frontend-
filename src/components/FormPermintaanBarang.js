import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const FormPermintaanBarang = () => {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [formData, setFormData] = useState({
        no: '',
        tanggal: '',
        noForm: '',
        noPlat: '',
        kode: '',
        namaMitra: '',
        noID: '',
        tujuanPermintaan: '',
        masalahYangTerjadi: '',
        solusi: '',
        diDiagnosaOleh: '',
        yaTidak: false,
        produk: '',
        tipe: '',
        satuan: '',
        qty: 0,
        // Fields for supervisor approval
        yaTidakDitinjau: false,
        stokBeli: '',
        tanggalDitinjau: '',
        namaDitinjau: '',
        passwordDitinjau: '',
        mekanik: '',
        noSO: '',
        supplier: '',
        noPO: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get('/api/FormPermintaanBarangs');
                setEntries(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchEntries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEntry) {
                // Update
                await axios.put(`/api/FormPermintaanBarangs/${currentEntry._id}`, formData);
            } else {
                // Create
                await axios.post('/api/FormPermintaanBarangs', formData);
            }
            setShowModal(false);
            setFormData({
                no: '',
                tanggal: '',
                noForm: '',
                noPlat: '',
                kode: '',
                namaMitra: '',
                noID: '',
                tujuanPermintaan: '',
                masalahYangTerjadi: '',
                solusi: '',
                diDiagnosaOleh: '',
                yaTidak: false,
                produk: '',
                tipe: '',
                satuan: '',
                qty: 0,
                yaTidakDitinjau: false,
                stokBeli: '',
                tanggalDitinjau: '',
                namaDitinjau: '',
                passwordDitinjau: '',
                mekanik: '',
                noSO: '',
                supplier: '',
                noPO: '',
            });
            setCurrentEntry(null);
            const response = await axios.get('/api/FormPermintaanBarangs');
            setEntries(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (entry) => {
        setFormData(entry);
        setCurrentEntry(entry);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await axios.delete(`/api/FormPermintaanBarangs/${id}`);
                const response = await axios.get('/api/FormPermintaanBarangs');
                setEntries(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    const handleApprove = async (id) => {
        if (window.confirm('Are you sure you want to approve this task?')) {
            try {
                await axios.post(`/api/FormPermintaanBarangs/${id}/approve`, { approved: true, ...formData });
                const response = await axios.get('/api/FormPermintaanBarangs');
                setEntries(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Sparepart Management</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Entry
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No Form</th>
                        <th>No Plat</th>
                        <th>Kode</th>
                        <th>Nama Mitra</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            <td>{entry.no}</td>
                            <td>{entry.tanggal}</td>
                            <td>{entry.noForm}</td>
                            <td>{entry.noPlat}</td>
                            <td>{entry.kode}</td>
                            <td>{entry.namaMitra}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(entry)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(entry._id)}>Delete</Button>{' '}
                                {!entry.approved && <Button variant="success" onClick={() => handleApprove(entry._id)}>Approve</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEntry ? 'Edit Entry' : 'Add New Entry'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formNo">
                            <Form.Label>No</Form.Label>
                            <Form.Control type="text" name="no" value={formData.no} onChange={handleChange} required />
                        </Form.Group>
                        {/* Add the rest of the form fields similarly */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {currentEntry ? 'Update' : 'Create'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default FormPermintaanBarang;
