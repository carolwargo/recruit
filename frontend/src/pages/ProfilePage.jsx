import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setToken(data.token);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setToken(data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="App">
      <h1>Auth App</h1>
      {!token ? (
        <div className="auth-container">
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
      ) : (
        <p>Welcome! Token: {token}</p>
      )}
    </div>
  );
}

export default App;