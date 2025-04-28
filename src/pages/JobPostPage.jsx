import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const JobPostPage = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs", job);
      alert("Job posted successfully!");
      navigate("/jobs");
    } catch (err) {
      console.log(err);
      alert("Error posting job");
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="salary" type="number" placeholder="Salary" onChange={handleChange} required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default JobPostPage;