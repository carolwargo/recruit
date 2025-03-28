import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../components/IntakeForms/PersonalForm'; // Ensure this is imported

const PersonalForm = ({ token, userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    city: '',
    state: '',
    zipcode: '',
  });
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
    if (!formData.state) newErrors.state = 'State is required';
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/personal`,
        { ...formData, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/intake/${userId}/athletic`);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to save.' });
    }
  };

  // State list (dynamic)
  const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ];

  return (
    <Container fluid className="py-4 text-white">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>     
          <Form onSubmit={handleSubmit}>
            <Row>
            <p className="mb-2">Personal Information</p>
              <Col md={6}>
                 <Form.Group className="mb-1 flex-grow-1">
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
                 <Form.Group className="mb-1 flex-grow-1">
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
            {/* Address Fields */}
            <Row>
              <Col md={5}>
                 <Form.Group className="mb-1 flex-grow-1">
                  <Form.Control
                    type="text"
                    name="streetaddress"
                    placeholder="Street Address"
                    value={formData.streetaddress}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                 <Form.Group className="mb-1 flex-grow-1">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                 <Form.Group className="mb-1 flex-grow-1">
                  <Form.Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                  >
                    <option value="" disabled className='small'>State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={2}>
                 <Form.Group className="mb-1 flex-grow-1">
                  <Form.Control
                    type="text"
                    name="zipcode"
                    placeholder="Zipcode" 
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Add other fields as needed */}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
        
                    <Link to='/intake/1/athletic'>
                          <Button type="submit" variant="dark" className="next-button w-100 mt-4">
                           Next
                          </Button>
                            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalForm;