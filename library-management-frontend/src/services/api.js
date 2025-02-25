import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const email = localStorage.getItem("email"); 
  if (email) {
    config.headers.Authorization = `Bearer ${email}`;
  }
  return config;
});

export const addBook = async (bookData) => {
  try {
    const response = await api.post("/admin/add-book", bookData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const removeBook = async (isbn) => {
  try {
    const response = await api.delete(`/admin/remove-book/${isbn}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
