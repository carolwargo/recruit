import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TermsModal from '../TermsModal/TermsModal';
import PrivacyModal from '../PrivacyModal/PrivacyModal';
import './AuthForm.css';


const AuthForm = ({ setToken, setUserId }) => {
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
  I consent to <span style={{ marginLeft: '5px' }}></span> 
  <TermsModal style={{ marginRight: '5px' }}/> <span style={{ margin: '0 5px' }}>&</span> <PrivacyModal style={{ marginRight: '5px' }} />
</label>



          </Form.Group>
          <div className="button-container pb-0">
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
  );
};

export default AuthForm;



/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../../components/TermsModal/TermsModal";
import PrivacyModal from "../../components/PrivacyModal/PrivacyModal";
import { Form } from 'react-bootstrap';  // Import Form component from react-bootstrap
import "../../components/AuthForm/AuthForm.css"; // Updated import


const AuthPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);  // New state for checkbox
  const [alertMessage, setAlertMessage] = useState("");  // New state for alert message
  const [alertType, setAlertType] = useState("");  // New state for alert type (success/error)
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setAlertMessage("🎉 Welcome, happy to have you! Your signup was successful.");
        setAlertType("success"); // Set success type for alert
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setAlertMessage("😞 Oops! Something went wrong with the signup.");
      setAlertType("error"); // Set error type for alert
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setAlertMessage("👋 Welcome back! You're logged in.");
        setAlertType("success"); // Set success type for alert
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAlertMessage("😞 Oops! Login failed. Please try again.");
      setAlertType("error"); 
    }
  };

  return (
 
<div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="col-sm-12 col-md-6 col-lg-6">
    <div className="auth-container">
      <div>
        <p className="text-center">Login or Signup</p>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

<input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
  

      <p>Forgot Password?</p>
      <div className="button-container">
        <button className="signup" onClick={handleSignup}>Sign Up</button>
        <button className="login" onClick={handleLogin}>Log In</button>
      </div>

   
         <Form.Group className="mb-1 mt-3">
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Form.Check
      type="checkbox"
      name="platformConsent"
      id="platformConsent"  
      checked={checkbox}
      onChange={(e) => setCheckbox(e.target.checked)}
      className="small"
    />
    <p className="small text-secondary" style={{ marginLeft: '10px', marginTop:'15px' }}> I consent to platform
    <TermsModal /> & <PrivacyModal />.</p>
  </div>


</Form.Group>

      {alertMessage && (
        <div className={`alert ${alertType === "success" ? "alert-success" : "alert-error"}`}>
          {alertMessage}
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default AuthPage;
*/
