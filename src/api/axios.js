import axios from "axios";

// Create an axios instance
const instance = axios.create({
  baseURL: "http://localhost:8050", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;