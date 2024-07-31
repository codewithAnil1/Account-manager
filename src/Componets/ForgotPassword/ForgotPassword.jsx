import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);
    if (user) {
      setShowPasswordFields(true);
    } else {
      alert("Email not found");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Update user password in local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Password updated successfully");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      {!showPasswordFields ? (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Verify Email
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
