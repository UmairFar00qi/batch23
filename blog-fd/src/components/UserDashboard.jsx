import React from "react";

const UserDashboard = ({ user }) => {
  if (!user) return <p>Please login to view dashboard.</p>;

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "30px",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        borderTop: "5px solid #007BFF"
      }}>
        <h2>User Dashboard</h2>
        <div style={{ margin: "20px 0", fontSize: "18px" }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> <span style={{ color: "green", fontWeight: "bold" }}>{user.role}</span></p>
        </div>
        <p style={{ color: "#666" }}>Welcome to your personal space!</p>
      </div>
    </div>
  );
};

export default UserDashboard;