import React, { useState, useEffect } from "react";
import "./styles.css";
import { apiFetch } from "../../services/api";

const medalhas = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function Rankinglist() {
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarRanking = async () => {
      try {
        const data = await apiFetch("/ranking");
        
        // Formata os dados recebidos do backend
        const jogadoresFormatados = data.map((item, index) => ({
          id: item.id || index, // Garante um ID único
          nome: item.nome,
          pontos: item.pontuacao,
          foto: `https://ui-avatars.com/api/?name=${item.nome}&background=random`,
          posicao: index + 1,
        }));

        // Preenche com placeholders se tiver menos de 6 jogadores
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
      } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarRanking();
  }, []);

  if (carregando) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Carregando Top 10...</h2>;
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