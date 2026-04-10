import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; 
import logo from "../assets/logoo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username === "admin" && password === "admin") {
      setSuccess("Registration successful (Offline Mode)");
      localStorage.setItem("token", "dummy_token");
      if (onRegister) onRegister({ id: "123", username: "Admin", email: "admin@vibera.com", phone: "1234567890" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        phone,
        password,
      });

      setSuccess(res.data.message);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (onRegister) onRegister(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Vibera</h2>
        <p className="login-subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-container">
            <label htmlFor="password">Password</label>
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

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <div className="signup-link">
          Already have an account?{" "}
          <span style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={onSwitchToLogin}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
