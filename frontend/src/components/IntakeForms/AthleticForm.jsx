import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../pages/IntakePage/IntakePage.css'; 


const AthleticForm = ({ token, userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ncaaid: '',
    sport: '',
    primaryPosition: '',
    secondaryPosition: '',
    gradYear: '',
    height: '',
    weight: '',
    handedness: '',
    athleticExtra: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sport) newErrors.sport = 'Sport is required';
    if (!formData.gradYear) newErrors.gradYear = 'Graduation year is required';
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
        `${import.meta.env.VITE_API_URL}/api/user/athletic`,
        { ...formData, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/intake/${userId}/academic`);
    } catch (error) {
      console.error('Error saving athletic info:', error);
      setErrors({ submit: 'Failed to save. Please try again.' });
    }
  };

  return (
    <Container fluid className="py-4 text-white">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row>
            <p className="mb-2">Athletic Information</p>
            <Col sm={12} md={6}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="ncaa id"
                      value={formData.ncaaid}
                      onChange={handleChange}
                      isInvalid={!!errors.ncaaid}
                      placeholder="NCAA id (e.g. 12456790)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ncaaid}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-1 flex-grow-1">
                  <Form.Control
                    type="text"
                    name="gradYear"
                    placeholder="Grad Year (e.g., 2027)"
                    value={formData.gradYear}
                    onChange={handleChange}
                    isInvalid={!!errors.gradYear}
                  />
                  <Form.Control.Feedback type="invalid">{errors.gradYear}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group className="mb-1 flex-grow-1">
                  <Form.Control
                    type="text"
                    name="sport"
                    placeholder="Sport (e.g., Basketball)"
                    value={formData.sport}
                    onChange={handleChange}
                    isInvalid={!!errors.sport}
                  />
                  <Form.Control.Feedback type="invalid">{errors.sport}</Form.Control.Feedback>
                </Form.Group>
              </Col>
                <Col md={6}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      isInvalid={!!errors.sport}
                      placeholder="Sport (e.g. Basketball)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sport}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <div>
                  <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
                  Physical Metrics: (Please include at least 2 social
                    accounts.)
                  </p>
                </div>
                <Col md={3}>
                <div className="d-flex align-items-center">
                    <i
                      className="fas fa-graduation-cap me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="gradYear"
                      placeholder="Grad Year (e.g. 2027)"
                      value={formData.gradYear}
                      onChange={handleChange}
                      isInvalid={!!errors.gradYear}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gradYear}
                    </Form.Control.Feedback>
                  </Form.Group>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-ruler me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="height"
                        placeholder="Height (e.g. 6ft 2in)"
                        value={formData.height}
                        onChange={handleChange}
                        isInvalid={!!errors.height}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.height}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-weight-scale me-2 mt-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="weight"
                        placeholder="Weight (e.g. 200lbs)"
                        value={formData.weight}
                        onChange={handleChange}
                        isInvalid={!!errors.weight}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.weight}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center mt-2">
                    <i
                      className="fas fa-hand me-2 mt-3"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Check
                           inline
                                label="Right"
                        type="radio"
                        name="handedness"
                        value={formData.handedness}
                        onChange={handleChange}
                        isInvalid={!!errors.handedness}
                      />
                        <Form.Check
                           inline
                                label="Left"
                        type="radio"
                        name="handedness"
                        value={formData.handedness}
                        id="inline-radio-left"
                        onChange={handleChange}
                        isInvalid={!!errors.handedness}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.handedness}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
              </Row>

                <Row>
                          <div>
                            <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
                             Athletic Extras: (Please include anything additional, like awards, honors, stats, etc.)
                            </p>
                          </div>
                          <Col md={12}> 
                          <Form.Group className="mb-1 flex-grow-1">
                                <Form.Control
                                as={"textarea"}
                                rows={4}
                                  type="text"
                                  name="athleticExtra"
                                  placeholder="Additional Information (e.g. Named 2024 Conference Player...)"
                                  value={formData.athleticExtra}
                                  onChange={handleChange}
                                  isInvalid={!!errors.athleticExtra}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.athleticExtra}
                                </Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                        </Row>

           
                  {errors.submit && <p className=" link-body-emphasis">{errors.submit}</p>}
              
               
                    <Link to='/intake/1/academic'>
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

export default AthleticForm;


/**              <Row>
              <Col sm={12} md={3}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="ncaa id"
                      value={formData.ncaaid}
                      onChange={handleChange}
                      isInvalid={!!errors.ncaaid}
                      placeholder="NCAA id (e.g. 12456790)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ncaaid}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      isInvalid={!!errors.sport}
                      placeholder="Sport (e.g. Basketball)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sport}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="primary position"
                      placeholder="Primary Position  (e.g. Point Guard)"
                      value={formData.primary}
                      onChange={handleChange}
                      isInvalid={!!errors.primary}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.primary}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                   <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="secondary position"
                      placeholder="Secondary Position  (e.g. Point Guard)"
                      value={formData.secondary}
                      onChange={handleChange}
                      isInvalid={!!errors.secondary}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.secondary}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
 */