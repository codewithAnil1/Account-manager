import React, { useState } from "react";

function AdminLogin() {
  const [adminForm, setAdminForm] = useState({
    adminUsername: "",
    adminPassword: "",
  });

  const [allUsers, setAllUsers] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({
      ...adminForm,
      [name]: value,
    });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    // Assuming admin credentials are admin/admin for simplicity
    if (
      adminForm.adminUsername === "admin" &&
      adminForm.adminPassword === "admin"
    ) {
      alert("Admin Login Successful");
      setIsAdminLoggedIn(true);
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      setAllUsers(users);
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      {!isAdminLoggedIn ? (
        <form onSubmit={handleAdminSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Username</label>
            <input
              type="text"
              className="form-control"
              name="adminUsername"
              value={adminForm.adminUsername}
              onChange={handleAdminChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-control"
              name="adminPassword"
              value={adminForm.adminPassword}
              onChange={handleAdminChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      ) : (
        <div>
          <h3>Registered Users</h3>
          <ul>
            {allUsers.map((user, index) => (
              <li key={index}>
                {user.username} - {user.email} - {user.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
