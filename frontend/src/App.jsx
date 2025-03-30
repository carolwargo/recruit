import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Homepage/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import IntakePage from './pages/IntakePage/IntakePage';
import PersonalForm from './components/IntakeForms/PersonalForm';
import ContactForm from './components/IntakeForms/ContactForm';
import AthleticForm from './components/IntakeForms/AthleticForm';
import AcademicForm from './components/IntakeForms/AcademicForm';
import UserSettings from './pages/UserSettings/UserSettings';
import AuthPage from './pages/AuthPage/AuthPage';
import AboutPage from './pages/AboutPage/AboutPage';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Dynamic userId

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (userId) localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUserId(null); // Clear userId on logout
    }
  }, [token, userId]);

  return (
  
      <div className="App">
          <BrowserRouter basename='/recruit'>
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          {/* Root: Redirect based on auth */}
          <Route
            path="/"
            element={token ? <Navigate to={`/intake/${userId}`} /> : <HomePage token={token} setToken={setToken} />}
          />
          {/* Auth Page */}
          <Route path="/auth" element={<AuthPage token={token} setToken={setToken} setUserId={setUserId} />} />

          {/* Protected Intake Routes */}
          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/intake/:userId" element={<IntakePage token={token} userId={userId} />}>
              <Route index element={<Navigate to="personal" replace />} /> {/* Default to personal */}
              <Route path="personal" element={<PersonalForm token={token} userId={userId} />} />
              <Route path="contact" element={<ContactForm token={token} userId={userId} />} />
              <Route path="athletic" element={<AthleticForm token={token} userId={userId} />} />
              <Route path="academic" element={<AcademicForm token={token} userId={userId} />} />
            </Route>

            {/* Settings Routes */}
            <Route path="/settings/*" element={<UserSettings token={token} userId={userId} />}>
              <Route index element={<div>User Settings Dashboard (TBD)</div>} />
              <Route path="personal" element={<div>Personal Info (TBD)</div>} />
              <Route path="athletic" element={<div>Athletic Profile (TBD)</div>} />
              <Route path="academic" element={<div>Academic Profile (TBD)</div>} />
            </Route>
          </Route>

          {/* Catch-all for unmatched routes */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;