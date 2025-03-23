import React from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import "./Intake.css";

const Intake = () => {
  const navigate = useNavigate(); // Hook for navigation
  let active = 1;
  
  // Corrected paths that match App.js
  let pagePaths = ["/personal-info", "/athletic-info", "/academic-info"]; 

  // Generate pagination items dynamically
  let items = pagePaths.map((path, index) => (
    <Pagination.Item
      key={index}
      active={index + 1 === active}
      onClick={() => navigate(path)} // Navigate when clicked
    >
      {index + 1}
    </Pagination.Item>
  ));

  return (
    <div>
        
      <h2 className="text-center">Intake Forms</h2>

      {/* Pagination Navigation */}
      <div className="d-flex justify-content-center">
        <Pagination size="sm" className="custom-pagination">{items}</Pagination>
      </div>
    </div>
  );
};

export default Intake;


{/**PERSONAL START */}
{/** 
<Container fluid className="intake-page py-5">
  <Row className="justify-content-center">
    <Col sm={12} md={8} lg={6}>
      <h1 className="text-center mb-4">Athlete Profile Intake</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-1">
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
          <Col>
            <Form.Group className="mb-1">
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
          <Col>
            <Form.Group className="mb-1">
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
          <Col>
            <Form.Group className="mb-1">
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
                  name="facebook"
                  placeholder="Street Address | P.O. Box (e.g. 123 Oak St.)"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  placeholder="City (e.g. Cityville)"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="d-flex align-items-center">
              <Form.Group className="mb-1 flex-grow-1">
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
          <Col md={2}>
            <div className="d-flex align-items-center">
              <Form.Group className="mb-1 flex-grow-1">
                <Form.Control
                  type="text"
                  name="zip"
                  placeholder="Zip Code"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  type="tel"
                  name="phone"
                  placeholder="Instagram (e.g. @instagram)"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  type="tel"
                  name="phone"
                  placeholder="YouTube Page (e.g. @youtube)"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
                  type="tel"
                  name="phone"
                  placeholder="SnapChat (e.g. @snapchat)"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <br />
        <hr />

        <Form.Group className="mb-1">
          <Form.Check
            type="checkbox"
            name="platformConsent"
            label="I consent to platform use"
            checked={formData.platformConsent}
            onChange={handleChange}
            isInvalid={!!errors.platformConsent}
          />
          <Form.Control.Feedback type="invalid">
            {errors.platformConsent}
          </Form.Control.Feedback>
        </Form.Group>

        {errors.submit && <p className="text-danger">{errors.submit}</p>}
        <Button type="submit" variant="primary" className="w-100">
          Submit Profile
        </Button>
      </Form>
    </Col>
  </Row>
</Container>
*/}
{/**PERSONAL END */}