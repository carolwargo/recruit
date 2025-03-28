import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import TermsModal from '../../components/TermsModal/TermsModal';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import '../../components/AuthForm/AuthForm.css'; // Use AuthForm.css for styling

const AuthPage = ({ setToken, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false); // Consent checkbox
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // success or danger
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!checkbox) {
      setAlertMessage('Please consent to the Terms and Privacy Policy.');
      setAlertType('danger');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        email,
        password,
      });
      const { token, userId } = res.data; // Backend returns token and userId
      setToken(token);
      setUserId(userId); // Set userId in App state
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setAlertMessage('🎉 Welcome! Signup successful.');
      setAlertType('success');
      setTimeout(() => navigate(`/intake/${userId}`), 2000);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || '😞 Signup failed.');
      setAlertType('danger');
    }
  };

  const handleLogin = async () => {
    if (!checkbox) {
      setAlertMessage('Please consent to the Terms and Privacy Policy.');
      setAlertType('danger');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, userId } = res.data; // Backend returns token and userId
      setToken(token);
      setUserId(userId); // Set userId in App state
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setAlertMessage('👋 Welcome back! Login successful.');
      setAlertType('success');
      setTimeout(() => navigate(`/intake/${userId}`), 2000);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || '😞 Login failed.');
      setAlertType('danger');
    }
  };

  return (
    
 <div className='bg-black text-white min-vh-100'>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-sm-12 col-md-6 col-lg-5 auth-container">
        <p className="text-center mb-4">Login or Signup</p>
        {alertMessage && (
          <Alert variant={alertType} className="mb-4">
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email (e.g., mail@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-center">
            <a href="#" className="forgot-password small">
              Forgot Password?
            </a>
          </Form.Group>
          <Form.Group className="mb-3 consent-wrapper">
            <Form.Check
              type="checkbox"
              id="platformConsent"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              className="auth-checkbox"
            />
            <label htmlFor="platformConsent" className="consent-label small text-secondary">
              I consent to <TermsModal /> & <PrivacyModal />
            </label>
          </Form.Group>
          <div className="button-container">
            <Button
              className="signup"
              onClick={handleSignup}
              disabled={!checkbox} // Disable if no consent
            >
              Sign Up
            </Button>
            <Button className="login" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </Form>
      </div>
      </div>
    </div>
  );
};

export default AuthPage;


/**
 * import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

const AuthPage = ({ setToken }) => {
  return (
    <div>
      <AuthForm setToken={setToken} />
    </div>
  );
};

export default AuthPage;
 */
