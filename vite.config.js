import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Converte a URL do módulo atual para o caminho de diretório nativo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente usando o caminho descoberto de forma 100% web
  const env = loadEnv(mode, __dirname, "");

  // Captura a porta do seu .env / .env.local ou adota a 8080 como padrão pro time
  const backendPort = env.PORT || "8080";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://localhost:" + backendPort,
        "/usuarios": "http://localhost:" + backendPort,
        "/ranking": "http://localhost:" + backendPort,
        "/quiz": "http://localhost:" + backendPort,
        "/links": "http://localhost:" + backendPort,
        "/denuncias": "http://localhost:" + backendPort,
      },
    },
  };
});
