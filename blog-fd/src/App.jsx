import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Singup from "./components/Singup";
import Admin from "./components/Admin";
import UserDashboard from "./components/UserDashboard"; // Import new dashboard

function App() {
  const [data, setData] = useState("checking connection...");
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((result) => setData(result.message))
      .catch(() => setData("No connection to backend"));
  }, []);

  const handleLogin = (userObj, token) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    if (token) localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Force redirect on logout
  };

  return (
    <Router>
      <header style={{ padding: "15px 20px", backgroundColor: "#333", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>My App</h2>
        
        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {!user ? (
            <>
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
              <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
              {user.role === "admin" && (
                <Link to="/admin" style={{ color: "#ff4d4d", textDecoration: "none", fontWeight: "bold" }}>Admin Panel</Link>
              )}
              <span style={{ marginLeft: "10px", color: "#ccc" }}>Hi, {user.name}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: "#ff4d4d", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main style={{ padding: "20px", backgroundColor: "#f4f4f9", minHeight: "80vh" }}>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<div style={{ textAlign: "center" }}><h2>Status: {data}</h2><p>Navigate using the menu above.</p></div>} />
          
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Singup /> : <Navigate to="/dashboard" />} />
          
          {/* User Dashboard - Only accessible if logged in */}
          <Route path="/dashboard" element={user ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
          
          {/* Admin Panel - Only accessible if logged in AND role is admin */}
          <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <div style={{ textAlign: "center", color: "red", marginTop: "50px" }}><h2>Not Authorized!</h2></div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;