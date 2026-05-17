import React, { useState, useEffect } from "react";
import "./styles.css";

// Mantemos o teu mapeamento de medalhas
const medalhas = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

const Rankinglists = () => {

  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
   
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
      })
      .catch((error) => console.error("Erro ao buscar o ranking:", error));
  }, []); 
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
                {/* Se não houver nome, mostra o teu traço "—" */}
                <p className="jogador-nome">{jogador.nome || "—"}</p>
                <p className="jogador-pontos">
                  {jogador.pontos !== "" ? `${jogador.pontos} Pontos` : ""}
                </p>
              </div>
            </div>

            <div className="medalha">
              {medalhas[jogador.posicao] || ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rankinglists;