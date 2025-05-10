import { useEffect, useState } from "react";
import axios from "../api/axios";

const MyApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/applications/my-applications");
        setApplications(response.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
 
  if (loading) return <div className="p-4">Loading applications...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Applications and their status</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Job Title</th>
              <th className="text-left py-2 px-4 border-b">Status</th>
              <th className="text-left py-2 px-4 border-b">Submitted Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="py-2 px-4 border-b">{app.job.title}</td>
                <td className="py-2 px-4 border-b capitalize">{app.status}</td>
                <td className="py-2 px-4 border-b">
                   <> <button onClick={() => handleViewResume(app)}>View Resume</button></>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default MyApplicationPage;