import { useEffect, useState } from "react";
import axios from "../api/axios";

const JobsListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(() => alert("Failed to fetch jobs."));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: ₹{job.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsListPage;