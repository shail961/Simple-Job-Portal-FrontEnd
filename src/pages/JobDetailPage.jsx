import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function JobDetailPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8050/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleApply = async () => {

    if (!selectedFile) {
      alert("Please select a resume file before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", selectedFile);


    await axios.post(`/applications`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer `,
      },
    }).then(() => {
        setJob({ ...job, applied: true });
        alert("Application submitted successfully.");
      })
      .catch((err) => {
        console.error(err);
      });

  };

  if (!job) {
    return <div className="p-6">Loading job details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <h2 className="text-xl text-gray-700 mb-2">{job.company}</h2>
      <p className="text-gray-500 mb-4">{job.location}</p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Job Description</h3>
        <p className="text-gray-700 mt-2">{job.description}</p>
      </div>

      {job.applied===false &&
       <div>
       <input type="file" accept=".pdf" onChange={handleFileChange} />
       <button onClick={handleApply}>Apply with Resume</button>
     </div>
       }
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>

    </div>
  );
}

export default JobDetailPage;
