// src/pages/FormPermintaanBarangTasklist.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert, Modal, Form } from 'react-bootstrap';

const FormPermintaanBarangTasklist = ({ role }) => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        yaTidakDitinjau: '',
        stokBeli: '',
        tanggalDitinjau: '',
        namaDitinjau: '',
        passwordDitinjau: '',
        mekanik: '',
        noSO: '',
        supplier: '',
        noPO: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/FormPermintaanBarangs`);
                setTasks(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        };
        fetchTasks();
    }, []);

    const handleShow = (task) => {
        setCurrentTask(task);
        setFormData({
            yaTidakDitinjau: task.yaTidakDitinjau || '',
            stokBeli: task.stokBeli || '',
            tanggalDitinjau: task.tanggalDitinjau || '',
            namaDitinjau: task.namaDitinjau || '',
            passwordDitinjau: task.passwordDitinjau || '',
            mekanik: task.mekanik || '',
            noSO: task.noSO || '',
            supplier: task.supplier || '',
            noPO: task.noPO || '',
            status: task.status || 'pending'
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentTask(null);
        setFormData({
            yaTidakDitinjau: '',
            stokBeli: '',
            tanggalDitinjau: '',
            namaDitinjau: '',
            passwordDitinjau: '',
            mekanik: '',
            noSO: '',
            supplier: '',
            noPO: '',
            status: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleApprove = async () => {
        try {
            await axios.put(`${apiUrl}/api/FormPermintaanBarangs/${currentTask._id}`, { ...formData, status: 'approved' });
            setSuccess('Task approved successfully');
            handleClose();
            setTasks(tasks.map(task => task._id === currentTask._id ? { ...task, ...formData, status: 'approved' } : task));
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
            setSuccess('');
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(`${apiUrl}/api/FormPermintaanBarangs/${currentTask._id}`, { status: 'rejected' });
            setSuccess('Task rejected successfully');
            handleClose();
            setTasks(tasks.map(task => task._id === currentTask._id ? { ...task, status: 'rejected' } : task));
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
            setSuccess('');
        }
    };

    return (
        <Container>
            <h2>{role === 'admin' ? 'Admin Task List' : 'Supervisor Task List'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Form</th>
                        <th>No Plat</th>
                        <th>Kode</th>
                        <th>Nama Mitra</th>
                        <th>No ID</th>
                        <th>Tujuan Permintaan</th>
                        <th>Masalah yang terjadi</th>
                        <th>Solusi</th>
                        <th>Di Diagnosa Oleh</th>
                        <th>Ya / Tidak</th>
                        <th>Produk</th>
                        <th>Tipe</th>
                        <th>Satuan</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.no}</td>
                            <td>{task.tanggal}</td>
                            <td>{task.noForm}</td>
                            <td>{task.noPlat}</td>
                            <td>{task.kode}</td>
                            <td>{task.namaMitra}</td>
                            <td>{task.noID}</td>
                            <td>{task.tujuanPermintaan}</td>
                            <td>{task.masalahYangTerjadi}</td>
                            <td>{task.solusi}</td>
                            <td>{task.diDiagnosaOleh}</td>
                            <td>{task.yaTidak}</td>
                            <td>{task.produk}</td>
                            <td>{task.tipe}</td>
                            <td>{task.satuan}</td>
                            <td>{task.qty}</td>
                            <td>{task.status}</td>
                            <td>
                                <Button variant="info" onClick={() => handleShow(task)}>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {currentTask && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{role === 'supervisor' ? 'Approve/Reject Task' : 'Task Details'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {Object.keys(currentTask).map(key => (
                                <Form.Group key={key} controlId={`form${key}`}>
                                    <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                                    <Form.Control
                                        type={key === 'tanggal' ? 'date' : 'text'}
                                        name={key}
                                        value={currentTask[key] || formData[key]}
                                        onChange={handleChange}
                                        disabled={role === 'admin' ? true : false}
                                        required={role === 'supervisor' ? false : true}
                                    />
                                </Form.Group>
                            ))}
                            {role === 'supervisor' && (
                                <>
                                    <Button disabled={currentTask.status === 'approved' || currentTask.status === 'rejected'} variant="success" onClick={handleApprove}>Approve</Button>
                                    <Button disabled={currentTask.status === 'approved' || currentTask.status === 'rejected'}  variant="danger" onClick={handleReject}>Reject</Button>
                                </>
                            )}
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default FormPermintaanBarangTasklist;
