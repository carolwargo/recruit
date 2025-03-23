import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomePage.css";

const Homepage = ({ token, setToken }) => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero bg-black text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Recruit</h1>
          <p className="lead">Empower Your Athletic Future</p>
          <p className="mb-4">
            Build your personal brand with digital recruiting tools—custom websites, graphics, and social media marketing for student-athletes aiming for college sports.
          </p>
          {token ? (
            <Link to="/" className="btn  btn-lg" style={{backgroundColor:'#ff01dd', color:'white',   boxShadow: '1px 1px 3px rgba(255, 255, 255, 0.4)'}}>User Profile</Link>
          ) : (
            <Link to="/" className="btn btn-outline-light btn-lg">Get Started</Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Why Recruit?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <b>
                  <i className="bi bi-globe fs-1" style={{color:'#ff01dd'}}></i>
                  </b>
                  <h5 className="card-title mt-3">Personal Websites</h5>
                  <p className="card-text">Showcase your skills with a custom site.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-brush fs-1" style={{color:'#ff01dd'}}></i>
                  <h5 className="card-title mt-3">Branding</h5>
                  <p className="card-text">Stand out with professional graphics.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-megaphone fs-1" style={{color:'#ff01dd'}}></i>
                  <h5 className="card-title mt-3">Social Media</h5>
                  <p className="card-text">Boost your reach with marketing tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section (for unauthenticated users) */}
      {!token && (
        <section className="auth-section text-white"
        id="auth-section"
        style={{  paddingTop:'5rem', paddingBottom:'5rem' }}>   
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <AuthForm setToken={setToken} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome Section (for authenticated users) */}
      {token && (
        <section className="welcome-section py-5 text-center">
          <div className="container">
            <h2>Welcome Back!</h2>
            <p>Your session token: {token.slice(0, 20)}...</p>
            <Link to="/" className="btn btn-primary">Manage Your Profile</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Homepage;