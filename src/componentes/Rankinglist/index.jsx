import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api"; 
import "./styles.css";

export default function Rankinglist() {
  const [ranking, setRanking] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarRanking = async () => {
      try {
        // O apiFetch já devolve os dados (JSON) prontos para uso
        const dados = await apiFetch("/ranking"); 
        setRanking(dados);
      } catch (error) {
        console.error("Falha na comunicação com a API:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarRanking();
  }, []);

  if (carregando) return <p>A carregar ranking...</p>;

  return (
    <div className="ranking-container">
      <h2>Ranking Global</h2>
      <ul className="ranking-list">
        {ranking.map((usuario, index) => (
          <li key={usuario.id} className="ranking-item">
            <span className="ranking-posicao">{index + 1}º</span>
            <span className="ranking-nome">{usuario.nome}</span>
            <span className="ranking-pontos">{usuario.pontuacao} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}