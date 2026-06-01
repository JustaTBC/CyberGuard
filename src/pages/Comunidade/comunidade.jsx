import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Logo from "./assets/lococomunidade4.png";
import "./styles.css";

export default function BasePage() {
  const [postagens, setPostagens] = useState([]);
  const [idPostagemEditando, setIdPostagemEditando] = useState(null);
  const [novoConteudo, setNovoConteudo] = useState("");

  // 🔍 BUSCAR POSTAGENS DO BACKEND
  const carregarPostagens = async () => {
    try {
      const response = await fetch("/api/postagens");
      if (response.ok) {
        const dados = await response.json();
        setPostagens(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    }
  };

  useEffect(() => {
    carregarPostagens();
  }, []);

  // ❌ DELETAR POSTAGEM
  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta publicação?")) {
      try {
        const response = await fetch(`/api/postagens/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPostagens(postagens.filter((post) => post.id !== id));
        } else {
          alert("Erro ao deletar postagem.");
        }
      } catch (error) {
        console.error("Erro na requisição de deleção:", error);
      }
    }
  };

  // 📝 ENVIAR EDIÇÃO PARA O BACKEND
  const handleSalvarEdicao = async (id) => {
    try {
      const response = await fetch(`/api/postagens/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conteudo: novoConteudo }),
      });

      if (response.ok) {
        setPostagens(
          postagens.map((post) =>
            post.id === id ? { ...post, conteudo: novoConteudo } : post,
          ),
        );
        setIdPostagemEditando(null);
        setNovoConteudo("");
      } else {
        alert("Erro ao atualizar postagem. Status: " + response.status);
      }
    } catch (error) {
      console.error("Erro na requisição de edição:", error);
    }
  };

  // Ativa o campo de edição injetando o texto antigo
  const iniciarEdicao = (post) => {
    setIdPostagemEditando(post.id);
    setNovoConteudo(post.conteudo);
  };

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
          {postagens.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              Nenhuma postagem encontrada no fórum.
            </p>
          ) : (
            postagens.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header">
                  <h3 className="username">
                    @{post.autor?.nome || "CyberGuardMembro"}
                  </h3>

                  <div className="post-admin-actions">
                    <button
                      onClick={() => iniciarEdicao(post)}
                      className="btn-icon-edit"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeletar(post.id)}
                      className="btn-icon-delete"
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {idPostagemEditando === post.id ? (
                  <div className="edit-box-container">
                    <textarea
                      className="edit-textarea"
                      value={novoConteudo}
                      onChange={(e) => setNovoConteudo(e.target.value)}
                    />
                    <div className="edit-box-buttons">
                      <button
                        onClick={() => handleSalvarEdicao(post.id)}
                        className="btn-save"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setIdPostagemEditando(null)}
                        className="btn-cancel"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="post-text-content">{post.conteudo}</p>
                )}

                <div className="actions">
                  <span className="action">♡</span>
                  <Link to="/NovaPostagem" className="action">
                    <span className="action">💬</span>
                  </Link>
                </div>

                <div className="info">
                  <span>Comentários desativados</span>
                  <span>
                    {post.dataCriacao
                      ? new Date(post.dataCriacao).toLocaleDateString("pt-BR")
                      : "Recentemente"}
                  </span>
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
