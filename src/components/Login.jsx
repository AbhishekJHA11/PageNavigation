import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = JSON.parse(localStorage.getItem("account"));

    if (
      account?.username === form.username &&
      account?.password === form.password
    ) {
      saveUser(form);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
