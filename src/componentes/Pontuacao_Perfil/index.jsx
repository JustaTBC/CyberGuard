import React, { useState, useEffect } from "react";
import "./styles.css";

const Pontuacao = () => {
  // 1. Pega o nome do usuário que está logado (salvo no momento do Login)
  const nomeUsuarioLogado = localStorage.getItem("usuarioNome") || "Usuário";
  
  // 2. Estados para guardar a pontuação e controlar o carregamento
  const [pontos, setPontos] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // 3. Busca os dados reais no Backend assim que o componente carrega
  useEffect(() => {
    fetch("http://localhost:8080/ranking")
      .then((response) => response.json())
      .then((dadosDoRanking) => {
        // Procura na lista do ranking se existe alguém com o nome do nosso usuário logado
        const usuarioEncontrado = dadosDoRanking.find(
          (jogador) => jogador.nome === nomeUsuarioLogado
        );
        
        // Se encontrar o usuário, atualiza os pontos. Se não, continua 0.
        if (usuarioEncontrado) {
          setPontos(usuarioEncontrado.pontuacao);
        }
        
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar a pontuação:", error);
        setCarregando(false);
      });
  }, [nomeUsuarioLogado]);

  return (
    <div className="pontuacao-container">
      <h3 className="pontuacao-titulo">SUA PONTUAÇÃO</h3>

      <div className="pontuacao-card">
        {/* Mantivemos a imagem de avatar padrão, mas você pode alterar depois */}
        <img 
          src="https://i.pravatar.cc/50?img=2" 
          alt="Foto do usuário" 
          className="pontuacao-foto" 
        />
        
        <div className="pontuacao-info">
          {/* Exibe o nome dinâmico vindo do localStorage */}
          <p className="pontuacao-nome">{nomeUsuarioLogado}</p>
          
          {/* Exibe os pontos dinâmicos vindos do Java */}
          <p className="pontuacao-pontos">
            {carregando ? "Carregando..." : `${pontos.toLocaleString()} Pontos`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pontuacao;