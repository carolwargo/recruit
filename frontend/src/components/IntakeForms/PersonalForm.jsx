import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../pages/Intake/Intake.css";
import TermsModal from "../TermsModal/TermsModal";  
import PrivacyModal from "../PrivacyModal/PrivacyModal";

const Personal = ({ token, userId }) => {
  const navigate = useNavigate();

  // Single state object for all fields
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",

    streetaddress: "",
    city: "",
    state: "",
    zipcode: "",

    twitter: "",
    instagram: "",
    facebook: "",

    youtube: "",
    snapchat: "",
    bio: "",    
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
      {/**PERSONAL START */}
      <Container fluid className="py-5">
        <Row className="justify-content-center">
        <h1 className="text-center mb-4">Personal Profile Intake</h1>
          <Col sm={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={12} md={6}>    
                  <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      isInvalid={!!errors.firstname}
                      placeholder="First Name  (e.g. Joe)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>   
                  <Form.Group className="mb-1 flex-grow-1">
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Last Name  (e.g. Athlete)"
                      value={formData.lastname}
                      onChange={handleChange}
                      isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12} md={6}>
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
                <Col sm={12} md={6}>
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
                  <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
                    Note: Current Address: (Mailing address is preferred)
                  </p>
                </div>
                <Col md={5} className="mt-0 pt-0">
                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Street Address | P.O. Box (e.g. 123 Oak St.)"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="d-flex align-items-center">
                  <Form.Group className="mb-1 mt-3 flex-grow-1">
      <Form.Select
        name="state"
        value={formData.state}
        onChange={handleChange}
        isInvalid={!!errors.state}
          className="form-select"
      >
        <option value="" disabled>Select State</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {errors.state}
      </Form.Control.Feedback>
    </Form.Group>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                        type="text"
                        name="zipcode"
                        placeholder="Zip Code"
                        value={formData.zipcode}
                        onChange={handleChange}
                        isInvalid={!!errors.zipcode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zipcode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Col>
              </Row>

              <Row>
                <div>
                  <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
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
                <Col md={6}>
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
                <Col md={6}>
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
              </Row>


              
              <Row>
                <div>
                  <p className="note mb-1 mt-4" style={{ marginLeft: "5px" }}>
                   Bio: (Please include a brief bio about yourself.)
                  </p>
                </div>
                <Col md={12}> 
                <Form.Group className="mb-1 flex-grow-1">
                      <Form.Control
                      as={"textarea"}
                      rows={4}
                        type="text"
                        name="bio"
                        placeholder="Bio (e.g. I am a student athlete...)"
                        value={formData.bio}
                        onChange={handleChange}
                        isInvalid={!!errors.bio}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bio}
                      </Form.Control.Feedback>
                    </Form.Group>
                </Col>
              </Row>
              
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
              {errors.submit && <p className=" link-body-emphasis">{errors.submit}</p>}
              <Button type="submit" variant="dark" className="w-100">
                Submit Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/**PERSONAL END */}
    </div>
  );
};

export default Personal;