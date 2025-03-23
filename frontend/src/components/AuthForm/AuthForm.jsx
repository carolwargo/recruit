import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../TermsModal/TermsModal";
import PrivacyModal from "../PrivacyModal/PrivacyModal";
import "./AuthForm.css"; // Updated import

const AuthForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setAlertType("error"); // Set error type for alert
    }
  };

  return (
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

      <div className="terms-privacy mt-4 text-center fw-light small">
        Sign up constitutes consent to comply with {" "}
        <span className="me-1">
          {" "}
          <TermsModal />{" "}
        </span>{" "}
        <PrivacyModal />
      </div>

      {/* Display the Alert Message */}
      {alertMessage && (
        <div className={`alert ${alertType === "success" ? "alert-success" : "alert-error"}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
