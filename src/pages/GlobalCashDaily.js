import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const GlobalCashDaily = () => {
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
    voucher: "",
    jenis: "",
    keterangan: "",
    PJ: "",
    kasKeluar: 0,
    kasMasuk: 0,
    saldo: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/global-cash-daily");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };
    const fetchPlates = async () => {
      try {
        const response = await axios.get("/api/plates");
        setPlates(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    const fetchMitra = async () => {
      try {
        const response = await axios.get("/api/mitra");
        setMitra(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    const fetchJenis = async () => {
      try {
        const response = await axios.get("/api/jenis");
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
        // Update
        await axios.put(`/api/global-cash-daily/${currentEntry._id}`, formData);
      } else {
        // Create
        await axios.post("/api/global-cash-daily", formData);
      }
      setShowModal(false);
      setFormData({
        tanggal: "",
        noPlat: "",
        kode: "",
        mitra: "",
        id: "",
        voucher: "",
        jenis: "",
        keterangan: "",
        PJ: "",
        kasKeluar: 0,
        kasMasuk: 0,
        saldo: 0,
      });
      setCurrentEntry(null);
      const response = await axios.get("/api/global-cash-daily");
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
        await axios.delete(`/api/global-cash-daily/${id}`);
        const response = await axios.get("/api/global-cash-daily");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Kas Harian Global</h2>
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
            <th>No Voucher</th>
            <th>Jenis/Type</th>
            <th>Keterangan</th>
            <th>PJ</th>
            <th>Kas Keluar</th>
            <th>Kas Masuk</th>
            <th>Saldo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.tanggal).toLocaleDateString()}</td>
              <td>{entry.noPlat}</td>
              <td>{entry.kode}</td>
              <td>{entry.mitra}</td>
              <td>{entry.id}</td>
              <td>{entry.voucher}</td>
              <td>{entry.jenis}</td>
              <td>{entry.keterangan}</td>
              <td>{entry.PJ}</td>
              <td>{entry.kasKeluar}</td>
              <td>{entry.kasMasuk}</td>
              <td>{entry.saldo}</td>
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
            <Form.Group controlId="formNoPlat">
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
            <Form.Group controlId="formKode">
              <Form.Label>Kode</Form.Label>
              <Form.Control
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMitra">
              <Form.Label>Mitra</Form.Label>

              <Form.Control
                as="select"
                name="mitra"
                value={formData.mitra}
                onChange={handleChange}
                required
              >
                <option value="">Select Nama Mitra</option>
                {mitra.map((mitra) => (
                  <option key={mitra._id} value={mitra.nama}>
                    {mitra.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formVoucher">
              <Form.Label>Voucher</Form.Label>
              <Form.Control
                type="text"
                name="voucher"
                value={formData.voucher}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formJenis">
              <Form.Label>Jenis</Form.Label>
              <Form.Control
                as="select"
                name="jenis"
                value={formData.jenis}
                onChange={handleChange}
                required
              >
                <option value="">Select Jenis</option>
                {jenis.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formKeterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPJ">
              <Form.Label>PJ</Form.Label>
              <Form.Control
                type="text"
                name="PJ"
                value={formData.PJ}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formKasKeluar">
              <Form.Label>Kas Keluar</Form.Label>
              <Form.Control
                type="number"
                name="kasKeluar"
                value={formData.kasKeluar}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKasMasuk">
              <Form.Label>Kas Masuk</Form.Label>
              <Form.Control
                type="number"
                name="kasMasuk"
                value={formData.kasMasuk}
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
            <Button variant="primary" type="submit">
              {currentEntry ? "Update Entry" : "Add Entry"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GlobalCashDaily;
