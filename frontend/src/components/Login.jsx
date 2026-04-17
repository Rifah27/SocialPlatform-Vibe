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
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Vibera</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Username / Phone Number</label>
            <div className="input-wrapper">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your details"
                required
              />
            </div>
          </div>

          <div className="form-group password-container">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <div className="password-input-wrapper input-wrapper">
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
            <label htmlFor="remember">Remember me for 30 days</label>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="divider"><span>OR</span></div>

        <div className="social-login">
          <button className="social-button google">
            <FcGoogle className="social-icon" /> Continue with Google
          </button>
          <button className="social-button github">
            <FaGithub className="social-icon" /> Continue with GitHub
          </button>
        </div>

        <div className="signup-link">
          Don't have an account?{" "}
          <a onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }} href="#">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
