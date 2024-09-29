// src/pages/AdminFormPermintaanBarang.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const AdminFormPermintaanBarang = () => {
    const [sparepartData, setSparepartData] = useState([]); // Stores spare parts data
    const [formData, setFormData] = useState({
        tanggal: '',
        noPlat: '',
        noForm: '',
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
        qty: 0,
        createdBy: '' // New field for username
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [noFormDisabled, setNoFormDisabled] = useState(false); // State to disable the input field for noForm
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';
    const [plates, setPlates] = useState([]); // State to hold the plates data

    useEffect(() => {
        // Fetch sparepart data for the dropdown
        const fetchSparepartData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/sparepart`); // Adjust the endpoint if necessary
                setSparepartData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch spareparts");
            }
        };

        const fetchPlates = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/plates`); // Adjust your endpoint accordingly
                setPlates(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch plates');
            }
        };

        const fetchUsernameFromToken = () => {
            const token = localStorage.getItem('token'); // Replace 'token' with your actual local storage key
            if (token) {
                const decodedToken = jwtDecode(token);
                setFormData((prevData) => ({ ...prevData, createdBy: decodedToken.username })); // Assuming username is in decoded token
            }
        };

        fetchPlates();
        fetchSparepartData();
        fetchUsernameFromToken(); // Fetch the username from the token

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'noPlat') {
            fetchFormIdByPlatId(value);
        }
    };

    const fetchFormIdByPlatId = async (platId) => {
        try {
            const response = await axios.get(`${apiUrl}/api/forms/getFormIdByPlatId/${platId}`);
            if (response.data && response.data.formId) {
                setFormData((prevData) => ({ ...prevData, noForm: response.data.formId }));
                setNoFormDisabled(true); // Disable the noForm input field once it's set
            } else {
                setFormData((prevData) => ({ ...prevData, noForm: '' }));
                setNoFormDisabled(false); // Enable if no formId is found
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch formId');
        }
    };

    // Auto-fill the Tipe and satuan fields based on selected produk
    const handleProdukChange = async (e) => {
        const selectedProduk = e.target.value;
        setFormData({ ...formData, produk: selectedProduk });

        if (selectedProduk) {
            try {
                const response = await axios.get(`${apiUrl}/api/formPermintaanBarangs/sparepart-data/${selectedProduk}`);
                setFormData({
                    ...formData,
                    produk: selectedProduk,
                    tipe: response.data.tipe,
                    satuan: response.data.satuan
                });
            } catch (err) {
                setError(err.response?.data?.error || "An error occurred while fetching spare part data");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/FormPermintaanBarangs`, formData);
            setSuccess('Form Permintaan Barang created successfully');
            setFormData({
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
                qty: 0,
                createdBy: '' // Reset createdBy field after submission
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
            setSuccess('');
        }
    };

    const tujuanPermintaanOptions = formData.noPlat === 'STOK' ? ['Stok', 'Perbaikan'] : ['Perbaikan'];
    const yaTidakOptions = ['Ya', 'Tidak'];

    return (
        <Container>
            <h2>Form Permintaan Barang</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                {Object.keys(formData).filter(key => key !== 'produk' && key !== 'tipe' && key !== 'satuan').map(key => (
                    <Form.Group key={key} controlId={`form${key}`}>
                        <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                        {key === 'noPlat' ? (
                            <Form.Control
                                as="select"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Plat</option>
                                {plates.map((plate) => (
                                    <option key={plate.noPlat} value={plate.noPlat}>{plate.noPlat}</option> // Adjust based on your plate structure
                                ))}
                            </Form.Control>
                        ) : key === 'tujuanPermintaan' ? (
                            <Form.Control
                                as="select"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Tujuan Permintaan</option>
                                {tujuanPermintaanOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Form.Control>
                        ) : key === 'yaTidak' ? (
                            <Form.Control
                                as="select"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Ya/Tidak</option>
                                {yaTidakOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control
                                type={key === 'tanggal' ? 'date' : 'text'}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required={(key === 'masalah' && formData.tujuanPermintaan === 'Perbaikan') || (key === 'solusi' && formData.tujuanPermintaan === 'Perbaikan') || (key === 'diDiagnosaOleh' && formData.tujuanPermintaan === 'Perbaikan')}
                                disabled={key === 'noForm' && noFormDisabled} // Disable the noForm field after it is set
                            />
                        )}
                    </Form.Group>
                ))}

                <Form.Group controlId="formProduk">
                    <Form.Label>Produk</Form.Label>
                    <Form.Control
                        as="select"
                        name="produk"
                        value={formData.produk}
                        onChange={handleProdukChange}
                        required
                    >
                        <option value="">Select Produk</option>
                        {sparepartData.map((sparepart) => (
                            <option key={sparepart._id} value={sparepart.namaProduk}>
                                {sparepart.namaProduk}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Tipe and Satuan fields are auto-filled based on selected produk */}
                <Form.Group controlId="formTipe">
                    <Form.Label>Tipe</Form.Label>
                    <Form.Control
                        type="text"
                        name="tipe"
                        value={formData.tipe}
                        readOnly
                    />
                </Form.Group>
                <Form.Group controlId="formSatuan">
                    <Form.Label>Satuan</Form.Label>
                    <Form.Control
                        type="text"
                        name="satuan"
                        value={formData.satuan}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formQty">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default AdminFormPermintaanBarang;
