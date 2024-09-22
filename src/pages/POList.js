import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const FormPO = () => {
  const [formPOs, setFormPOs] = useState([]);
  const [formData, setFormData] = useState({
    no: '',
    tanggal: '',
    noForm: '',
    noPO: '',
    noPlat: '',
    kode: '',
    supplier: '',
    produk: '',
    tipe: '',
    satuan: '',
    qty: '',
    upload: '',
    merek: '',
    qtyKetersediaan: '',
    keterangan: ''
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFormPOs = async () => {
      try {
        const response = await axios.get('/api/form-po');
        setFormPOs(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'An unexpected error occurred');
      }
    };
    fetchFormPOs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/form-po', formData);
      setShowModal(false);
      setFormData({});
      const response = await axios.get('/api/form-po');
      setFormPOs(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return (
    <>
      <h2>Form PO Pembelian Barang</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowModal(true)}>Add New PO</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>No Form</th>
            <th>No PO</th>
            <th>No Plat</th>
            <th>Kode</th>
            <th>Supplier</th>
            <th>Produk</th>
            <th>Tipe</th>
            <th>Satuan</th>
            <th>Qty</th>
            <th>Merek</th>
            <th>Ketersediaan</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {formPOs.map((po) => (
            <tr key={po._id}>
              <td>{po.no}</td>
              <td>{new Date(po.tanggal).toLocaleDateString()}</td>
              <td>{po.noForm}</td>
              <td>{po.noPO}</td>
              <td>{po.noPlat}</td>
              <td>{po.kode}</td>
              <td>{po.supplier}</td>
              <td>{po.produk}</td>
              <td>{po.tipe}</td>
              <td>{po.satuan}</td>
              <td>{po.qty}</td>
              <td>{po.merek}</td>
              <td>{po.qtyKetersediaan}</td>
              <td>{po.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Form PO */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New PO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="no">
              <Form.Label>No</Form.Label>
              <Form.Control type="text" name="no" value={formData.no} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="tanggal">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} required />
            </Form.Group>
            {/* Repeat for other form fields */}
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormPO;
