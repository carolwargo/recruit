import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import './Navbar.css';

const Navbar = ({ token, setToken, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <BSNavbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <BSNavbar.Brand as={NavLink} to="/" className="fw-bold">
          Recruit
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          {token ? (
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <span className="d-flex align-items-center" style={{marginRight:'1rem'}}>
                    <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem', color: 'white' }} />
                    Account
                  </span>
                }
                id="user-dropdown"
                align="end"
                className="text-white"
              >
         
                <NavDropdown.Item as={NavLink} to="/" className="dropdown-item">
                <i className='fa fa-home'></i> Home
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`/settings/${userId || ''}`} className="dropdown-item">
                  User Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/personal" className="dropdown-item">
                  Personal Information
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/contact" className="dropdown-item">
                  Contact Information
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/athletic" className="dropdown-item">
                  Athletic Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/academic" className="dropdown-item">
                  Academic Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/media" className="dropdown-item">
                  Media Uploads
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="dropdown-item">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <span className="d-flex align-items-center" style={{marginRight:'1rem'}}> 
                    Sign Up / Login
                    <i className="bi bi-lock ms-2" style={{ fontSize: '1rem', color: 'white' }} />
                  </span>
                }
                id="auth-dropdown"
                align="end"
                className="text-white"
              >
                <NavDropdown.Item as={HashLink} to="/#auth-section" smooth className="dropdown-item">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={HashLink} to="/#auth-section" smooth className="dropdown-item">
                  Signup
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;