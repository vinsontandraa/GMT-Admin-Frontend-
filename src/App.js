import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NavigationBar from "./components/Navbar";
import GlobalCashDaily from './pages/GlobalCashDaily'; // Import the new component
import Plates from './pages/Plates'; // Import the new component
import MitraPage from './pages/Mitra';
import Jenis from './pages/Jenis';
import VehicleData from './pages/VehicleData';
import MutasiKas from './pages/MutasiKas';
import MutasiKasBankPiutang from "./pages/MutasiKasBankPiutang";
import MutasiKasBankListGiro from "./pages/MutasiKasBankListGiro";
import DataSuratKendaraan from "./pages/DataSuratKendaraan";
import AdminSparepart from './pages/AdminSpareparts';
import SupervisorSparepart from './pages/SupervisorSparepart';
import SparePartPO from "./pages/SparePartPO";
import SparepartTasklist from './pages/SparepartTasklist';
import MekanikPage from "./pages/Mekanik";
import FormPOList from './pages/FormPOList';

const App = () => (
  <Router>
    <NavigationBar />

    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/global-cash-daily" element={<GlobalCashDaily/>} /> {/* Add this route */}
      <Route path="/plates" element={<Plates/>} /> {/* Add this route */}
      <Route path="/mitra" element={<MitraPage />} />
      <Route path="/jenis" element={<Jenis />} />
      <Route path="/vehicle-data" element={<VehicleData />} />
      <Route path="/mutasiKas" element={<MutasiKas />} />
      <Route path="/mutasi-kas-bank-piutang" element={<MutasiKasBankPiutang/>} />
      <Route path="/mutasi-kas-bank-giro" element={<MutasiKasBankListGiro/>} />
      <Route path="/data-surat-kendaraan" element={<DataSuratKendaraan/>} />
      {/* <Route path="/sparepart" element={<SparePart/>} /> */}
      <Route path="/sparepart-po" element={<SparePartPO/>} />
      <Route path="/admin-sparepart" element={<AdminSparepart />} />
      {/* <Route path="/supervisor-sparepart" element={<SupervisorSparepart />} /> */}
      <Route path="/task-list/supervisor" element={<SupervisorSparepart />} />
      <Route path="/task-list/admin" element={<SparepartTasklist />} />
      <Route path="/mekanik" element={<MekanikPage />} />
      <Route path="/form-po" element={<FormPOList />} />
    </Routes>
  </Router>
);

export default App;
