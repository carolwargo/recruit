import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './PrivacyModal.css';    
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
<div className="mx-1">
      {/* Trigger Link */}
      <Link to="#" className=" link-secondary"  style={{fontSize: "13.5px"}} onClick={handleShow}>
        Privacy Policy
      </Link>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mt-3 small"><strong>Effective Date:</strong> 1/12/2024</h6>

          <p>
            At [Your Company Name], your privacy is our priority. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you engage our digital development services for recruiting purposes.
          </p>

          <h5>1. Information We Collect</h5>
          <ul>
            <li><strong>Personal Information:</strong> Name, email, phone number, and other details you provide.</li>
            <li><strong>Recruiting Data:</strong> Candidate information gathered through forms or platforms we develop.</li>
            <li><strong>Technical Information:</strong> IP addresses, browser types, and device details for service optimization.</li>
          </ul>

          <h5>2. How We Use Your Information</h5>
          <ul>
            <li>To provide and customize digital recruiting solutions.</li>
            <li>To communicate updates or respond to your inquiries.</li>
            <li>To ensure data security and improve our services.</li>
          </ul>

          <h5>3. Data Sharing</h5>
          <p>
            We do not sell or rent your information to third parties. Information may be shared with trusted partners
            for the sole purpose of delivering services, as outlined in our agreement.
          </p>

          <h5>4. Data Storage and Security</h5>
          <p>
            All data is stored on secure servers and protected with encryption and other advanced security measures.
            We strive to minimize data retention and delete data no longer needed for its original purpose.
          </p>

          <h5>5. Cookies and Tracking</h5>
          <p>
            We may use cookies and similar technologies to enhance your experience. You can adjust your browser settings
            to limit or block cookies, though some features of our services may not function properly without them.
          </p>

          <h5>6. Your Rights</h5>
          <ul>
            <li>Access and review the personal information we hold about you.</li>
            <li>Request corrections to inaccurate or incomplete data.</li>
            <li>Request deletion of your data, subject to legal or contractual obligations.</li>
          </ul>

          <h5>7. Third-Party Services</h5>
          <p>
            Our services may include integrations with third-party tools or platforms. We are not responsible for the
            privacy practices of these providers. Please review their policies for more details.
          </p>

          <h5>8. Updates to This Policy</h5>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations.
            The latest version will always be available on our website.
          </p>

          <h5>9. Contact Us</h5>
          <p>
            If you have questions about this Privacy Policy or your data, please contact us at{" "}
            <Link to="https://ijock.digital.com/contact">ijock.digital.com/contact</Link>.
          </p>

          <p>
            By using our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
          </p>
          </Modal.Body>
    
          </Modal>
        </>
      );
    };
    

export default PrivacyModal;
