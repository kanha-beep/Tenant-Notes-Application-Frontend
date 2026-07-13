import axios from "axios";

const API_URL =
  import.meta.env.VITE_JAVA_API_URL?.trim() ||
  (import.meta.env.PROD
    ? "https://multi-tenant-java.onrender.com/api"
    : "http://localhost:3001/api");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    }

    return Promise.reject(error);
  }
);

export default api;
