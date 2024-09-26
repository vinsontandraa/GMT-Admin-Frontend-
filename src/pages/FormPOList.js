import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFormPOList from "../components/PDFFormPOList";

const FormPOList = () => {
  const [formPOs, setFormPOs] = useState([]);
  const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

  useEffect(() => {
    // Fetch all Form PO data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/form-po`);  // Your backend API route
        setFormPOs(response.data);
      } catch (err) {
        console.error('Error fetching Form PO data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Form PO Pembelian Barang</h1>
      <PDFDownloadLink document={<PDFFormPOList />} fileName="Form PO Pembelian Barang">
        <Button
          variant="danger"
          className="mx-3 mb-3"
        >
          PDF
        </Button>
      </PDFDownloadLink>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>No Form</th>
            <th>No PO</th>
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
          </tr>
        </thead>
        <tbody>
          {formPOs.map((po, index) => (
            <tr key={po._id}>
              <td>{index + 1}</td>
              <td>{po.tanggal}</td>
              <td>{po.noForm}</td>
              <td>{po.noPO}</td>
              <td>{po.noPlat}</td>
              <td>{po.kode}</td>
              <td>{po.supplier}</td>
              <td>{po.produk}</td>
              <td>{po.tipe}</td>
              <td>{po.satuan}</td>
              <td>{po.qty}</td>
              <td>{po.upload}</td>
              <td>{po.merek}</td>
              <td>{po.qtyKetersediaan}</td>
              <td>{po.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FormPOList;
