import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import TermsModal from '../TermsModal/TermsModal';
import PrivacyModal from '../PrivacyModal/PrivacyModal';
import '../../pages/IntakePage/IntakePage.css'; 



const AcademicForm = ({ token, userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    highschool: '',
    hsLocation: '',
    academicYear: '',
    dob: '',
    testScores: '',
    gpa: '',
    academicExtra: '',
    platformConsent: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.highschool) newErrors.highschool = 'High school is required';
    if (!formData.platformConsent) newErrors.platformConsent = 'Consent is required';
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
        `${import.meta.env.VITE_API_URL}/api/user/academic`,
        { ...formData, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/${userId}`);
    } catch (error) {
      console.error('Error saving academic info:', error);
      setErrors({ submit: 'Failed to save. Please try again.' });
    }
  };

  return (
    <Container fluid className="py-5 text-white">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row>
            <p className="mb-2">Academic Information</p>
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
                            placeholder="Year (e.g. Sophomore)"
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
            {errors.submit && <p className=" link-body-emphasis">{errors.submit}</p>}
                      
                       
                      
                                  <Button type="submit" variant="dark" className="next-button w-100 mt-4">
                                   SUBMIT
                                  </Button>
                                  
                                <div className='use'> <TermsModal /> & <PrivacyModal />.</div>  
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AcademicForm;