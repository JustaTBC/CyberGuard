import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; 
import Logo from "./assets/lococomunidade4.png";
import "./styles.css";

export default function Comunidade() {
  const [postagens, setPostagens] = useState([]);
  const [idPostagemEditando, setIdPostagemEditando] = useState(null);
  const [novoConteudo, setNovoConteudo] = useState("");
  const [carregando, setCarregando] = useState(true);

  // 1. BUSCAR POSTAGENS (Conectado ao Deploy)
  const carregarPostagens = async () => {
    try {
      setCarregando(true);
      const dados = await apiFetch("/api/postagens");
      setPostagens(dados);
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPostagens();
  }, []);

  // 2. DELETAR POSTAGEM
  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta publicação?")) {
      try {
        await apiFetch(`/api/postagens/${id}`, { method: "DELETE" });
        setPostagens(postagens.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao deletar postagem.");
      }
    }
  };

  // 3. SALVAR EDIÇÃO
  const handleSalvarEdicao = async (id) => {
    try {
      await apiFetch(`/api/postagens/${id}`, {
        method: "PUT",
        body: JSON.stringify({ conteudo: novoConteudo }),
      });
      setPostagens(
        postagens.map((post) =>
          post.id === id ? { ...post, conteudo: novoConteudo } : post
        )
      );
      setIdPostagemEditando(null);
    } catch (error) {
      console.error("Erro na edição:", error);
      alert("Erro ao atualizar postagem.");
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="app-fundo-br">
        <img src={Logo} className="logo-comunidade" alt="Logo da Comunidade" />
        <p className="P1">
          Bem-vindo à comunidade <span className="span1">CyberGuard!</span>
        </p>

        <div className="app-content">
          <div className="container">
            {carregando ? (
              <p style={{ textAlign: "center" }}>Carregando discussões...</p>
            ) : postagens.length === 0 ? (
              <p style={{ textAlign: "center", color: "#777" }}>Nenhuma postagem encontrada.</p>
            ) : (
              postagens.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-header">
                    <h3 className="username">@{post.autor?.nome || "Membro"}</h3>
                    <div className="post-admin-actions">
                      <button onClick={() => { setIdPostagemEditando(post.id); setNovoConteudo(post.conteudo); }} className="btn-icon-edit">✏️</button>
                      <button onClick={() => handleDeletar(post.id)} className="btn-icon-delete">🗑️</button>
                    </div>
                  </div>

                  {idPostagemEditando === post.id ? (
                    <div className="edit-box-container">
                      <textarea className="edit-textarea" value={novoConteudo} onChange={(e) => setNovoConteudo(e.target.value)} />
                      <div className="edit-box-buttons">
                        <button onClick={() => handleSalvarEdicao(post.id)} className="btn-save">Salvar</button>
                        <button onClick={() => setIdPostagemEditando(null)} className="btn-cancel">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <p className="post-text-content">{post.conteudo}</p>
                  )}

                  <div className="info">
                    <span>{new Date(post.dataCriacao).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="nova-postagem-wrapper">
            <Link to="/NovaPostagem" className="btn-nova-postagem">+ Nova Postagem</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}