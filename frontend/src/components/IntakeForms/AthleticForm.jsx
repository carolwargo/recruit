import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../pages/Intake/Intake.css";
import TermsModal from "../TermsModal/TermsModal";
import PrivacyModal from "../PrivacyModal/PrivacyModal";

const AthleticForm = ({ token, userId }) => {
  const navigate = useNavigate();

  // Single state object for all fields
  const [formData, setFormData] = useState({
  
    ncaaid: "",
    sport: "",
    primaryPosition: "",
    secondaryPosition: "",
    gradYear: "",
    height: "",
    weight: "",
    handedness: "",
    athleticExtra: "",
    platformConsent: false,
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
  {/**ATHLETIC PROFILE START */}
      <Container fluid className="py-5">
        <Row className="justify-content-center">
        <h1 className="text-center mb-4">Athlete Profile Intake</h1>
          <Col sm={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
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
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-hand me-2 mt-2"
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

       
                     {/* Consent */}
                     <Form.Group className="mb-1 mt-3">
  {/* Text and checkbox placed side by side */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Form.Check
      type="checkbox"
      name="platformConsent"
      id="platformConsent"  // Add an ID for better accessibility
      checked={formData.platformConsent}
      onChange={handleChange}
      isInvalid={!!errors.platformConsent}
    />
    <p className="small text-secondary" style={{ marginLeft: '10px', marginTop:'15px' }}>The information submitted is accurate. I consent to the <TermsModal/> and <PrivacyModal/>.</p>
  </div>
  
  {/* Feedback for validation */}
  <Form.Control.Feedback type="invalid">
    {errors.platformConsent}
  </Form.Control.Feedback>
</Form.Group>
              {errors.submit && <p className="text-danger">{errors.submit}</p>}
              <Button type="submit" variant="dark" className="w-100">
                Submit Profile
              </Button>
                   </Form>
          </Col>
        </Row>
      </Container>
      {/**ATHLETIC PROFILE END */}
    </div>
  );
};

export default AthleticForm;