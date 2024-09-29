import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Sparepart = () => {
    const [spareparts, setSpareparts] = useState([]);
    const [formData, setFormData] = useState({
        namaProduk: '',
        tipe: '',
        satuan: '',
        jumlah: '',
        supplier: '',
        merek: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal state
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        fetchSpareparts();
    }, []);

    const fetchSpareparts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/sparepart`);
            setSpareparts(response.data);
        } catch (err) {
            console.error('Error fetching spareparts:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${apiUrl}/api/sparepart/${editingId}`, formData);
            } else {
                await axios.post(`${apiUrl}/api/sparepart`, formData);
            }
            fetchSpareparts(); // Refresh the table data
            resetForm();
            handleCloseModal(); // Close the modal after success
        } catch (err) {
            console.error('Error saving sparepart:', err);
        }
    };

    const handleEdit = (sparepart) => {
        setFormData({
            namaProduk: sparepart.namaProduk,
            tipe: sparepart.tipe,
            satuan: sparepart.satuan,
            jumlah: sparepart.jumlah,
            supplier: sparepart.supplier,
            merek: sparepart.merek,
        });
        setEditingId(sparepart._id);
        setShowModal(true); // Show modal for edit
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/sparepart/${id}`);
            fetchSpareparts();
        } catch (err) {
            console.error('Error deleting sparepart:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            namaProduk: '',
            tipe: '',
            satuan: '',
            jumlah: '',
            supplier: '',
            merek: '',
        });
        setEditingId(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <div className="container">
            <h2>Sparepart List</h2>
            <Button variant="primary" onClick={handleOpenModal}>
                Add Sparepart
            </Button>

            {/* Modal for Adding/Editing */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Edit Sparepart' : 'Add Sparepart'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nama Produk</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.namaProduk}
                                onChange={(e) => setFormData({ ...formData, namaProduk: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipe</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.tipe}
                                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Satuan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.satuan}
                                onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Jumlah</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.jumlah}
                                onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Supplier</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.supplier}
                                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Merek</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.merek}
                                onChange={(e) => setFormData({ ...formData, merek: e.target.value })}
                                required
                            />
                        </div>
                        <Button type="submit" className="btn btn-primary mt-3">
                            {editingId ? 'Update Sparepart' : 'Add Sparepart'}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Sparepart Table */}
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>No Id</th>
                        <th>Nama Produk</th>
                        <th>Tipe</th>
                        <th>Satuan</th>
                        <th>Jumlah</th>
                        <th>Supplier</th>
                        <th>Merek</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {spareparts.map((sparepart) => (
                        <tr key={sparepart._id}>
                            <td>{sparepart.noId}</td>
                            <td>{sparepart.namaProduk}</td>
                            <td>{sparepart.tipe}</td>
                            <td>{sparepart.satuan}</td>
                            <td>{sparepart.jumlah}</td>
                            <td>{sparepart.supplier}</td>
                            <td>{sparepart.merek}</td>
                            <td>{new Date(sparepart.createDate).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(sparepart)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(sparepart._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sparepart;
