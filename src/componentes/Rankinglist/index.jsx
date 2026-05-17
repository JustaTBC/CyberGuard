import React, { useState, useEffect } from "react";
import "./styles.css";

const medalhas = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function Rankinglists() {
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Busca os dados do seu backend Java
    fetch("http://localhost:8080/ranking")
      .then((response) => response.json())
      .then((data) => {
        const jogadoresFormatados = data.map((item, index) => ({
          id: index + 1,
          nome: item.nome,
          pontos: item.pontuacao,
          foto: `https://ui-avatars.com/api/?name=${item.nome}&background=random`,
          posicao: index + 1,
        }));

        // Se o banco estiver vazio, ele cria 6 posições em branco com o traço "—"
        while (jogadoresFormatados.length < 6) {
          const nextId = jogadoresFormatados.length + 1;
          jogadoresFormatados.push({
            id: nextId,
            nome: "",
            pontos: "",
            foto: "",
            posicao: nextId,
          });
        }

        setJogadores(jogadoresFormatados);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar o ranking:", error);
        setCarregando(false);
      });
  }, []); 

  // Exibe essa mensagem enquanto o React conversa com o Java
  if (carregando) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem", color: "var(--cor-secundaria)" }}>Carregando Top 10...</h2>;
  }

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking</h1>

      <div className="ranking-list">
        {jogadores.map((jogador) => (
          <div key={jogador.id} className="ranking-card">
            <div className="jogador-esquerda">
              {jogador.foto ? (
                <img
                  src={jogador.foto}
                  alt={jogador.nome || "Jogador"}
                  className="avatar"
                />
              ) : (
                <div className="avatar avatar-placeholder" />
              )}

              <div className="jogador-info">
                {/* Se não houver nome, mostra o traço "—" */}
                <p className="jogador-nome">{jogador.nome || "—"}</p>
                <p className="jogador-pontos">
                  {jogador.pontos !== "" ? `${jogador.pontos.toLocaleString()} Pontos` : ""}
                </p>
              </div>
            </div>

            <div className="medalha">
              {medalhas[jogador.posicao] || `#${jogador.posicao}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}