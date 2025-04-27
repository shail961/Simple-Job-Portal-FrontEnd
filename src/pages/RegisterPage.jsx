import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "APPLICANT" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registered successfully. You can log in now.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <select name="role" onChange={handleChange}>
          <option value="APPLICANT">Applicant</option>
          <option value="RECRUITER">Recruiter</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;