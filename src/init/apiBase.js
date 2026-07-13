export const API_BASE_URL =
  import.meta.env.VITE_JAVA_API_URL?.trim() ||
  (import.meta.env.PROD
    ? "https://multi-tenant-java.onrender.com/api"
    : "http://localhost:3000/api");
