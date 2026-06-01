import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, ".", "");

  
  let backendPort;

  if (mode === "local_back") {
    
    const porta = env.VITE_LOCAL_PORT || "9000";
    backendPort = `http://localhost:${porta}`;
  } else {
    
    backendPort = "https://cyberguard-backend-2rrx.onrender.com";
  }

  
  console.log("Vite Proxy direcionando para:", backendPort);

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