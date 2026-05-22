import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api"
});

export async function fetchAboutPage() {
  const response = await apiClient.get("/about");
  return response.data;
}
