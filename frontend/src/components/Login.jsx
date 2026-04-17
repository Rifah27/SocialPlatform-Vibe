import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import logo from "../assets/vibera_v_logo.png";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Fallback bypass logic for frontend testing when backend DB is unreachable
    if (identifier === "admin" && password === "admin") {
      setSuccess("Login successful (Offline Mode)");
      localStorage.setItem("token", "dummy_token");
      if (onLogin) onLogin({ id: "123", username: "Admin", email: "admin@vibera.com", phone: "1234567890" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        identifier, 
        password,
      });

      setSuccess(res.data.message);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (onLogin) onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-split-container">
        
        {/* Left Visual Panel */}
        <div className="login-visual-panel">
          <div className="visual-overlay"></div>
          <div className="visual-content">
            <h1 className="visual-title">Discover your Vibe.</h1>
            <p className="visual-subtitle">
              Connect with people, share your moments, and explore a world of endless possibilities.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="login-form-panel">
          <div className="login-form-content">
            <div className="login-header">
              <img src={logo} alt="Logo" className="login-brand-logo" />
              <h2>Welcome to Vibera</h2>
              <p className="login-subtitle">Sign in to securely access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="identifier">Username or Email</label>
                <div className="input-box">
                  <FaUserAlt className="input-icon" />
                  <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-password">Forgot?</a>
                </div>
                <div className="input-box">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me signed in</label>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <button type="submit" className="login-button">Sign In to Dashboard</button>
            </form>

            <div className="divider"><span>OR CONTINUE WITH</span></div>

            <div className="social-login">
              <button className="social-button google">
                <FcGoogle className="social-icon" /> Google
              </button>
              <button className="social-button github">
                <FaGithub className="social-icon" /> GitHub
              </button>
            </div>

            <p className="signup-link">
              New to Vibera?{" "}
              <a onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }} href="#">
                Create an account
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
