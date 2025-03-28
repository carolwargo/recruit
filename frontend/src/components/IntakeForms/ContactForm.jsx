import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../pages/IntakePage/IntakePage.css";

const Contact = ({ token, userId }) => {
  const navigate = useNavigate();

  // Single state object for all fields
  const [formData, setFormData] = useState({
 
    email: "",
    phone: "",

    twitter: "",
    instagram: "",
    facebook: "",

    youtube: "",
    snapchat: "",

  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.platformConsent)
      newErrors.platformConsent = "You must consent to platform use";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        { ...formData, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Profile saved:", res.data);
      navigate(`/${userId}`); // Redirect to settings page
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrors({ submit: "Failed to save profile. Please try again." });
    }
  };

  return (
    <div>
      {/**PERSONAL START */}
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={8}>
            <Form onSubmit={handleSubmit}>
              <Row>
              <p className="mb-2">Contact Information</p>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email (e.g. mail@example.com)"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Phone Number  (e.g. 123-456-7890)"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Phone Number  (e.g. 123-456-7890)"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>


              <Row>
                <div>
                  <p className="note mb-1 mt-4">
                    Social Media profiles: (Please include at least 2 social
                    accounts.)
                  </p>
                </div>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className=" bi bi-twitter-x me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="x"
                        placeholder="X (e.g. @handle)"
                        value={formData.twitter}
                        onChange={handleChange}
                        isInvalid={!!errors.twitter}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.twitter}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className="fab fa-facebook me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="facebook"
                        placeholder="Facebook (e.g. @handle)"
                        value={formData.facebook}
                        onChange={handleChange}
                        isInvalid={!!errors.facebook}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.facebook}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className=" bi-instagram me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="instagram"
                        placeholder="Instagram (e.g. @handle)"
                        value={formData.instagram}
                        onChange={handleChange}
                        isInvalid={!!errors.instagram}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.instagram}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className=" bi-youtube me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="youtube"
                        placeholder="YouTube Page (e.g. @youtube)"
                        value={formData.youtube}
                        onChange={handleChange}
                        isInvalid={!!errors.youtube}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.youtube}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className=" bi-snapchat me-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="snapchat"
                        placeholder="SnapChat (e.g. @snapchat)"
                        value={formData.snapchat}
                        onChange={handleChange}
                        isInvalid={!!errors.snapchat}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.snapchat}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <i
                      className=" bi-whatsapp me-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp (e.g. @whatsapp)"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        isInvalid={!!errors.whatsapp}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.whatsapp}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <div>
              {errors.submit && <p className=" link-body-emphasis">{errors.submit}</p>}
              <Button type="submit" variant="dark" className="next-button w-100 mt-4">
               Next
              </Button>
                </div>
           
            </Form>
          </Col>
        </Row>
      </Container>
      {/**PERSONAL END */}
    </div>
  );
};

export default Contact;




/**
 * import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../pages/IntakePage/IntakePage.css'; 

const PersonalForm = ({ token, userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = 'First name is required';
    if (!formData.lastname) newErrors.lastname = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/personal`,
        { ...formData, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data.message);
      navigate(`/intake/${userId}/athletic`);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to save. Try again.' });
    }
  };

  return (
    <Container fluid className="py-5 text-white">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">Personal Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    isInvalid={!!errors.firstname}
                  />
                  <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    isInvalid={!!errors.lastname}
                  />
                  <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
        
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
            <Button type="submit" variant="primary" className="w-100 mt-3">
              Next: Athletic Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalForm;
 */