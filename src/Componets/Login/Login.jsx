import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (user) {
      alert("Login Successful");
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/account");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/">Register</Link>
        </p>
        <p>
          Login as an <Link to="/admin-login">Admin</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
