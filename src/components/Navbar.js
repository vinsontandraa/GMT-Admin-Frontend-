import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const role = token ? jwtDecode(token).role : "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Admin Panel
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              {role === "manager" && (
                <NavDropdown
                  title="Kas Harian Global"
                  id="kas-harian-global-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/global-cash-daily">
                    Kas Harian Global
                  </NavDropdown.Item>
                  {/* Add more items if needed */}
                </NavDropdown>
              )}
              <NavDropdown title="Mutasi Kas" id="mutasi-kas-dropdown">
                <NavDropdown.Item as={Link} to="/mutasiKas">
                  Mutasi Kas Piutang
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mutasi-kas-bank-piutang">
                  Mutasi Kas Bank Piutang
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mutasi-kas-bank-giro">
                  Mutasi Kas Bank Giro
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Data Kendaraan" id="data-kendaraan-dropdown">
                <NavDropdown.Item as={Link} to="/vehicle-data">
                  Data Kendaraan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/data-surat-kendaraan">
                  Data Surat Kendaraan
                </NavDropdown.Item>
              </NavDropdown>
              {role === "admin" && (
                <>
                 <NavDropdown title="Sparepart" id="sparepart-dropdown">
                <NavDropdown.Item as={Link} to="/task-list/admin">
                    Sparepart Task List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin-sparepart">
                Add Sparepart
                </NavDropdown.Item>

              </NavDropdown>
                </>
              )}
              {role === "supervisor" && (
                <>
                  <Nav.Link as={Link} to="/task-list/supervisor">
                    Supervisor Task List
                  </Nav.Link>
                </>
              )}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
