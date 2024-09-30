import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const FormROList = () => {
  const [formROs, setFormROs] = useState([]);
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    // Fetch all Form RO data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/form-ro`);  // Your backend API route
        setFormROs(response.data);
      } catch (err) {
        console.error('Error fetching Form RO data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Form RO Pembelian Barang List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No RO</th>
            <th>No PO</th>
            <th>Tanggal</th>
            <th>Supplier</th>
            <th>Merek</th>
            <th>Produk</th>
            <th>Tipe</th>
            <th>Satuan</th>
            <th>Qty</th>
            <th>Upload</th>
          </tr>
        </thead>
        <tbody>
          {formROs.map((ro, index) => (
            <tr key={ro._id}>
              <td>{ro.noRO}</td>
              <td>{ro.noPO}</td>
              <td>{ro.tanggal}</td>
              <td>{ro.supplier}</td>
              <td>{ro.merek}</td>
              <td>{ro.produk}</td>
              <td>{ro.tipe}</td>
              <td>{ro.satuan}</td>
              <td>{ro.qty}</td>
              <td>{ro.upload}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FormROList;
