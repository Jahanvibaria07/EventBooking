import axios from "axios";

/**
 * Centralized Axios instance
 * Makes API calls consistent and maintainable
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Response interceptor (optional but production-ready)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Backend returned an error response
      return Promise.reject(
        error.response.data?.message || "Server error occurred"
      );
    } else if (error.request) {
      // Request made but no response
      return Promise.reject("Backend not reachable");
    } else {
      return Promise.reject("Unexpected error occurred");
    }
  }
);

export default api;
