import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SparePartForm = ({ sparePart, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(sparePart || {});

  useEffect(() => {
    setFormData(sparePart || {});
  }, [sparePart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="No" value={formData.No || ''} onChange={handleChange} placeholder="No." />
      <input type="date" name="Tanggal" value={formData.Tanggal || ''} onChange={handleChange} placeholder="Tanggal" />
      <input type="text" name="NoForm" value={formData.NoForm || ''} onChange={handleChange} placeholder="No Form" />
      <input type="text" name="NoPlatKode" value={formData.NoPlatKode || ''} onChange={handleChange} placeholder="No Plat Kode" />
      <input type="text" name="NamaMitra" value={formData.NamaMitra || ''} onChange={handleChange} placeholder="Nama Mitra" />
      {/* Add more inputs for all parameters */}
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default SparePartForm;
