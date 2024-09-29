import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";

const DataSuratKendaraan = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formData, setFormData] = useState({
    no: "",
    tanggal: "",
    noPlat: "",
    ekspedisi: "",
    vendor: "",
    perubahan: "",
    keterangan: "",
    harga: 0,
    exp: "",
    tagihan: 0,
    tglLunas: "",
    nominal: 0,
    noRef: "",
  });
  const [error, setError] = useState("");
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/data-surat-kendaraan`);
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
        await axios.put(`/api/data-surat-kendaraan/${currentEntry._id}`, formData);
      } else {
        // Create
        await axios.post("/api/data-surat-kendaraan", formData);
      }
      setShowModal(false);
      setFormData({
        no: "",
        tanggal: "",
        noPlat: "",
        ekspedisi: "",
        vendor: "",
        perubahan: "",
        keterangan: "",
        harga: 0,
        exp: "",
        tagihan: 0,
        tglLunas: "",
        nominal: 0,
        noRef: "",
      });
      setCurrentEntry(null);
      const response = await axios.get("/api/data-surat-kendaraan");
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
        await axios.delete(`/api/data-surat-kendaraan/${id}`);
        const response = await axios.get("/api/data-surat-kendaraan");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Data Surat Kendaraan</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>No Plat</th>
            <th>Ekspedisi</th>
            <th>Vendor</th>
            <th>Perubahan</th>
            <th>Keterangan</th>
            <th>Harga</th>
            <th>Exp</th>
            <th>Tagihan</th>
            <th>Tgl Lunas</th>
            <th>Nominal</th>
            <th>No Ref</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.no}</td>
              <td>{entry.tanggal}</td>
              <td>{entry.noPlat}</td>
              <td>{entry.ekspedisi}</td>
              <td>{entry.vendor}</td>
              <td>{entry.perubahan}</td>
              <td>{entry.keterangan}</td>
              <td>{entry.harga}</td>
              <td>{entry.exp}</td>
              <td>{entry.tagihan}</td>
              <td>{entry.tglLunas}</td>
              <td>{entry.nominal}</td>
              <td>{entry.noRef}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(entry)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(entry._id)} className="mx-2">Delete</Button>
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
            <Form.Group controlId="formNoPlat">
              <Form.Label>No Plat</Form.Label>
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
            <Form.Group controlId="formVendor">
              <Form.Label>Vendor</Form.Label>
              <Form.Control
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPerubahan">
              <Form.Label>Perubahan</Form.Label>
              <Form.Control
                type="text"
                name="perubahan"
                value={formData.perubahan}
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
            <Form.Group controlId="formHarga">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExp">
              <Form.Label>Exp</Form.Label>
              <Form.Control
                type="date"
                name="exp"
                value={formData.exp}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTagihan">
              <Form.Label>Tagihan</Form.Label>
              <Form.Control
                type="number"
                name="tagihan"
                value={formData.tagihan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTglLunas">
              <Form.Label>Tgl Lunas</Form.Label>
              <Form.Control
                type="date"
                name="tglLunas"
                value={formData.tglLunas}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNominal">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="number"
                name="nominal"
                value={formData.nominal}
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
            <Button variant="primary" type="submit">
              {currentEntry ? "Update Entry" : "Add Entry"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataSuratKendaraan;
