import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { apiFetch } from "../../services/api";

import iconeContorno from "./assets/iconeContorno.svg";
import iconePesquisa from "./assets/iconePesquisa.svg";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./styles.css";

export default function FimQuiz() {
  const location = useLocation();
  const [pontuacao, setPontuacao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const respostasDoQuiz = location.state?.respostas || [];
  const categoriaQuiz = location.state?.categoria || "seguranca";

  useEffect(() => {
    if (respostasDoQuiz.length === 0) {
      setCarregando(false);
      return;
    }

    const emailDoUsuario = localStorage.getItem("usuarioEmail");

    const enviarRespostas = async () => {
      try {
        // O apiFetch já faz o POST e retorna o resultado (neste caso, o texto da pontuação)
        const resultado = await apiFetch(`/quiz/responder?categoria=${categoriaQuiz}`, {
          method: "POST",
          body: JSON.stringify({
            respostas: respostasDoQuiz,
            emailUsuario: emailDoUsuario,
          }),
        });

        setPontuacao(resultado);
      } catch (err) {
        console.error("Erro ao calcular a pontuação:", err);
      } finally {
        setCarregando(false);
      }
    };

    enviarRespostas();
  }, [respostasDoQuiz, categoriaQuiz]);

  return (
    <div className="app-shell">
      <Header />

      <div className="app-content-feedback">
        <div className="feedback-card">
          <div className="icone-composto-container">
            <img src={iconeContorno} alt="Contorno" className="contorn-icon" />
            <img src={iconePesquisa} alt="Pesquisa" className="pesquisa-icon" />
          </div>

          <p className="feedback-text">
            {respostasDoQuiz.length > 0
              ? "PARABÉNS, VOCÊ CONCLUIU O QUIZ!"
              : "OPS! PARECE QUE VOCÊ AINDA NÃO FEZ O QUIZ."}
          </p>

          {carregando ? (
            <p className="feedback-score">A calcular o seu resultado...</p>
          ) : (
            pontuacao && <h2 className="pontuacao-final">{pontuacao}</h2>
          )}

          <Link to="/" className="feedback-btn">
            Voltar para o ecrã inicial
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}