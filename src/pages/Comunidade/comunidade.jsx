import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Logo from "./assets/lococomunidade4.png";
import "./styles.css";

export default function BasePage() {
  const [postagens, setPostagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca as postagens do backend assim que a página é renderizada
  useEffect(() => {
    async function buscarPostagens() {
      try {
        // O proxy do Vite redireciona automaticamente para http://localhost:9000/api/postagens
        const response = await fetch("/api/postagens");
        if (response.ok) {
          const dados = await response.json();
          setPostagens(dados);
        } else {
          console.error("Erro ao buscar postagens do servidor");
        }
      } catch (error) {
        console.error("Erro de rede ao conectar com o backend:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarPostagens();
  }, []);

  // Função auxiliar para formatar a data vinda do Java de forma amigável
  function formatarData(dataString) {
    if (!dataString) return "Agora";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="app-fundo-br">
      <img src={Logo} className="logo-comunidade" alt="Logo da Comunidade" />
      <p className="P1">
        Bem-vindo à comunidade <span className="span1">CyberGuard!</span>
      </p>
      <Link to="/bemvindocom" className="back_comunidade" aria-label="Voltar">
        ← Voltar
      </Link>

      <div className="app-content">
        <div className="container">
          {carregando ? (
            <p
              className="texto-carregando"
              style={{ textAlign: "center", color: "#666" }}
            >
              Carregando publicações da comunidade...
            </p>
          ) : postagens.length === 0 ? (
            <p
              className="texto-vazio"
              style={{ textAlign: "center", color: "#666" }}
            >
              Nenhuma postagem ainda. Seja o primeiro a compartilhar algo!
            </p>
          ) : (
            // Loop dinâmico que renderiza cada postagem real do banco de dados Neon
            postagens.map((post) => (
              <div className="post-card" key={post.id}>
                {/* Nome do autor vindo do relacionamento do Backend */}
                <h3 className="username">
                  {post.autor ? post.autor.nome : "Usuário CyberGuard"}
                </h3>

                <div
                  className="post-body"
                  style={{
                    margin: "15px 0",
                    color: "#333",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <p>{post.conteudo}</p>
                </div>

                <div className="actions">
                  <span className="action" style={{ cursor: "pointer" }}>
                    ♡
                  </span>
                  <Link to="/NovaPostagem" className="action">
                    <span>💬</span>
                  </Link>
                </div>

                <div className="info">
                  <span>0 comentários</span>
                  <span>{formatarData(post.dataCriacao)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="nova-postagem-wrapper">
          <Link to="/NovaPostagem" className="btn-nova-postagem">
            + Nova Postagem
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
