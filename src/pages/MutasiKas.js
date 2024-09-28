import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const MutasiKasBank = () => {
  const [entries, setEntries] = useState([]);
  const [plates, setPlates] = useState([]);
  const [mitra, setMitra] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    noPlat: "",
    kode: "",
    mitra: "",
    id: "",
    noRef: "",
    jenis: "",
    keterangan: "",
    kasKeluar: 0,
    kasMasuk: 0,
    saldo: 0,
    namaBank: "",
    noRekening: "",
    namaRekening: "",
  });
  const [error, setError] = useState("");
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/mutasi-kas-bank`);
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    const fetchPlates = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/plates`);
        setPlates(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    const fetchMitra = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/mitra`);
        setMitra(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    const fetchJenis = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/jenis`);
        setJenis(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    fetchEntries();
    fetchPlates();
    fetchMitra();
    fetchJenis();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEntry) {
        await axios.put(`${apiUrl}/api/mutasi-kas-bank/${currentEntry._id}`, formData);
      } else {
        await axios.post(`${apiUrl}/api/mutasi-kas-bank`, formData);
      }
      setShowModal(false);
      setFormData({
        tanggal: "",
        noPlat: "",
        kode: "",
        mitra: "",
        id: "",
        noRef: "",
        jenis: "",
        keterangan: "",
        kasKeluar: 0,
        kasMasuk: 0,
        saldo: 0,
        namaBank: "",
        noRekening: "",
        namaRekening: "",
      });
      setCurrentEntry(null);
      const response = await axios.get(`${apiUrl}/api/mutasi-kas-bank`);
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
        await axios.delete(`${apiUrl}/api/mutasi-kas-bank/${id}`);
        const response = await axios.get("/api/mutasi-kas-bank");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  const isEntries = entries === 0;

  return (
    <Container className="mt-4">
      <h2>Mutasi Kas Bank</h2>
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
            <th>No Plat</th>
            <th>Kode</th>
            <th>Mitra</th>
            <th>No ID</th>
            <th>No. Ref</th>
            <th>Jenis</th>
            <th>Keterangan</th>
            <th>Kas Keluar</th>
            <th>Kas Masuk</th>
            <th>Saldo</th>
            <th>Nama Bank</th>
            <th>No Rekening</th>
            <th>Nama Rekening</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isEntries && (
            <tr>
              <th colSpan={15} className="text-center p-3">No data avalaible in table</th>
            </tr>
          )}
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.tanggal).toLocaleDateString()}</td>
              <td>{entry.noPlat}</td>
              <td>{entry.kode}</td>
              <td>{entry.mitra}</td>
              <td>{entry.id}</td>
              <td>{entry.noRef}</td>
              <td>{entry.jenis}</td>
              <td>{entry.keterangan}</td>
              <td>{entry.kasKeluar}</td>
              <td>{entry.kasMasuk}</td>
              <td>{entry.saldo}</td>
              <td>{entry.namaBank}</td>
              <td>{entry.noRekening}</td>
              <td>{entry.namaRekening}</td>
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
        <Modal.Body className="p-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTanggal" className="mb-3">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoPlat" className="mb-3">
              <Form.Label>No Plat</Form.Label>
              <Form.Control
                as="select"
                name="noPlat"
                value={formData.noPlat}
                onChange={handleChange}
                required
              >
                <option value="">Select No Plat</option>
                {plates.map((plate) => (
                  <option key={plate._id} value={plate.noPlat}>
                    {plate.noPlat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formKode" className="mb-3">
              <Form.Label>Kode</Form.Label>
              <Form.Control
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMitra" className="mb-3">
              <Form.Label>Mitra</Form.Label>
              <Form.Control
                as="select"
                name="mitra"
                value={formData.mitra}
                onChange={handleChange}
                required
              >
                <option value="">Select Mitra</option>
                {mitra.map((mitra) => (
                  <option key={mitra._id} value={mitra.nama}>
                    {mitra.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formId" className="mb-3">
              <Form.Label>No ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoRef" className="mb-3">
              <Form.Label>No. Ref</Form.Label>
              <Form.Control
                type="text"
                name="noRef"
                value={formData.noRef}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formJenis" className="mb-3">
              <Form.Label>Jenis/Type</Form.Label>
              <Form.Control
                as="select"
                name="jenis"
                value={formData.jenis}
                onChange={handleChange}
                required
              >
                <option value="">Select Jenis/Type</option>
                {jenis.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formKeterangan" className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formKasKeluar" className="mb-3">
              <Form.Label>Kas Keluar</Form.Label>
              <Form.Control
                type="number"
                name="kasKeluar"
                value={formData.kasKeluar}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKasMasuk" className="mb-3">
              <Form.Label>Kas Masuk</Form.Label>
              <Form.Control
                type="number"
                name="kasMasuk"
                value={formData.kasMasuk}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSaldo" className="mb-3">
              <Form.Label>Saldo</Form.Label>
              <Form.Control
                type="number"
                name="saldo"
                value={formData.saldo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaBank" className="mb-3">
              <Form.Label>Nama Bank</Form.Label>
              <Form.Control
                type="text"
                name="namaBank"
                value={formData.namaBank}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoRekening" className="mb-3">
              <Form.Label>No Rekening</Form.Label>
              <Form.Control
                type="text"
                name="noRekening"
                value={formData.noRekening}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaRekening" className="mb-3">
              <Form.Label>Nama Rekening</Form.Label>
              <Form.Control
                type="text"
                name="namaRekening"
                value={formData.namaRekening}
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

export default MutasiKasBank;
