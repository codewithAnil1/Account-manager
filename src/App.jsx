import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Componets/Register/Register";
import Login from "./Componets/Login/Login";
import Account from "./Componets/Accounts/Accounts";
import AdminLogin from "./Componets/AdminLogin/AdminLogin";
import ForgotPassword from "./Componets/ForgotPassword/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("currentUser")
  );

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Account Manager
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Register
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    Account
                  </Link>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("currentUser");
                }}
                className="btn btn-secondary ml-auto"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/account"
            element={
              <Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
