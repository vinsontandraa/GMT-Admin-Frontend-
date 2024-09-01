import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";

const MutasiKasBankListGiro = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formData, setFormData] = useState({
    no: "",
    namaBank: "",
    noRef: "",
    keterangan: "",
    debit: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/mutasi-kas-bank-list-giro");
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
        // Update
        await axios.put(`/api/mutasi-kas-bank-list-giro/${currentEntry._id}`, formData);
      } else {
        // Create
        await axios.post("/api/mutasi-kas-bank-list-giro", formData);
      }
      setShowModal(false);
      setFormData({
        no: "",
        namaBank: "",
        noRef: "",
        keterangan: "",
        debit: 0,
      });
      setCurrentEntry(null);
      const response = await axios.get("/api/mutasi-kas-bank-list-giro");
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
        await axios.delete(`/api/mutasi-kas-bank-list-giro/${id}`);
        const response = await axios.get("/api/mutasi-kas-bank-list-giro");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Mutasi Kas Bank List Giro</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Bank</th>
            <th>No Ref</th>
            <th>Keterangan</th>
            <th>Debit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.no}</td>
              <td>{entry.namaBank}</td>
              <td>{entry.noRef}</td>
              <td>{entry.keterangan}</td>
              <td>{entry.debit}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(entry)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(entry._id)} className="ml-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEntry ? "Edit Entry" : "Add New Entry"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNo">
              <Form.Label>No</Form.Label>
              <Form.Control
                type="text"
                name="no"
                value={formData.no}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaBank">
              <Form.Label>Nama Bank</Form.Label>
              <Form.Control
                type="text"
                name="namaBank"
                value={formData.namaBank}
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
            <Button variant="primary" type="submit">
              {currentEntry ? "Update Entry" : "Add Entry"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MutasiKasBankListGiro;
