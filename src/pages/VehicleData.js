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

const VehicleData = () => {
  const [plates, setPlates] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([]);

  const [formData, setFormData] = useState({
    notes: "",
    bpkbNo: "",
    stnkNo: "",
    hargaBeli: 0,
    pembayaranPembelian: 0,
    hargaJual: 0,
    pembayaranPenjualan: 0,
    merek: "",
    tahunPembuatan: 0,
    noRangka: "",
    upload: "",
    ekspedisi: "",
    keteranganKendaraan: "",
    tanggalBeli: "",
    namaPenjual: "",
    keteranganPembelian: "",
    tanggalJual: "",
    namaPembeli: "",
    keteranganPenjualan: "",

    
    
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/vehicle-data");
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
    
    fetchEntries();
    fetchPlates();
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
        await axios.put(`/api/vehicle-data/${currentEntry._id}`, formData);
      } else {
        // Create
        await axios.post("/api/vehicle-data", formData);
      }
      setShowModal(false);
      setFormData({
        notes: "",
        bpkbNo: "",
        stnkNo: "",
        hargaBeli: 0,
        pembayaranPembelian: 0,
        hargaJual: 0,
        pembayaranPenjualan: 0,
        merek: "",
        tahunPembuatan: 0,
        noRangka: "",
        upload: "",
        ekspedisi: "",
        keteranganKendaraan: "",
        tanggalBeli: "",
        namaPenjual: "",
        keteranganPembelian: "",
        tanggalJual: "",
        namaPembeli: "",
        keteranganPenjualan: "",
      });
      setCurrentEntry(null);
      const response = await axios.get("/api/vehicle-data");
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
        await axios.delete(`/api/vehicle-data/${id}`);
        const response = await axios.get("/api/vehicle-data");
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Data Kendaraan</h2>
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
            <th>Ekspedisi</th>
            <th>No Plat</th>
            <th>Notes</th>
            <th>No. BPKB</th>
            <th>Merek</th>
            <th>Tahun Pembuatan</th>
            <th>No. Rangka</th>
            <th>Upload</th>
            <th>Keterangan</th>
            <th>No. STNK</th>
            <th>Tanggal Beli</th>
            <th>Nama Penjual</th>
            <th>Harga Beli</th>
            <th>Pembayaran</th>
            <th>Keterangan</th>
            <th>Tanggal Jual</th>
            <th>Nama Pembeli</th>
            <th>Harga Jual</th>
            <th>Pembayaran</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.ekspedisi}</td>
              <td>{entry.noPlat}</td>
              <td>{entry.notes}</td>
              <td>{entry.bpkbNo}</td>
              <td>{entry.merek}</td>
              <td>{entry.tahunPembuatan}</td>
              <td>{entry.noRangka}</td>
              <td>{entry.upload}</td>
              <td>{entry.keteranganKendaraan}</td>
              <td>{entry.stnkNo}</td>
              <td>{new Date(entry.tanggalBeli).toLocaleDateString()}</td>
              <td>{entry.namaPenjual}</td>
              <td>{entry.hargaBeli}</td>
              <td>{entry.pembayaranPembelian}</td>
              <td>{entry.keteranganPembelian}</td>
              <td>{new Date(entry.tanggalJual).toLocaleDateString()}</td>
              <td>{entry.namaPembeli}</td>
              <td>{entry.hargaJual}</td>
              <td>{entry.pembayaranPenjualan}</td>
              <td>{entry.keteranganPenjualan}</td>
              <td>
              {/* <td>{new Date(entry.tanggal).toLocaleDateString()}</td> */}
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
            <Form.Group controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBpkbNo">
              <Form.Label>No. BPKB</Form.Label>
              <Form.Control
                type="text"
                name="bpkbNo"
                value={formData.bpkbNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMerek">
              <Form.Label>Merek</Form.Label>
              <Form.Control
                type="text"
                name="merek"
                value={formData.merek}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTahunPembuatan">
              <Form.Label>Tahun Pembuatan</Form.Label>
              <Form.Control
                type="number"
                name="tahunPembuatan"
                value={formData.tahunPembuatan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoRangka">
              <Form.Label>No. Rangka</Form.Label>
              <Form.Control
                type="text"
                name="noRangka"
                value={formData.noRangka}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUpload">
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type="text"
                name="upload"
                value={formData.upload}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formKeteranganKendaraan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keteranganKendaraan"
                value={formData.keteranganKendaraan}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formStnkNo">
              <Form.Label>No. STNK</Form.Label>
              <Form.Control
                type="text"
                name="stnkNo"
                value={formData.stnkNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTanggalPembelian">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="tanggalBeli"
                value={formData.tanggalBeli}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaPenjual">
              <Form.Label>Nama Penjual</Form.Label>
              <Form.Control
                type="text"
                name="namaPenjual"
                value={formData.namaPenjual}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHargaBeli">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                name="hargaBeli"
                value={formData.hargaBeli}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPembayaranPembelian">
              <Form.Label>Pembayaran</Form.Label>
              <Form.Control
                type="number"
                name="pembayaranPembelian"
                value={formData.pembayaranPembelian}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKeteranganPembelian">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keteranganPembelian"
                value={formData.keteranganPembelian}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTanggalPenjualan">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="tanggalJual"
                value={formData.tanggalJual}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNamaPenjual">
              <Form.Label>Nama Penjual</Form.Label>
              <Form.Control
                type="text"
                name="namaPembeli"
                value={formData.namaPembeli}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHargaJual">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                name="hargaJual"
                value={formData.hargaJual}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPembayaranPenjualan">
              <Form.Label>Pembayaran</Form.Label>
              <Form.Control
                type="number"
                name="pembayaranPenjualan"
                value={formData.pembayaranPenjualan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKeteranganPenjualan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keteranganPenjualan"
                value={formData.keteranganPenjualan}
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

export default VehicleData;
