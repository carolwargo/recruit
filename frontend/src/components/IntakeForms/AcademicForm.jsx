import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../pages/Intake/Intake.css";
import TermsModal from "../TermsModal/TermsModal";
import PrivacyModal from "../PrivacyModal/PrivacyModal";

const AcademicForm = ({ token, userId }) => {
  const navigate = useNavigate();

  // Single state object for all fields
  const [formData, setFormData] = useState({

    highschool: "",
    hsLocation: "",
    academicYear: "",
    dob: "",
    testScores: "",
    gpa: "",
    academicExtra: "",
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
      {/**ACADEMIC PROFILE START */}
         <Container fluid className="py-5">
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <h1 className="text-center mb-4">Academic Profile Intake</h1>
                  <Form onSubmit={handleSubmit}>
                    {/* Academic Information */}
                    <Row>
                    <Col md={7}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="highschool"
                            value={formData.highschool}
                            onChange={handleChange}
                            isInvalid={!!errors.highschool}
                            placeholder="Current High School (e.g. Patriot High School)"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.highschool}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="hsLocation"
                            value={formData.hsLocation}
                            onChange={handleChange}
                            isInvalid={!!errors.hsLocation}
                            placeholder="Located at (e.g. Fairfax, VA)"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.hsLocation}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>


                    <Row>
                    <Col md={3}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="academicYear" 
                            value={formData.academicYear}
                            onChange={handleChange}
                            isInvalid={!!errors.academicYear}
                            placeholder="Status (e.g. Sophomore)"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.academicYear}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            isInvalid={!!errors.dob}
                            placeholder="D.O.B. (e.g. 1/1/2005)"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.dob}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="testScores"
                            placeholder="SAT/ACT (e.g. 1600/36)"
                            value={formData.testScores}
                            onChange={handleChange}
                            isInvalid={!!errors.testScores}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.testScores}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                          <Form.Group className="mb-1 flex-grow-1">
                          <Form.Control
                            type="text"
                            name="gpa"
                            placeholder="GPA  (e.g. 4.0)"
                            value={formData.gpa}
                            onChange={handleChange}
                            isInvalid={!!errors.gpa}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.gpa}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
      
                       <Row>
                       <div>
                            <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
                             Academic Extras: (Please include anything additional, like awards & honors, extra-curriculars, club affiliations, etc.)
                            </p>
                          </div>
                                            <Col md={12}> 
                                            <Form.Group className="mb-1 flex-grow-1">
                                                  <Form.Control
                                                  as={"textarea"}
                                                  rows={4}
                                                    type="text"
                                                    name="academicExtra"
                                                    placeholder="Additional Information (e.g. honor roll, student government, Extra-curricular activities, etc...)"
                                                    value={formData.academicExtra}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.academicExtra}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                    {errors.academicExtra}
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
      {/**ACADEMIC PROFILE START */}
    </div>
  );
};

export default AcademicForm;