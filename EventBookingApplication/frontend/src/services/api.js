import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(
        error.response.data?.message || "Server error occurred"
      );
    } else if (error.request) {
      return Promise.reject("Backend not reachable");
    } else {
      return Promise.reject("Unexpected error occurred");
    }
  }
);

export default api;
