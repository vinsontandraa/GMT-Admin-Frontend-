import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const DataMitraForm = () => {
  const [mitras, setMitras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMitra, setCurrentMitra] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    noId: '',
    namaLengkap: '',
    namaAlias: '',
    noSIM: '',
    jenisSIM: '',
    exp: '',
    noKTP: '',
    noKK: '',
    tglLahir: '',
    agama: '',
    status: '',
    tglJoin: '',
    noHp: '',
    email: '',
    namaBank: '',
    noRekening: '',
    namaRekening: '',
    keterangan: ''
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMitras();
  }, []);

  const fetchMitras = async () => {
    try {
      const response = await axios.get('/api/mitra');
      setMitras(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentMitra(null);
    setFormData({
      no: '',
      noId: '',
      namaLengkap: '',
      namaAlias: '',
      noSIM: '',
      jenisSIM: '',
      exp: '',
      noKTP: '',
      noKK: '',
      tglLahir: '',
      agama: '',
      status: '',
      tglJoin: '',
      noHp: '',
      email: '',
      namaBank: '',
      noRekening: '',
      namaRekening: '',
      keterangan: ''
    });
    setFiles([]);
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (mitra) => {
    setCurrentMitra(mitra);
    setFormData({
      no: mitra.no,
      noId: mitra.noId,
      namaLengkap: mitra.namaLengkap,
      namaAlias: mitra.namaAlias,
      noSIM: mitra.noSIM,
      jenisSIM: mitra.jenisSIM,
      exp: mitra.exp ? mitra.exp.substring(0, 10) : '',
      noKTP: mitra.noKTP,
      noKK: mitra.noKK,
      tglLahir: mitra.tglLahir ? mitra.tglLahir.substring(0, 10) : '',
      agama: mitra.agama,
      status: mitra.status,
      tglJoin: mitra.tglJoin ? mitra.tglJoin.substring(0, 10) : '',
      noHp: mitra.noHp,
      email: mitra.email,
      namaBank: mitra.namaBank,
      noRekening: mitra.noRekening,
      namaRekening: mitra.namaRekening,
      keterangan: mitra.keterangan
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mitra?')) {
      try {
        await axios.delete(`/api/mitra/${id}`);
        fetchMitras();
      } catch (err) {
        setError(err.response?.data?.error || 'An unexpected error occurred');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    for (let i = 0; i < files.length; i++) {
      form.append('upload', files[i]);
    }

    try {
      if (currentMitra) {
        // Update existing mitra
        await axios.put(`/api/mitra/${currentMitra._id}`, form);
      } else {
        // Create new mitra
        await axios.post('/api/mitra', form);
      }
      fetchMitras();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Data Mitra</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add New Mitra
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>No ID</th>
            <th>Nama Lengkap</th>
            <th>Nama Alias</th>
            <th>No SIM</th>
            <th>Jenis SIM</th>
            <th>Exp</th>
            <th>No KTP</th>
            <th>No KK</th>
            <th>Tgl Lahir</th>
            <th>Agama</th>
            <th>Status</th>
            <th>Tgl Join</th>
            <th>No Hp</th>
            <th>Email</th>
            <th>Nama Bank</th>
            <th>No Rekening</th>
            <th>Nama Rekening</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mitras.map((mitra) => (
            <tr key={mitra._id}>
              <td>{mitra.no}</td>
              <td>{mitra.noId}</td>
              <td>{mitra.namaLengkap}</td>
              <td>{mitra.namaAlias}</td>
              <td>{mitra.noSIM}</td>
              <td>{mitra.jenisSIM}</td>
              <td>{mitra.exp ? mitra.exp.substring(0, 10) : ''}</td>
              <td>{mitra.noKTP}</td>
              <td>{mitra.noKK}</td>
              <td>{mitra.tglLahir ? mitra.tglLahir.substring(0, 10) : ''}</td>
              <td>{mitra.agama}</td>
              <td>{mitra.status}</td>
              <td>{mitra.tglJoin ? mitra.tglJoin.substring(0, 10) : ''}</td>
              <td>{mitra.noHp}</td>
              <td>{mitra.email}</td>
              <td>{mitra.namaBank}</td>
              <td>{mitra.noRekening}</td>
              <td>{mitra.namaRekening}</td>
              <td>{mitra.keterangan}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(mitra)} className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(mitra._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Update */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentMitra ? 'Edit Mitra' : 'Add New Mitra'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Form.Col} controlId="formNo">
                <Form.Label>No</Form.Label>
                <Form.Control type="text" name="no" value={formData.no} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Form.Col} controlId="formNoId">
                <Form.Label>No ID</Form.Label>
                <Form.Control type="text" name="noId" value={formData.noId} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Form.Col} controlId="formNamaLengkap">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required />
              </Form.Group>
            </Form.Row>

            {/* Add other form fields similarly */}
            <Form.Group controlId="formUpload">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
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

export default DataMitraForm;
