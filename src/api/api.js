import axios from "axios";

const api = axios.create({
  baseURL: "https://student-os-1-59k0.onrender.com",
});

export default api;