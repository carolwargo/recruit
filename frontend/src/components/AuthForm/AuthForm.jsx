import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Updated import

const AuthForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/settings');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/settings');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Recruit Auth</h1>
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
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default AuthForm;