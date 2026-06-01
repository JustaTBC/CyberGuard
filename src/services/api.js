// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://cyberguard-backend-2rrx.onrender.com";

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  options.headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, options);

  // Se o servidor responder com erro (400, 500, etc), lançamos um erro
  if (!response.ok) {
    const erroDados = await response.json().catch(() => ({})); // tenta ler o erro do back
    throw new Error(erroDados.message || `Erro: ${response.status}`);
  }

  // Já retorna o JSON processado para quem chamou
  return await response.json();
};