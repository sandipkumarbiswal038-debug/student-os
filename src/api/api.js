import axios from "axios";

const api = axios.create({
  // Use the deployed API by default. Set VITE_API_URL=http://localhost:4000
  // in a local .env file when running the Express server yourself.
  baseURL: import.meta.env.VITE_API_URL || "https://student-os-1-59k0.onrender.com",
});

export default api;
