import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// 👇 1. Adicionamos a importação do apiFetch
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

  // Apanhamos as respostas e a categoria que vieram do QuizPerguntas
  const respostasDoQuiz = location.state?.respostas || [];
  const categoriaQuiz = location.state?.categoria || "seguranca";

  useEffect(() => {
    if (respostasDoQuiz.length === 0) {
      setCarregando(false);
      return;
    }

    // 1. Recuperar o e-mail do utilizador que foi guardado no Login
    const emailDoUsuario = localStorage.getItem("usuarioEmail");

    // 👇 2. Trocamos "fetch" por "apiFetch" e removemos o bloco de headers (o api.js já faz isso)
    apiFetch(`/quiz/responder?categoria=${categoriaQuiz}`, {
      method: "POST",
      // Adicionamos o emailUsuario ao corpo da requisição (body) para o Java o conseguir identificar
      body: JSON.stringify({
        respostas: respostasDoQuiz,
        emailUsuario: emailDoUsuario,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        setPontuacao(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao calcular a pontuação:", err);
        setCarregando(false);
      });
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