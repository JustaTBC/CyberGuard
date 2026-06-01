import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Carrega as variáveis do arquivo .env ou .env.local
  const env = loadEnv(mode, __dirname, "");

  // 🔄 OPERADOR TERNÁRIO DUPLO (As 3 Situações):
  // 1. Se for Produção (Vercel) -> Usa o link do Render.
  // 2. Se for Desenvolvimento -> Verifica se existe uma porta no seu .env (9000). 
  // 3. Se não tiver nada no .env (PC dos meninos) -> Adota a 8080 como padrão.
  const backendPort = mode === "production"
    ? "https://cyberguard-backend-2rrx.onrender.com"
    : env.VITE_LOCAL_PORT 
      ? `http://localhost:${env.VITE_LOCAL_PORT}` 
      : "http://localhost:8080";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": backendPort,
        "/usuarios": backendPort,
        "/ranking": backendPort,
        "/quiz": backendPort,
        "/links": backendPort,
        "/denuncias": backendPort,
      },
    },
  };
});