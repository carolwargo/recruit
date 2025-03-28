import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <span style={{ color: '#eae7e7' }}>Jock</span>
<span style={{ color: '#cae8ff' }}>And</span>
<span style={{ color: '#eae7e7' }}>Boss</span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          {token ? (
            <Nav className="ms-auto">
              <NavDropdown
      title={<i className="bi bi-person-circle"></i>} 
                id="user-dropdown"
                align="end"
                className="text-white"
              >
          
           
               
                <NavDropdown.Item as={NavLink} to="/" className="dropdown-item">
                <i className='fa fa-home'></i> Account
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
                  <Link to='/auth' className="d-flex align-items-center small text-secondary" style={{fontSize:'.8rem'}}> 
                  Login
                    <i className="fas fa-lock text-secondary ms-2" style={{ color: 'white' }} />
                  </Link>
            </Nav>
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;