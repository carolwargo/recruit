import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Modal} from 'react-bootstrap';


const Navbar = ({ token, setToken }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <BSNavbar.Brand as={NavLink} to="/">Recruit</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          {token ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/settings">User Settings</Nav.Link>
                <Nav.Link as={NavLink} to="/personal">Personal Information</Nav.Link>
                <Nav.Link as={NavLink} to="/contact">Contact Information</Nav.Link>
                <Nav.Link as={NavLink} to="/athletic">Athletic Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/academic">Academic Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/media">Media Uploads</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate('/settings')}>
                  <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setShowModal(true)} style={{fontSize:'.8rem'}}>Sign Up / Login</Nav.Link>
            </Nav>
          )}
        </BSNavbar.Collapse>
      </Container>

      {/* Modal for Sign Up / Login */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Reuse your existing auth form here or redirect */}
          <p>Sign Up or Login functionality goes here.</p>
        </Modal.Body>
      </Modal>
    </BSNavbar>
  );
};

export default Navbar;