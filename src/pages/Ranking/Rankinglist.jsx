import React, { useState, useEffect } from "react";
// Assumindo que o styles.css está na mesma pasta, ou ajuste o caminho conforme sua estrutura
import "./styles.css"; 

export default function Rankinglists() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Faz a chamada para a API do backend que criamos
    fetch("http://localhost:8080/ranking")
      .then((response) => response.json())
      .then((data) => setRankings(data))
      .catch((error) => console.error("Erro ao buscar o ranking:", error));
  }, []);

  return (
    <div className="ranking">
      
      {/* Selo/Badge que já estava no seu CSS */}
      <div className="cert-banner">
        <div className="cert-badge">
          {/* Coloque aqui o caminho para a imagem/ícone que você usa no selo */}
          <img src="/trofeu-icone.png" alt="Troféu de Ranking" />
        </div>
      </div>

      <h2>Top 10 Jogadores</h2>

      {/* Lista de Ranking */}
      <div className="ranking-list-container">
        {rankings.length === 0 ? (
          <p>Carregando ranking...</p>
        ) : (
          <ul className="ranking-list">
            {rankings.map((jogador, index) => (
              <li key={index} className="ranking-item">
                <div className="ranking-info">
                  <span className="ranking-position">{index + 1}º</span>
                  <span className="ranking-name">{jogador.nome}</span>
                </div>
                <span className="ranking-score">{jogador.pontuacao} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}