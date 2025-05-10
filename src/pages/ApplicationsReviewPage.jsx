import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ApplicationsReviewPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/applications/my-posted-jobs");
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = (app) => {
        axios
        .get(`/applications/${app.id}/resume`, {
          responseType: "blob", 
        })
        .then((res) => {
          const blob = new Blob([res.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((err) => {
          console.error("Error viewing resume", err);
          alert("Unable to load resume.");
        });
      
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await axios.put(`/applications/${applicationId}?status=${newStatus}`);
      fetchApplications(); // Refresh the list
    } catch (err) {
      console.error(`Error updating status: ${err}`);
      alert("Failed to update status.");
    }
  };

  if (loading) return <div className="p-4">Loading applications...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Applications to Your Jobs</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Job Title</th>
              <th className="text-left py-2 px-4 border-b">Candidate Email</th>
              <th className="text-left py-2 px-4 border-b">Status</th>
              <th className="text-left py-2 px-4 border-b">Resume</th>
              <th className="text-left py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="py-2 px-4 border-b">{app.job.title}</td>
                <td className="py-2 px-4 border-b">{app.applicant.email}</td>
                <td className="py-2 px-4 border-b capitalize">{app.status}</td>
                <td className="py-2 px-4 border-b">
                   <> <button onClick={() => handleViewResume(app)}>View Resume</button></>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                {app.status === "PENDING" ? (
                        <>
                        <button
                            onClick={() => updateStatus(app.id, "APPROVED")}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => updateStatus(app.id, "REJECTED")}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                            Reject
                        </button>
                        </>
                    ) : (
                        <span className="text-gray-500">No actions</span>
                    )}              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationsReviewPage;