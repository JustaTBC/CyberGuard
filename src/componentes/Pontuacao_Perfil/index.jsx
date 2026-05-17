import React, { useState, useEffect } from "react";
import "./styles.css";

const Pontuacao = () => {
  // Pegamos o Nome e o E-mail de quem fez o login
  const nomeUsuarioLogado = localStorage.getItem("usuarioNome") || "Usuário";
  const emailUsuarioLogado = localStorage.getItem("usuarioEmail"); 
  
  const [pontos, setPontos] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Se por acaso não tiver ninguém logado, nem tenta buscar
    if (!emailUsuarioLogado) {
      setCarregando(false);
      return;
    }

    // Chama a nossa ROTA NOVA do Java passando o e-mail na URL
    fetch(`http://localhost:8080/ranking/pontuacao?email=${emailUsuarioLogado}`)
      .then((response) => response.json())
      .then((pontuacaoExata) => {
        setPontos(pontuacaoExata); // Salva a pontuação exata na tela
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar a pontuação do usuário:", error);
        setCarregando(false);
      });
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