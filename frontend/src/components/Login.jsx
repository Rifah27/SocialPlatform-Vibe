import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import logo from "../assets/logoo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setSuccess(res.data.message);
      console.log("Logged in user:", res.data.user);

      if (onLogin) onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Vibe</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email/Phone Number</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-container">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          <button className="social-button github">
            <i className="fab fa-github"></i> Sign in with GitHub
          </button>
        </div>

        <div className="signup-link">
          Don’t have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
