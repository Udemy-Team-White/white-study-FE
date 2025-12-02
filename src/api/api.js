import axios from "axios";

const api = axios.create({
  // baseURL: "http://3.235.120.58:8081",
  baseURL: "https://api-white-study-be.store",
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
