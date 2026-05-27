import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const safariAPI = {
  getAll: () => api.get("/safaris"),
  getById: (id) => api.get(`/safaris/${id}`),
  create: (data) => api.post("/safaris", data),
  update: (id, data) => api.put(`/safaris/${id}`, data),
  delete: (id) => api.delete(`/safaris/${id}`)
};

export const activityAPI = {
  getAll: () => api.get("/activities"),
  getById: (id) => api.get(`/activities/${id}`),
  create: (data) => api.post("/activities", data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`)
};

export const roomAPI = {
  getAll: () => api.get("/rooms"),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post("/rooms", data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`)
};

export const mealAPI = {
  getAll: () => api.get("/meals"),
  getById: (id) => api.get(`/meals/${id}`),
  create: (data) => api.post("/meals", data),
  update: (id, data) => api.put(`/meals/${id}`, data),
  delete: (id) => api.delete(`/meals/${id}`)
};

export const bookingAPI = {
  getAll: () => api.get("/bookings"),
  create: (data) => api.post("/bookings", data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id) => api.delete(`/bookings/${id}`)
};

export const userAPI = {
  createProfile: (data) => api.post("/users", data),
  register: (data) => api.post("/users/register", data),
  login: (data) => api.post("/users/login", data),
  logout: () => api.post("/users/logout"),
  getAll: () => api.get("/users"),
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  deleteProfile: (id) => api.delete(`/users/${id}`)
};

export default api;
