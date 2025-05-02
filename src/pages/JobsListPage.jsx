import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const JobsListPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(() => alert("Failed to fetch jobs."));
  }, []);

  const handleClick = () => {
    navigate("/post-job");
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div>
      {localStorage.getItem("role")==="RECRUITER" &&  <button onClick={handleClick}>Post Job</button>}
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }} onClick={() => handleJobClick(job.id)}>
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