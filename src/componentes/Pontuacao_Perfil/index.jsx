import React, { useState, useEffect } from "react";
import "./styles.css";
// 1. Importação necessária para o deploy
import { apiFetch } from "../../services/api";

const Pontuacao = () => {
  // 1. Dados básicos do usuário
  const nomeUsuarioLogado = localStorage.getItem("usuarioNome") || "Usuário";
  const emailUsuarioLogado = localStorage.getItem("usuarioEmail");
  
  // 2. Estados para guardar a pontuação e controlar o carregamento
  const [pontos, setPontos] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // 3. Busca a pontuação exata via apiFetch
  useEffect(() => {
    const carregarPontuacao = async () => {
      if (!emailUsuarioLogado) {
        setCarregando(false);
        return;
      }

      try {
        // Busca apenas a pontuação do usuário logado diretamente
        const pontuacaoExata = await apiFetch(`/ranking/pontuacao?email=${emailUsuarioLogado}`);
        setPontos(pontuacaoExata);
      } catch (error) {
        console.error("Erro ao buscar a pontuação:", error);
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
        {/* Mantivemos a estética original que você prefere */}
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