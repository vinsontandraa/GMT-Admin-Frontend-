// src/pages/SupervisorFormPermintaanBarang.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const SupervisorFormPermintaanBarang = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        yaTidakDitinjau: '',
        stokBeli: '',
        tanggalDitinjau: '',
        mekanik: '',
        supplier: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';
    const [authData, setAuthData] = useState({
        username: '',
        password: ''
    });

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
            mekanik: task.mekanik || '',
            supplier: task.supplier || '',
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
            mekanik: '',
            supplier: '',
            status: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAuthChange = (e) => {
        const { name, value } = e.target;
        setAuthData({ ...authData, [name]: value });
    };

    const authenticateUser = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/authenticateUser`, authData);
            if (response.data.success) {
                setAuthenticated(true);
                setError('');
            } else {
                setError('Invalid credentials, please try again.');
                setAuthenticated(false);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Unauthorized: Please check your credentials.');
            } else {
                setError(err.response?.data?.error || 'An unexpected error occurred');
            }
        }
    };

    const handleApprove = async (type) => {
        try {
            const username = formData.approverUsername; // Get the approver username from formData
            await axios.put(`${apiUrl}/api/FormPermintaanBarangs/${currentTask._id}`, {
                username,
                approvalType: type // Specify whether it's the first or second approval
            });
            setSuccess('Task approved successfully');
            handleClose();
            // Update the tasks state accordingly
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
    const yaTidakOptions = ['Ya', 'Tidak'];
    const stokBeliOptions = ['Stok', 'Beli'] ;

    return (
        <Container>
            <h2>Supervisor: Approve or Reject Tasks</h2>
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
                            <td>{task.masalah}</td>
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
                        <Modal.Title>Approve/Reject Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!authenticated ? (
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={authData.username}
                                        onChange={handleAuthChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={authData.password}
                                        onChange={handleAuthChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={authenticateUser}>Authenticate</Button>
                            </Form>
                        ) : (
                            <Form>
                                {Object.keys(formData).map(key => (
                                    <Form.Group key={key} controlId={`form${key}`}>
                                        <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                                     
                                        {key === 'yaTidakDitinjau' ? (
                                              <Form.Control
                                              as="select"
                                              name={key}
                                              value={formData[key]}
                                              onChange={handleChange}
                                              required
                                          >
                                              <option value="">Select Ya / Tidak </option>
                                              {yaTidakOptions.map((option, index) => (
                                                  <option key={index} value={option}>{option}</option>
                                              ))}
                                          </Form.Control>
                                        ): key === 'stokBeli' ? (
                                            <Form.Control
                                                as="select"
                                                name={key}
                                                value={formData[key]}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Tujuan Permintaan</option>
                                                {stokBeliOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </Form.Control>
                                        ) : (
                                          <Form.Control
                                            type={key === 'tanggalDitinjau' ? 'date' : 'text'}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            required
                                        /> 
                                        )}
                                    </Form.Group>
                                ))}
                               <Button disabled={currentTask.status === 'approved' || currentTask.status === 'rejected'} variant="success" onClick={() => handleApprove('first')}>Approve</Button>
                               <Button disabled={currentTask.status === 'approved' || currentTask.status === 'rejected'} variant="danger" onClick={handleReject}>Reject</Button>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default SupervisorFormPermintaanBarang;
