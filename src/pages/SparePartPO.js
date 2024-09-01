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

const SparePartPO = () => {
  const [sparePartPOs, setSparePartPOs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSparePartPO, setCurrentSparePartPO] = useState(null);
  const [formData, setFormData] = useState({
    No: "",
    Tanggal: "",
    NoForm: "",
    NoPO: "",
    NoPlat: "",
    Kode: "",
    Supplier: "",
    Produk: "",
    Tipe: "",
    satuan: "",
    qty: 0,
    upload: "",
    Merek: "",
    qtyKetersediaan: 0,
    Keterangan: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSparePartPOs = async () => {
      try {
        const response = await axios.get("/api/sparepartpo");
        setSparePartPOs(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    };

    fetchSparePartPOs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSparePartPO) {
        // Update
        await axios.put(`/api/sparepartpo/${currentSparePartPO._id}`, formData);
      } else {
        // Create
        await axios.post("/api/sparepartpo", formData);
      }
      setShowModal(false);
      setFormData({
        No: "",
        Tanggal: "",
        NoForm: "",
        NoPO: "",
        NoPlat: "",
        Kode: "",
        Supplier: "",
        Produk: "",
        Tipe: "",
        satuan: "",
        qty: 0,
        upload: "",
        Merek: "",
        qtyKetersediaan: 0,
        Keterangan: ""
      });
      setCurrentSparePartPO(null);
      const response = await axios.get("/api/sparepartpo");
      setSparePartPOs(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    }
  };

  const handleEdit = (sparePartPO) => {
    setFormData(sparePartPO);
    setCurrentSparePartPO(sparePartPO);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this spare part PO?")) {
      try {
        await axios.delete(`/api/sparepartpo/${id}`);
        const response = await axios.get("/api/sparepartpo");
        setSparePartPOs(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Spare Part PO</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add New Spare Part PO
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>No. Form</th>
            <th>No. PO</th>
            <th>No Plat</th>
            <th>Kode</th>
            <th>Supplier</th>
            <th>Produk</th>
            <th>Tipe</th>
            <th>Satuan</th>
            <th>Qty</th>
            <th>Upload</th>
            <th>Merek</th>
            <th>Qty Ketersediaan</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sparePartPOs.map((sparePartPO) => (
            <tr key={sparePartPO._id}>
              <td>{sparePartPO.No}</td>
              <td>{new Date(sparePartPO.Tanggal).toLocaleDateString()}</td>
              <td>{sparePartPO.NoForm}</td>
              <td>{sparePartPO.NoPO}</td>
              <td>{sparePartPO.NoPlat}</td>
              <td>{sparePartPO.Kode}</td>
              <td>{sparePartPO.Supplier}</td>
              <td>{sparePartPO.Produk}</td>
              <td>{sparePartPO.Tipe}</td>
              <td>{sparePartPO.satuan}</td>
              <td>{sparePartPO.qty}</td>
              <td>{sparePartPO.upload}</td>
              <td>{sparePartPO.Merek}</td>
              <td>{sparePartPO.qtyKetersediaan}</td>
              <td>{sparePartPO.Keterangan}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(sparePartPO)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(sparePartPO._id)}
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
            {currentSparePartPO ? "Edit Spare Part PO" : "Add New Spare Part PO"}
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
            <Form.Group controlId="formNoPO">
              <Form.Label>No PO</Form.Label>
              <Form.Control
                type="text"
                name="NoPO"
                value={formData.NoPO}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNoPlat">
              <Form.Label>No Plat</Form.Label>
              <Form.Control
                type="text"
                name="NoPlat"
                value={formData.NoPlat}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKode">
              <Form.Label>Kode</Form.Label>
              <Form.Control
                type="text"
                name="Kode"
                value={formData.Kode}
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
            <Form.Group controlId="formUpload">
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type="text"
                name="upload"
                value={formData.upload}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMerek">
              <Form.Label>Merek</Form.Label>
              <Form.Control
                type="text"
                name="Merek"
                value={formData.Merek}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQtyKetersediaan">
              <Form.Label>Qty Ketersediaan</Form.Label>
              <Form.Control
                type="number"
                name="qtyKetersediaan"
                value={formData.qtyKetersediaan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKeterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="Keterangan"
                value={formData.Keterangan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentSparePartPO ? "Update Spare Part PO" : "Add Spare Part PO"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SparePartPO;
