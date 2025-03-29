// frontend/src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../App.css';

const AboutPage = () => (
  <Container fluid className="intake-wrapper min-vh-100 py-5 text-white">
    <Row className="justify-content-center">
      <Col md={8} lg={6} className="text-center">
        <h1 className="about-title">
          <span className="jock">JOCK</span>
          <span className="and">And</span>
          <span className="boss">BOSS</span>
        </h1>
        <p className="tagline">Jock Meets Boss—Own Your Game.</p>
        <div className="about-content">
          <p>
            At <span className="highlight">JockAndBoss</span>, we’re here to flip the script on recruitment. You’re not just an athlete waiting for a call—you’re the one calling the shots. We give you the tools, the advice, and the swagger to take charge of your future.
          </p>
          <p>
            Think of us as your playbook for turning "jock" into "boss." From crafting standout profiles to navigating the recruitment maze, we’ve got your back. And yeah, we’re throwing in some gear to match—because looking the part matters too.
          </p>
          <p className="mission">
            Our mission? Empower every recruit to own their story—on the field, in the game, and beyond.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default AboutPage;