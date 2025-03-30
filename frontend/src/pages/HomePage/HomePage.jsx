import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import "./HomePage.css";
import SubscribeForm from '../../components/SubscribeForm/SubscribeForm';

const Homepage = ({ token, setToken }) => {
  return (
    <div className="homepage">
      {/* Hero Section */}

  
      <section className="hero text-white text-center ">
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="container py-5"> 
        <h1 className='animate-zoom-fade' style={{fontFamily:'Blinker', fontSize:'5rem'}}>Jock<span style={{fontFamily:'Poppins', color:'#5cb6f9', fontWeight:'200'}}>&</span>Boss</h1> 
        <h3 className="tagline animate-left fw-light">Own Your Recruitment</h3> {/* Raleway Thin */}
       
          {token ? (
            <Link to="/" className="btn btn-lg">User Profile</Link>
          ) : (
            <Link to="/">      
            <Button variant=" primary" className="animate-bottom mt-3">Get Started</Button></Link>
          )}
        </div>
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



      {/* Auth Section (for unauthenticated users) 
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
*/}
      {/* Welcome Section (for authenticated users) */}
      {token && (
        <section className="welcome-section py-5 text-center">
          <div className="container">
            <h2>Welcome Back!</h2>
            <Link to="/" className="btn btn-primary">Manage Your Profile</Link>
          </div>
        </section>
    
      )}
          
          <div className="container-fluid">
            <div className="row justify-content-center">
        <SubscribeForm setToken={setToken} /> 
            </div>
          </div>
          </div>
  );
};

export default Homepage;