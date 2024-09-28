import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const DataMitra = ({ existingMitra, onFormSubmit }) => {
  const [mitras, setMitras] = useState([]);
  const [show, setShow] = useState(false);
  const [currentMitra, setCurrentMitra] = useState(null);
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  const [formData, setFormData] = useState(existingMitra || {
    namaLengkap: '',
    namaAlias:  '',
    noSIM:  '',
    jenisSIM:  '',
    exp: '',
    noKTP: '',
    noKK:  '',
    tglLahir:  '',
    agama:  '',
    status:  '',
    tglJoin:  '',
    noHp:  '',
    email:  '',
    namaBank: '',
    noRekening:  '',
    namaRekening:  '',
    keterangan: '',
    images:  [],
  });

  const fetchMitras = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/mitra`);
      setMitras(response.data);
    } catch (error) {
      console.error('Error fetching mitras:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append other fields
    for (const key in formData) {
      if (key === 'images') {
        // Append multiple files
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append('images', formData.images[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      await axios.post('https://gmt-admin-backend-production.up.railway.app/api/mitra/mitras', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onFormSubmit();
    } catch (err) {
      console.error('Error saving Mitra:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/mitra/${id}`);
      fetchMitras();
    } catch (error) {
      console.error('Error deleting mitra:', error);
    }
  };

    // Handle form input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

      // Handle file input change
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
  

  useEffect(() => {
    fetchMitras();
  }, []);

  return (
    <div>
      <h1>Data Mitra</h1>
      <Button onClick={() => setShow(true)}>Add Mitra</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
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
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mitras.map((mitra) => (
            <tr key={mitra._id}>
              <td>{mitra.no}</td>
              <td>{mitra.namaLengkap}</td>
              <td>{mitra.namaAlias}</td>
              <td>{mitra.noSIM}</td>
              <td>{mitra.jenisSIM}</td>
              <td>{mitra.exp}</td>
              <td>{mitra.noKTP}</td>
              <td>{mitra.noKK}</td>
              <td>{mitra.tglLahir}</td>
              <td>{mitra.agama}</td>
              <td>{mitra.status}</td>
              <td>{mitra.tglJoin}</td>
              <td>{mitra.noHp}</td>
              <td>{mitra.email}</td>
              <td>{mitra.namaBank}</td>
              <td>{mitra.noRekening}</td>
              <td>{mitra.namaRekening}</td>
              <td>
                {/* Display thumbnails of images */}
                {mitra.images && mitra.images.length > 0 ? (
                  mitra.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${apiUrl}/uploads/${image}`}
                      alt={mitra.name}
                      style={{ width: '50px', height: '50px', marginRight: '5px' }}
                    />
                  ))
                ) : (
                  <span>No Images</span>
                )}
              </td>
              <td>{mitra.keterangan}</td>
              <td>
                <Button variant="warning" onClick={() => { setCurrentMitra(mitra); setShow(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(mitra._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMitra ? 'Edit' : 'Add'} Mitra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>No</Form.Label>
              <Form.Control
                type="text"
                value={formData.no}
                onChange={(e) => setFormData({ ...formData, no: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                    type="text"
                    className="form-control"
                    id="namaLengkap"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Alias</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.namaAlias || ''}
                onChange={(e) => setFormData({ ...formData, namaAlias: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>No. SIM</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.noSIM || ''}
                onChange={(e) => setFormData({ ...formData, noSIM: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Jenis SIM</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.jenisSIM || ''}
                onChange={(e) => setFormData({ ...formData, jenisSIM: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Exp</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.exp || ''}
                onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>No. KTP</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.noKTP || ''}
                onChange={(e) => setFormData({ ...formData, noKTP: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>No. KK</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.noKK || ''}
                onChange={(e) => setFormData({ ...formData, noKK: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.tglLahir || ''}
                onChange={(e) => setFormData({ ...formData, tglLahir: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Agama</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.agama || ''}
                onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Tanggal Join</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.tglJoin || ''}
                onChange={(e) => setFormData({ ...formData, tglJoin: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>No. HP</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.noHp || ''}
                onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Nama Bank</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.namaBank || ''}
                onChange={(e) => setFormData({ ...formData, namaBank: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>No. Rekening</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.noRekening || ''}
                onChange={(e) => setFormData({ ...formData, noRekening: e.target.value })}
              />
            </Form.Group>
               <Form.Group>
              <Form.Label>Nama Rekening</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.namaRekening || ''}
                onChange={(e) => setFormData({ ...formData, namaRekening: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" name="images" multiple onChange={handleFileChange} />

      </Form.Group>
               <Form.Group>
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={formData.keterangan || ''}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataMitra;
