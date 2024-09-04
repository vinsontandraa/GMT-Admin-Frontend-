import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";

const MutasiKasBankPiutang = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    noRef: "",
    noInvoice: "",
    keterangan: "",
    debit: 0,
    kredit: 0,
    saldo: 0,
    namaPengirim: "",
  });
  const [error, setError] = useState("");
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/mutasi-kas-bank-piutang`);
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
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
        await axios.put(`${apiUrl}/api/mutasi-kas-bank-piutang/${currentEntry._id}`, formData);
      } else {
        await axios.post(`${apiUrl}/api/mutasi-kas-bank-piutang`, formData);
      }
      setShowModal(false);
      setFormData({
        tanggal: "",
        noRef: "",
        noInvoice: "",
        keterangan: "",
        debit: 0,
        kredit: 0,
        saldo: 0,
        namaPengirim: "",
      });
      setCurrentEntry(null);
      const response = await axios.get(`${apiUrl}/api/mutasi-kas-bank-piutang`);
      setEntries(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`${apiUrl}/api/mutasi-kas-bank-piutang/${id}`);
        const response = await axios.get(`${apiUrl}/api/mutasi-kas-bank-piutang`);
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Mutasi Kas Bank Piutang</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add New Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>No Ref</th>
            <th>No Invoice</th>
            <th>Keterangan</th>
            <th>Debit</th>
            <th>Kredit</th>
            <th>Saldo</th>
            <th>Nama Pengirim</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.tanggal).toLocaleDateString()}</td>
              <td>{entry.noRef}</td>
              <td>{entry.noInvoice}</td>
              <td>{entry.keterangan}</td>
              <td>{entry.debit}</td>
              <td>{entry.kredit}</td>
              <td>{entry.saldo}</td>
              <td>{entry.namaPengirim}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(entry)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(entry._id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEntry ? "Edit Entry" : "Add New Entry"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group controlId="formNoRef">
              <Form.Label>No Ref</Form.Label>
              <Form.Control
                type="text"
                name="noRef"
                value={formData.noRef}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoInvoice">
              <Form.Label>No Invoice</Form.Label>
              <Form.Control
                type="text"
                name="noInvoice"
                value={formData.noInvoice}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKeterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDebit">
              <Form.Label>Debit</Form.Label>
              <Form.Control
                type="number"
                name="debit"
                value={formData.debit}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKredit">
              <Form.Label>Kredit</Form.Label>
              <Form.Control
                type="number"
                name="kredit"
                value={formData.kredit}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSaldo">
              <Form.Label>Saldo</Form.Label>
              <Form.Control
                type="number"
                name="saldo"
                value={formData.saldo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaPengirim">
              <Form.Label>Nama Pengirim</Form.Label>
              <Form.Control
                type="text"
                name="namaPengirim"
                value={formData.namaPengirim}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentEntry ? "Update Entry" : "Add Entry"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MutasiKasBankPiutang;
