import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MitraList = () => {
    const [mitraData, setMitraData] = useState([]);
    const apiUrl = 'https://gmt-admin-backend-production.up.railway.app';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/mitra`);
                setMitraData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>No ID</th>
                    <th>Nama Lengkap</th>
                    <th>Nama Alias</th>
                    <th>No SIM</th>
                    <th>jenis SIM</th>
                    <th>Exp</th>
                    <th>No. KTP</th>
                    <th>No. KK</th>
                    <th>Asal</th>
                    <th>Tgl Lahir</th>
                    <th>Agama</th>
                    <th>Status</th>
                    <th>Tgl Join</th>
                    <th>No. Hp</th>
                    <th>Email</th>
                    <th>Nama Bank</th>
                    <th>No Rekening</th>
                    <th>Nama Rekening</th>
                    <th>Upload</th>
                    <th>Keterangan</th>

                </tr>
            </thead>
            <tbody>
                {mitraData.map((mitra, index) => (
                    <tr key={index}>
                        <td>{mitra.no}</td>
                        <td>{mitra.noId}</td>
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
                        <td>{mitra.upload}</td>
                        <td>{mitra.keterangan}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MitraList;
