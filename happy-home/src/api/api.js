// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 🔑 REQUEST INTERCEPTOR (TOKEN ATTACHED HERE)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const token = user.token;
    
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
