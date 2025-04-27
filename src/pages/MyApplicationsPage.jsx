import { useEffect, useState } from "react";
import axios from "../api/axios";

const MyApplicationPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/applications/my-applications");
        setApplications(response.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <strong>{app.job.title}</strong> - {app.status} <br />
              Resume: <a href={app.resumePath} target="_blank" rel="noreferrer">Download</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplicationPage;