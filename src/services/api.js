// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://cyberguard-backend-2rrx.onrender.com";

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Garante que os headers padrão estão configurados
  options.headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, options);
  return response;
};