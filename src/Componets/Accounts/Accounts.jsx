import React, { useState, useEffect } from "react";

function Account({ isLoggedIn, setIsLoggedIn }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setForm(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user details in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === form.email ? form : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(form));
    alert("Account Updated Successfully");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
  };

  if (!isLoggedIn) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {form.username}</h2>
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Account
        </button>
      </form>
      <button onClick={handleLogout} className="btn btn-secondary mt-3">
        Logout
      </button>
    </div>
  );
}

export default Account;
