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

const SparePart = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSparePart, setCurrentSparePart] = useState(null);
  const [formData, setFormData] = useState({
    No: "",
    Tanggal: "",
    NoForm: "",
    NoPlatKode: "",
    NamaMitra: "",
    NoID: "",
    TujuanPermintaan: "",
    MasalahYangTerjadi: "",
    Solusi: "",
    DiDiagnosaOleh: "",
    YaTidakPermintaan: "",
    Produk: "",
    Tipe: "",
    satuan: "",
    qty: 0,
    YaTidakDitinjau: "",
    StokBeli: "",
    Tanggal2: "",
    Nama: "",
    Password: "",
    Mekanik: "",
    NoSO: "",
    Supplier: "",
    NoPO: ""
  });
  const [error, setError] = useState("");
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/spareparts`);
        setSpareParts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    fetchSpareParts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSparePart) {
        // Update
        await axios.put(`${apiUrl}/api/spareparts/${currentSparePart._id}`, formData);
      } else {
        // Create
        await axios.post(`${apiUrl}/api/spareparts`, formData);
      }
      setShowModal(false);
      setFormData({
        No: "",
        Tanggal: "",
        NoForm: "",
        NoPlatKode: "",
        NamaMitra: "",
        NoID: "",
        TujuanPermintaan: "",
        MasalahYangTerjadi: "",
        Solusi: "",
        DiDiagnosaOleh: "",
        YaTidakPermintaan: "",
        Produk: "",
        Tipe: "",
        satuan: "",
        qty: 0,
        YaTidakDitinjau: "",
        StokBeli: "",
        Tanggal2: "",
        Nama: "",
        Password: "",
        Mekanik: "",
        NoSO: "",
        Supplier: "",
        NoPO: ""
      });
      setCurrentSparePart(null);
      const response = await axios.get(`${apiUrl}/api/spareparts`);
      setSpareParts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    }
  };

  const handleEdit = (sparePart) => {
    setFormData(sparePart);
    setCurrentSparePart(sparePart);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this spare part?")) {
      try {
        await axios.delete(`${apiUrl}/api/spareparts/${id}`);
        const response = await axios.get(`${apiUrl}/api/spareparts`);
        setSpareParts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Spare Parts</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add New Spare Part
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>No Form</th>
            <th>No Plat Kode</th>
            <th>Nama Mitra</th>
            <th>No ID</th>
            <th>Tujuan Permintaan</th>
            <th>Masalah yang Terjadi</th>
            <th>Solusi</th>
            <th>Di Diagnosa Oleh</th>
            <th>Ya / Tidak Permintaan</th>
            <th>Produk</th>
            <th>Tipe</th>
            <th>Satuan</th>
            <th>Qty</th>
            <th>Ya / Tidak Ditinjau</th>
            <th>Stok / Beli</th>
            <th>Tanggal2</th>
            <th>Nama</th>
            <th>Password</th>
            <th>Mekanik</th>
            <th>No SO</th>
            <th>Supplier</th>
            <th>No. PO</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sparePart) => (
            <tr key={sparePart._id}>
              <td>{sparePart.No}</td>
              <td>{new Date(sparePart.Tanggal).toLocaleDateString()}</td>
              <td>{sparePart.NoForm}</td>
              <td>{sparePart.NoPlatKode}</td>
              <td>{sparePart.NamaMitra}</td>
              <td>{sparePart.NoID}</td>
              <td>{sparePart.TujuanPermintaan}</td>
              <td>{sparePart.MasalahYangTerjadi}</td>
              <td>{sparePart.Solusi}</td>
              <td>{sparePart.DiDiagnosaOleh}</td>
              <td>{sparePart.YaTidakPermintaan}</td>
              <td>{sparePart.Produk}</td>
              <td>{sparePart.Tipe}</td>
              <td>{sparePart.satuan}</td>
              <td>{sparePart.qty}</td>
              <td>{sparePart.YaTidakDitinjau}</td>
              <td>{sparePart.StokBeli}</td>
              <td>{new Date(sparePart.Tanggal2).toLocaleDateString()}</td>
              <td>{sparePart.Nama}</td>
              <td>{sparePart.Password}</td>
              <td>{sparePart.Mekanik}</td>
              <td>{sparePart.NoSO}</td>
              <td>{sparePart.Supplier}</td>
              <td>{sparePart.NoPO}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(sparePart)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(sparePart._id)}
                  className="mx-2"
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
            {currentSparePart ? "Edit Spare Part" : "Add New Spare Part"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNo">
              <Form.Label>No</Form.Label>
              <Form.Control
                type="text"
                name="No"
                value={formData.No}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTanggal">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="Tanggal"
                value={formData.Tanggal}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoForm">
              <Form.Label>No Form</Form.Label>
              <Form.Control
                type="text"
                name="NoForm"
                value={formData.NoForm}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoPlatKode">
              <Form.Label>No Plat Kode</Form.Label>
              <Form.Control
                type="text"
                name="NoPlatKode"
                value={formData.NoPlatKode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaMitra">
              <Form.Label>Nama Mitra</Form.Label>
              <Form.Control
                type="text"
                name="NamaMitra"
                value={formData.NamaMitra}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoID">
              <Form.Label>No ID</Form.Label>
              <Form.Control
                type="text"
                name="NoID"
                value={formData.NoID}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTujuanPermintaan">
              <Form.Label>Tujuan Permintaan</Form.Label>
              <Form.Control
                type="text"
                name="TujuanPermintaan"
                value={formData.TujuanPermintaan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMasalahYangTerjadi">
              <Form.Label>Masalah yang Terjadi</Form.Label>
              <Form.Control
                type="text"
                name="MasalahYangTerjadi"
                value={formData.MasalahYangTerjadi}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSolusi">
              <Form.Label>Solusi</Form.Label>
              <Form.Control
                type="text"
                name="Solusi"
                value={formData.Solusi}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiDiagnosaOleh">
              <Form.Label>Di Diagnosa Oleh</Form.Label>
              <Form.Control
                type="text"
                name="DiDiagnosaOleh"
                value={formData.DiDiagnosaOleh}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYaTidakPermintaan">
              <Form.Label>Ya / Tidak Permintaan</Form.Label>
              <Form.Control
                as="select"
                name="YaTidakPermintaan"
                value={formData.YaTidakPermintaan}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProduk">
              <Form.Label>Produk</Form.Label>
              <Form.Control
                type="text"
                name="Produk"
                value={formData.Produk}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTipe">
              <Form.Label>Tipe</Form.Label>
              <Form.Control
                type="text"
                name="Tipe"
                value={formData.Tipe}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSatuan">
              <Form.Label>Satuan</Form.Label>
              <Form.Control
                type="text"
                name="satuan"
                value={formData.satuan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQty">
              <Form.Label>Qty</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYaTidakDitinjau">
              <Form.Label>Ya / Tidak Ditinjau</Form.Label>
              <Form.Control
                as="select"
                name="YaTidakDitinjau"
                value={formData.YaTidakDitinjau}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStokBeli">
              <Form.Label>Stok / Beli</Form.Label>
              <Form.Control
                type="text"
                name="StokBeli"
                value={formData.StokBeli}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTanggal2">
              <Form.Label>Tanggal2</Form.Label>
              <Form.Control
                type="date"
                name="Tanggal2"
                value={formData.Tanggal2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="Nama"
                value={formData.Nama}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMekanik">
              <Form.Label>Mekanik</Form.Label>
              <Form.Control
                type="text"
                name="Mekanik"
                value={formData.Mekanik}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoSO">
              <Form.Label>No SO</Form.Label>
              <Form.Control
                type="text"
                name="NoSO"
                value={formData.NoSO}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSupplier">
              <Form.Label>Supplier</Form.Label>
              <Form.Control
                type="text"
                name="Supplier"
                value={formData.Supplier}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoPO">
              <Form.Label>No. PO</Form.Label>
              <Form.Control
                type="text"
                name="NoPO"
                value={formData.NoPO}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentSparePart ? "Update Spare Part" : "Add Spare Part"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SparePart;
