import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Singup = () => {

    const [formData, setFormData] = useState({ name: "", username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/singup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            alert(data.message || "Signup completed");
            // after signup, navigate to login
            navigate("/login");
        } catch (err) {
            console.error("Signup error:", err);
            alert("An error occurred. Check the console for details.");
        }
    };

return(
<form onSubmit={handleChange}>

    <h1>Sign Up</h1>
        <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
    </form>
);

};


export default Singup;



