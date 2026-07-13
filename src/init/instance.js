import axios from "axios";
import { API_BASE_URL } from "./apiBase";

const api = axios.create({
  baseURL: API_BASE_URL,
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
