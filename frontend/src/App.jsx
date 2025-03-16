import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserSettings from './pages/UserSettings/UserSettings';
import HomePage from './pages/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // Clear if logged out
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken} />
        <Routes>
        <Route path="/" element={<HomePage token={token} setToken={setToken} />} />
          <Route path="/settings" element={<UserSettings token={token} />} />
          <Route path="/personal" element={<div>Personal Info (TBD)</div>} />
          <Route path="/contact" element={<div>Contact Info (TBD)</div>} />
          <Route path="/athletic" element={<div>Athletic Profile (TBD)</div>} />
          <Route path="/academic" element={<div>Academic Profile (TBD)</div>} />
          <Route path="/media" element={<div>Media Uploads (TBD)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;