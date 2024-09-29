import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const LakalantasPage = () => {
    const [lakalantass, setLakalantass] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentLakalantas, setCurrentLakalantas] = useState(null);
    const [formData, setFormData] = useState(
        {tanggalKejadian: '', noLaka: '', noPlat: '', ekspedisi: '', namaMitra: '', noID: '', lokasi: '', kronologi: '', penyelesaian: '', rpRincianBiayaLaka: '', keteranganRincianBiayaLaka: '', noRefRincianBiayaLaka: '', tanggalRincianBiayaLaka: '', rpOlehSupir: '', rpOlehPerusahaan: '', upload: '', tglPerbaikanYgDibutuhkan: '', noReportPerbaikanYgDibutuhkan: '', tglSelesai: '' }
    );
    const [error, setError] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchLakalantas = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/lakalantas`);
                console.log('test ' + response.data);
                setLakalantass(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        console.log('test1 ');
        fetchLakalantas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentLakalantas) {
                // Update
                await axios.put(`${apiUrl}/api/lakalantas/${currentLakalantas._id}`, formData);
            } else {
                // Create
                await axios.post(`${apiUrl}/api/lakalantas`, formData);
            }
            setShowModal(false);
            setFormData({tanggalKejadian: '', noLaka: '', noPlat: '', ekspedisi: '', namaMitra: '', noID: '', lokasi: '', kronologi: '', penyelesaian: '', rpRincianBiayaLaka: '', keteranganRincianBiayaLaka: '', noRefRincianBiayaLaka: '', tanggalRincianBiayaLaka: '', rpOlehSupir: '', rpOlehPerusahaan: '', upload: '', tglPerbaikanYgDibutuhkan: '', noReportPerbaikanYgDibutuhkan: '', tglSelesai: '' });
            setCurrentLakalantas(null);
            const response = await axios.get(`${apiUrl}api/lakalantas`);
            setLakalantass(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleEdit = (lakalantas) => {
        setFormData(lakalantas);
        setCurrentLakalantas(lakalantas);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lakalantas?')) {
            try {
                await axios.delete(`${apiUrl}/api/lakalantas`);
                const response = await axios.get(`${apiUrl}/api/lakalantas`);
                setLakalantass(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);  // Convert the ISO string to a Date object
    
        const day = String(date.getDate()).padStart(2, '0');      // Get the day and add leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed) and add leading zero
        const year = date.getFullYear();                          // Get the full year
        
        return `${day}/${month}/${year}`;  // Return in dd/mm/yyyy format
    }

    return (
        <Container className="mt-4">
            <h2>Lakalantas</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Add New Lakalantas
            </Button>
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th rowSpan={2}>Tgl Kejadian</th>
                        <th rowSpan={2}>No. Laka</th>
                        <th rowSpan={2}>No. Plat</th>
                        <th rowSpan={2}>Ekspedisi</th>
                        <th rowSpan={2}>Nama Mitra</th>
                        <th rowSpan={2}>No. ID</th>
                        <th rowSpan={2}>Lokasi</th>
                        <th rowSpan={2}>Kronologi</th>
                        <th rowSpan={2}>Penyelesaian</th>
                        <th colSpan={4}>Rincian Biaya Laka</th>
                        <th>oleh Supir</th>
                        <th>oleh Perusahaan</th>
                        <th colSpan={2}>Perbaikan Yang Dibutuhkan</th>
                        <th rowSpan={2}>Tgl Selesai</th>
                    </tr>
                    <tr>
                        <th>Rp.</th>
                        <th>Keterangan</th>
                        <th>No. Ref</th>
                        <th>Tanggal</th>
                        <th>Rp.</th>
                        <th>Rp.</th>
                        <th>Tgl</th>
                        <th>No. Report</th>
                    </tr>
                </thead>
                <tbody>
                    {lakalantass.map((lakalantas, index) => (
                        <tr key={lakalantas._id}>
                            <td>{index + 1}</td>
                            <td>{formatDate(lakalantas.tanggalKejadian)}</td>
                            <td>{lakalantas.noLaka}</td>
                            <td>{lakalantas.noPlat}</td>
                            <td>{lakalantas.ekspedisi}</td>
                            <td>{lakalantas.namaMitra}</td>
                            <td>{lakalantas.noID}</td>
                            <td>{lakalantas.lokasi}</td>
                            <td>{lakalantas.kronologi}</td>
                            <td>{lakalantas.penyelesaian}</td>
                            <td>{lakalantas.rpRincianBiayaLaka}</td>
                            <td>{lakalantas.keteranganRincianBiayaLaka}</td>
                            <td>{lakalantas.noRefRincianBiayaLaka}</td>
                            <td>{lakalantas.tanggalRincianBiayaLaka}</td>
                            <td>{lakalantas.rpOlehSupir}</td>
                            <td>{lakalantas.rpOlehPerusahaan}</td>
                            <td>{lakalantas.upload}</td>
                            <td>{formatDate(lakalantas.tglPerbaikanYgDibutuhkan)}</td>
                            <td>{lakalantas.noReportPerbaikanYgDibutuhkan}</td>
                            <td>{formatDate(lakalantas.tglSelesai)}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(lakalantas)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(lakalantas._id)} className="mx-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentLakalantas ? 'Edit Lakalantas' : 'Add New Lakalantas'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTanggalKejadian">
                            <Form.Label>Tanggal Kejadian</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggalKejadian"
                                value={formData.tanggalKejadian}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoLaka">
                            <Form.Label>No. Laka</Form.Label>
                            <Form.Control
                                type="number"
                                name="noLaka"
                                value={formData.noLaka}
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
                        <Form.Group controlId="formNamaMitra">
                            <Form.Label>Nama Mitra</Form.Label>
                            <Form.Control
                                type="text"
                                name="namaMitra"
                                value={formData.namaMitra}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoID">
                            <Form.Label>No. ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="noID"
                                value={formData.noID}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLokasi">
                            <Form.Label>Lokasi</Form.Label>
                            <Form.Control
                                type="text"
                                name="lokasi"
                                value={formData.lokasi}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formKronologi" className='mb-3'>
                            <Form.Label>Kronologi</Form.Label>
                            <Form.Control
                                type="text"
                                name="kronologi"
                                value={formData.kronologi}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPenyelesaian" className='mb-3'>
                            <Form.Label>Penyelesaian</Form.Label>
                            <Form.Control
                                type="text"
                                name="penyelesaian"
                                value={formData.penyelesaian}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRpRincianBiayaLaka" className='mb-3'>
                            <Form.Label>Rp Rincian Biaya Laka</Form.Label>
                            <Form.Control
                                type="number"
                                name="rpRincianBiayaLaka"
                                value={formData.rpRincianBiayaLaka}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formKeteranganRincianBiayaLaka" className='mb-3'>
                            <Form.Label>Keterangan Rincian Biaya Laka</Form.Label>
                            <Form.Control
                                type="text"
                                name="keteranganRincianBiayaLaka"
                                value={formData.keteranganRincianBiayaLaka}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoRefRincianBiayaLaka" className='mb-3'>
                            <Form.Label>No Ref Rincian Biaya Laka</Form.Label>
                            <Form.Control
                                type="number"
                                name="noRefRincianBiayaLaka"
                                value={formData.noRefRincianBiayaLaka}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTanggalRincianBiayaLaka" className='mb-3'>
                            <Form.Label>Tanggal Rincian Biaya Laka</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggalRincianBiayaLaka"
                                value={formData.tanggalRincianBiayaLaka}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRpOlehSupir" className='mb-3'>
                            <Form.Label>Rp Oleh Supir</Form.Label>
                            <Form.Control
                                type="number"
                                name="rpOlehSupir"
                                value={formData.rpOlehSupir}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRpOlehPerusahaan" className='mb-3'>
                            <Form.Label>Rp Oleh Perusahaan</Form.Label>
                            <Form.Control
                                type="number"
                                name="rpOlehPerusahaan"
                                value={formData.rpOlehPerusahaan}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formUpload" className='mb-3'>
                            <Form.Label>Upload</Form.Label>
                            <Form.Control
                                type="text"
                                name="upload"
                                value={formData.upload}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTglPerbaikanYgDibutuhkan" className='mb-3'>
                            <Form.Label>Tanggal Perbaikan Yang Dibutuhkan</Form.Label>
                            <Form.Control
                                type="date"
                                name="tglPerbaikanYgDibutuhkan"
                                value={formData.tglPerbaikanYgDibutuhkan}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNoReportlPerbaikanYgDibutuhkan" className='mb-3'>
                            <Form.Label>No Report Perbaikan Yang Dibutuhkan</Form.Label>
                            <Form.Control
                                type="number"
                                name="noReportlPerbaikanYgDibutuhkan"
                                value={formData.noReportlPerbaikanYgDibutuhkan}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTglSelesai" className='mb-3'>
                            <Form.Label>Tanggal Selesai</Form.Label>
                            <Form.Control
                                type="date"
                                name="tglSelesai"
                                value={formData.tglSelesai}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentLakalantas ? 'Update Lakalantas' : 'Add Lakalantas'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default LakalantasPage;
