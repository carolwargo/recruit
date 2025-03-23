import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import './UserSettings.css';

const UserSettings = ({ token }) => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await 
        console.log('API URL:', import.meta.env.VITE_API_URL);
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const toggleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const saveChanges = async (section) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        { [section]: user[section] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toggleEdit(section);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Container fluid className="user-settings">
 
      <Row className='g-0'>
        <Col md={3} className="sidebar bg-dark text-light p-4">
          <h4>Menu</h4>
          <ul>
            <li><a href="#userInfo">User Info</a></li>
            <li><a href="#personal">Personal Info</a></li>
            <li><a href="#contact">Contact Info</a></li>
            <li><a href="#athletic">Athletic Profile</a></li>
            <li><a href="#academic">Academic Profile</a></li>
            <li><a href="#media">Media Uploads</a></li>
          </ul>
        </Col>
        <Col md={9} className="main-content p-4">
          {/* User Info */}
          <section id="userInfo">
            <h2>User Information</h2>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              {editMode.firstName ? (
                <>
                  <Form.Control
                    value={user.firstName || ''}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                  <Button onClick={() => saveChanges('firstName')}>Save</Button>
                </>
              ) : (
                <>
                 <p>First Name: {user.firstname || 'Not set'}</p>
                  <Button variant="link" onClick={() => toggleEdit('firstName')}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                </>
              )}
            </Form.Group>
            {/* Repeat for lastName, email */}
          </section>

          {/* Personal Info */}
          <section id="personal">
            <h2>Personal Information</h2>
            <Form.Group>
              <Form.Label>High School</Form.Label>
              {editMode.personalInfo ? (
                <>
                  <Form.Control
                    value={user.personalInfo?.highSchool || ''}
                    onChange={(e) => handleChange(e, 'personalInfo', 'highSchool')}
                  />
                  <Button onClick={() => saveChanges('personalInfo')}>Save</Button>
                </>
              ) : (
                <>
                  <p>{user.personalInfo?.highSchool || 'Not set'}</p>
                  <Button variant="link" onClick={() => toggleEdit('personalInfo')}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                </>
              )}
            </Form.Group>
            <Form.Group>
             
              <Form.Label>High School</Form.Label>
              {editMode.personalInfo ? (
                <>
                  <Form.Control
                    value={user.personalInfo?.highSchool || ''}
                    onChange={(e) => handleChange(e, 'personalInfo', 'highSchool')}
                  />
                  <Button onClick={() => saveChanges('personalInfo')}>Save</Button>
                </>
              ) : (
                <>
                  <p>{user.personalInfo?.highSchool || 'Not set'}</p>
                  <Button variant="link" onClick={() => toggleEdit('personalInfo')}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                </>
              )}
            </Form.Group>
            {/* Repeat for other personalInfo fields */}
          </section>

          {/* Add sections for contact, athletic, academic, media similarly */}
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettings;






/**
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row> */