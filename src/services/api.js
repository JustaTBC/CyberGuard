// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://cyberguard-backend-2rrx.onrender.com";

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  options.headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, options);

  // 1. Tratamento de erro (se o status não for 2xx)
  if (!response.ok) {
    const erroDados = await response.json().catch(() => ({}));
    throw new Error(erroDados.message || `Erro: ${response.status}`);
  }

  // 2. CORREÇÃO: Se o status for 204 (No Content), não tente ler JSON.
  // Isso evita o erro de "Unexpected end of input" que causa o popup.
  if (response.status === 204) {
    return null; 
  }

  // 3. Para qualquer outro caso de sucesso (como 200 OK), processa o JSON normalmente.
  return await response.json();
};