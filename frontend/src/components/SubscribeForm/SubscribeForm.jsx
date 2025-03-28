import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsModal from '../TermsModal/TermsModal';
import PrivacyModal from '../PrivacyModal/PrivacyModal';
import './SubscribeForm.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!email) {
      setAlertMessage('Please enter a valid email address.');
      setAlertType('error');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMessage('🎉 Thanks for subscribing! Stay tuned for updates.');
        setAlertType('success');
        setEmail('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setAlertMessage(data.message || 'Subscription failed. Please try again.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      setAlertMessage('😞 Oops! Something went wrong. Try again later.');
      setAlertType('error');
    }
  };

  const clearAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <div className="subscribe-page">
      <div className="subscribe-container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="subscribe-section text-center py-4">
              <h1 className="font-monospace mb-3">Stay in the Game</h1>
              <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                Get the edge with exclusive updates, new features, and platform enhancements delivered straight to your inbox. Subscribe now and elevate your recruiting journey!
              </p>
            </div>

            {alertMessage && (
              <div
                className={`alert ${
                  alertType === 'success' ? 'alert-success' : 'alert-danger'
                } alert-dismissible fade show`}
                role="alert"
              >
                {alertMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={clearAlert}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {/* Form */}
            <div className="row g-2 align-items-center">
              <div className="col-8 col-md-9">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-4 col-md-3">
                <button className="subscribe-btn w-100" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            </div>

            <div className="terms-privacy mt-4 text-center fw-light small opacity-75">
              By subscribing, you agree to our{' '}
              <span className="me-1">
                <TermsModal />
              </span>{' '}
              &{' '}
              <PrivacyModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;