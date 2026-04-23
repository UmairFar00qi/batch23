import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:5000/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (res.ok) {
				const userObj = data.user || { username: data.username || formData.username };
				onLogin && onLogin(userObj, data.token);
				alert(data.message || "Login successful");
				navigate("/");
			} else {
				alert(data.message || "Login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			alert("An error occurred during login. Check the console.");
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
			<h1>Login</h1>
			<input
				type="text"
				placeholder="Username"
				value={formData.username}
				onChange={(e) => setFormData({ ...formData, username: e.target.value })}
			/>
			<br />
			<input
				type="password"
				placeholder="Password"
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
			/>
			<br />
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
