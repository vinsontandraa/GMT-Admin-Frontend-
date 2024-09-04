// src/pages/AdminSparepart.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AdminSparepart = () => {
    const [formData, setFormData] = useState({
        no: '',
        tanggal: '',
        noForm: '',
        noPlat: '',
        kode: '',
        namaMitra: '',
        noID: '',
        tujuanPermintaan: '',
        masalah: '',
        solusi: '',
        diDiagnosaOleh: '',
        yaTidak: '',
        produk: '',
        tipe: '',
        satuan: '',
        qty: 0
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/spareparts`, formData);
            setSuccess('Sparepart task created successfully');
            setFormData({
                no: '',
                tanggal: '',
                noForm: '',
                noPlat: '',
                kode: '',
                namaMitra: '',
                noID: '',
                tujuanPermintaan: '',
                masalah: '',
                solusi: '',
                diDiagnosaOleh: '',
                yaTidak: '',
                produk: '',
                tipe: '',
                satuan: '',
                qty: 0
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
            setSuccess('');
        }
    };

    return (
        <Container>
            <h2>Admin: Create Sparepart Task</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                {Object.keys(formData).map(key => (
                    <Form.Group key={key} controlId={`form${key}`}>
                        <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                        <Form.Control
                            type={key === 'tanggal' ? 'date' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default AdminSparepart;
