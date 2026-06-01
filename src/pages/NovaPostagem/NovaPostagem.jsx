import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; 
import Logo from "./assets/lococomunidade4.png";
import "./styles.css";

export default function NovaPostagem() {
  const [conteudo, setConteudo] = useState("");
  const navigate = useNavigate();

  const handlePostar = async (e) => {
    e.preventDefault();

    if (!conteudo.trim()) {
      alert("Por favor, escreva alguma coisa antes de postar!");
      return;
    }

    const logadoId = localStorage.getItem("usuarioId") || 1;

    try {
      // O apiFetch já faz o POST e retorna o resultado ou lança exceção se houver erro
      await apiFetch("/api/postagens", {
        method: "POST",
        body: JSON.stringify({
          conteudo: conteudo,
          autor: {
            id: Number(logadoId),
          },
        }),
      });

      // Se chegar aqui, a postagem foi salva com sucesso
      navigate("/comunidade");
      
    } catch (error) {
      console.error("Erro na requisição de nova postagem:", error);
      alert("Não foi possível salvar a postagem: " + error.message);
    }
  };

  return (
    <div className="app-fundo-br">
      <Header />
      <img src={Logo} alt="Logo da Comunidade" className="logoTopo" />
      <div className="app-content">
        <p className="texto-comunidade">
          Compartilhe uma postagem com a comunidade:
        </p>

        <textarea
          className="campo-postagem"
          placeholder="Escreva sua postagem aqui..."
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />

        <button
          onClick={handlePostar}
          className="botaoComunidade"
          style={{ border: "none", cursor: "pointer" }}
        >
          Postar Agora
        </button>

        <Link className="Sair" to={"/comunidade"}>
          Cancelar
        </Link>
      </div>
      <Footer />
    </div>
  );
}