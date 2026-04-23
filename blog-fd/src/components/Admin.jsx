import React, { useEffect, useState, useMemo } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state add ki hai

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/users", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized or Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || data);
        setIsLoading(false); // Fetch complete hone pe loading false
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // useMemo ka use kiya hai taake stats bar bar faltu mein calculate na hon
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const regularUsers = total - admins;
    return { total, admins, regularUsers };
  }, [users]);

  // Loading & Error UI
  if (isLoading) return <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#555" }}>⏳ Loading Dashboard Data...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", padding: "50px", fontSize: "1.2rem", backgroundColor: "#ffeaea", borderRadius: "10px", margin: "20px" }}>❌ {error}</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2c3e50", fontSize: "2.5rem" }}>Admin Dashboard</h1>

      {/* --- STATS SECTION --- */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center", marginBottom: "50px" }}>
        <StatCard title="Total Users" count={stats.total} color="#3498db" />
        <StatCard title="Total Admins" count={stats.admins} color="#e74c3c" />
        <StatCard title="Regular Users" count={stats.regularUsers} color="#2ecc71" />
      </div>

      <h2 style={{ color: "#34495e", borderBottom: "2px solid #ecf0f1", paddingBottom: "10px", marginBottom: "30px" }}>
        User Directory
      </h2>

      {/* --- CARDS CONTAINER --- */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {users.length === 0 ? (
          <p style={{ color: "#7f8c8d" }}>No users found.</p>
        ) : (
          users.map((u) => <UserCard key={u._id || u.username} user={u} />)
        )}
      </div>
    </div>
  );
}

// ==========================================
// Helper Components (For Clean UI & Code)
// ==========================================

// 1. Stat Card Component
const StatCard = ({ title, count, color }) => (
  <div style={{
    backgroundColor: "black",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
    minWidth: "220px",
    textAlign: "center",
    borderTop: `5px solid ${color}`,
    transition: "transform 0.2s"
  }}>
    <h3 style={{ margin: "0 0 10px 0", color: "#7f8c8d", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
      {title}
    </h3>
    <p style={{ margin: 0, fontSize: "2.8rem", fontWeight: "bold", color: "#2c3e50" }}>
      {count}
    </p>
  </div>
);

// 2. User Card Component
const UserCard = ({ user }) => {
  const isAdmin = user.role === "admin";
  
  return (
    <div style={{
      backgroundColor: "#fff",
      border: "1px solid #eaeaea",
      borderRadius: "12px",
      padding: "25px",
      width: "280px",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      {/* Header Row (Name & Badge) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ margin: 0, color: "#2c3e50", fontSize: "1.3rem", width: "170px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {user.name}
        </h3>
        
        {/* Role Badge */}
        <span style={{
          backgroundColor: isAdmin ? "#ffe8e8" : "#e8f8f5",
          color: isAdmin ? "#e74c3c" : "#1abc9c",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          border: `1px solid ${isAdmin ? "#fadbd8" : "#d1f2eb"}`
        }}>
          {user.role || "user"}
        </span>
      </div>

      {/* Username */}
      <p style={{ margin: 0, color: "#7f8c8d", fontSize: "1rem" }}>
        <strong style={{ color: "#bdc3c7" }}>@</strong>{user.username}
      </p>

      {/* Footer (Date) */}
      <div style={{ 
        marginTop: "10px", 
        paddingTop: "15px", 
        borderTop: "1px solid #f4f4f4", 
        fontSize: "0.85rem", 
        color: "#95a5a6",
        display: "flex",
        alignItems: "center",
        gap: "5px"
      }}>
        <span>📅</span> 
        <span>Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : "N/A"}</span>
      </div>
    </div>
  );
};