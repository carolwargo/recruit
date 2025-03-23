import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './TermsModal.css';  

const TermsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      {/* Trigger Link */}
      <Link to="#"className=" link-secondary "  style={{fontSize: "13.5px"}} onClick={handleShow}>
        Terms of use
      </Link>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
          <Modal.Body>
                <h6 className="mt-3 small"><strong>Effective Date:</strong> 1/12/2024</h6>

          <p>
            Welcome to Conscribe! These Terms and Conditions govern your use of our digital development
            services tailored for recruiting purposes. By engaging our services, you agree to comply with the following
            terms. Please read them carefully.
          </p>

          <h5>1. Services Provided</h5>
          <ul>
            <li>Design and development of digital recruiting profiles.</li>
            <li>Creation of custom forms for information gathering.</li>
            <li>Hosting and maintenance of recruiting platforms.</li>
            <li>Integration with relevant recruiting networks and tools.</li>
          </ul>

          <h5>2. Client Responsibilities</h5>
          <ul>
            <li>Provide accurate, complete, and up-to-date information when requested.</li>
            <li>Respond promptly to our communications to facilitate project timelines.</li>
            <li>Review and approve drafts or prototypes in a timely manner.</li>
            <li>Use the services strictly for lawful and ethical recruiting purposes.</li>
          </ul>
          <p><strong>Certification of Information Accuracy:</strong> By providing information to [Your Company Name], 
          you certify that all information submitted is accurate and truthful to the best of your knowledge. You agree 
          to notify us promptly at <Link to="https://ijock.digital.com/contact">ijock.digital.com/contact</Link> if any 
          of the information changes during the course of our engagement.</p>

          <h5>3. Privacy and Data Security</h5>
          <p>
            All information provided by you will be handled in accordance with our [Privacy Policy]. Data collected 
            through your recruiting tools will be stored securely and only shared as outlined in your agreement with us.
          </p>

          <h5>4. Ownership and Intellectual Property</h5>
          <p>Upon full payment, you retain ownership of the digital recruiting tools created for you.</p>

          <h5>5. Payment Terms</h5>
          <p>Payment terms will be outlined in your project proposal or invoice.</p>

          <h5>6. Limitations and Disclaimers</h5>
          <p>We do not guarantee specific recruiting outcomes.</p>

          <h5>7. Revisions and Support</h5>
          <p>Minor revisions are included in the project scope as outlined in your agreement.</p>

          <h5>8. Termination</h5>
          <p>Either party may terminate the agreement with written notice.</p>

          <h5>9. Governing Law</h5>
          <p>
            These terms and conditions are governed by the laws of [Your State/Country]. Any disputes will be resolved in
            the courts of [Your State/Country].
          </p>

          <h5>10. Acceptance of Terms</h5>
          <p>
            By engaging our digital development services for recruiting, you acknowledge that you have read, understood,
            and agreed to these Terms and Conditions.
          </p>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default TermsModal;
