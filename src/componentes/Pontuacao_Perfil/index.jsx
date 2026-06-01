import React, { useState, useEffect } from "react";
import "./styles.css";
// 1. Importação necessária
import { apiFetch } from "../../services/api";

const Pontuacao = () => {
  const nomeUsuarioLogado = localStorage.getItem("usuarioNome") || "Usuário";
  const emailUsuarioLogado = localStorage.getItem("usuarioEmail");

  const [pontos, setPontos] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPontuacao = async () => {
      // Se não tiver e-mail logado, não chamamos a API
      if (!emailUsuarioLogado) {
        setCarregando(false);
        return;
      }

      try {
        // 2. Usamos o apiFetch com a rota correta. 
        // Verifique se o seu RankingController usa /api/ranking ou apenas /ranking
        const pontuacaoExata = await apiFetch(`/ranking/pontuacao?email=${emailUsuarioLogado}`);
        setPontos(pontuacaoExata);
      } catch (error) {
        console.error("Erro ao buscar a pontuação do usuário:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarPontuacao();
  }, [emailUsuarioLogado]);

  return (
    <div className="pontuacao-container">
      <h3 className="pontuacao-titulo">SUA PONTUAÇÃO</h3>

      <div className="pontuacao-card">
        <img
          src="https://i.pravatar.cc/50?img=2"
          alt="Foto do usuário"
          className="pontuacao-foto"
        />

        <div className="pontuacao-info">
          <p className="pontuacao-nome">{nomeUsuarioLogado}</p>
          <p className="pontuacao-pontos">
            {carregando ? "Carregando..." : `${pontos.toLocaleString()} Pontos`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pontuacao;