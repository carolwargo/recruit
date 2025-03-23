import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Homepage/Homepage';
import Intake from './pages/Intake/Intake';
import PersonalForm from './components/IntakeForms/PersonalForm';
import AthleticForm from './components/IntakeForms/AthleticForm';
import AcademicForm from './components/IntakeForms/AcademicForm';
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

  const userId = localStorage.getItem('userId');


  

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken} />
        <Routes>
        <Route path="/" element={<HomePage token={token} setToken={setToken} />} />
        <Route path="/intake" element={<Intake token={token} userId={userId} />} />
                   
          {/* Intake Form Routes */}
          <Route path="/personal-info" element={<PersonalForm />} />
          <Route path="/athletic-info" element={<AthleticForm />} />
          <Route path="/academic-info" element={<AcademicForm />} />

      
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/**
 * import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserSettings from './pages/UserSettings/UserSettings';
import HomePage from './pages/Homepage/Homepage';
import Intake from './pages/Intake/Intake';
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

  const userId = localStorage.getItem('userId');


  

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken} />
        <Routes>
        <Route path="/" element={<HomePage token={token} setToken={setToken} />} />
        <Route path="/intake" element={<Intake token={token} userId={userId} />} />
                   
           Intake Form Routes 
          <Route path="/personal-info" element={<PersonalForm />} />
          <Route path="/athletic-info" element={<AthleticForm />} />
          <Route path="/academic-info" element={<AcademicForm />} />

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
 */