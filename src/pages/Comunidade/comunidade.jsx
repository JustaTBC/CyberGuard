import React, { useState, useEffect } from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { apiFetch } from "../../services/api"; // 1. Importação correta
import "./styles.css";

export default function Comunidade() {
  const [postagens, setPostagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPostagens = async () => {
      try {
        // 2. Usando o apiFetch para buscar as postagens no Render
        // Certifique-se que o seu PostagemController tenha @RequestMapping("/api/postagens")
        const dados = await apiFetch("/api/postagens");
        setPostagens(dados);
      } catch (error) {
        console.error("Erro ao carregar postagens da comunidade:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarPostagens();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <h2>Comunidade CyberGuard</h2>
        
        {carregando ? (
          <p>Carregando discussões...</p>
        ) : (
          <div className="feed-comunidade">
            {postagens.length > 0 ? (
              postagens.map((post) => (
                <div key={post.id} className="post-card">
                  <h3>{post.titulo}</h3>
                  <p>{post.conteudo}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma postagem no momento.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}