import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./styles.css";
import quizIcon from "./assets/quiz.svg";
import CardLaranja from "../../componentes/CardLaranja";

export default function QuizPerguntas() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Definição dos Estados
  const queryParams = new URLSearchParams(location.search);
  const categoria = queryParams.get("categoria") || "seguranca";

  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [respostasUsuario, setRespostasUsuario] = useState([]);

  // 2. Carregar perguntas do Backend
  useEffect(() => {
    setCarregando(true);
    fetch(`/quiz?categoria=${categoria}`)
      .then((response) => response.json())
      .then((data) => {
        setPerguntas(data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
        setCarregando(false);
      });
  }, [categoria]);

  // 3. Funções de Lógica
  const handleConfirm = () => {
    const isCorrect = selectedId === perguntas[indiceAtual].respostaCorreta;
    setFeedback(isCorrect ? "correto" : "incorreto");
    setShowModal(true);

    // Adiciona a resposta atual ao array de respostas acumuladas
    setRespostasUsuario((prev) => [...prev, selectedId]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setFeedback(null);
  };

  const handleNext = () => {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      closeModal();
    } else {
      // Envia as respostas e a categoria para o FimQuiz
      navigate("/fimquiz", {
        state: {
          respostas: respostasUsuario,
          categoria: categoria,
        },
      });
    }
  };

  // 4. Renderização Condicional (Loading)
  if (carregando) {
    return (
      <div className="loading">Carregando perguntas de {categoria}...</div>
    );
  }

  // 5. Renderização Principal
  return (
    <>
      <Header />

      <CardLaranja className="cardlaranja-espaco">
        <div className="cert-banner">
          <div className="cert-badge">
            <img src={quizIcon} alt="Quiz" />
          </div>
        </div>

        <div className="quiz-content">
          <p className="quiz-subtitle">{perguntas[indiceAtual]?.enunciado}</p>

          <div className="quiz-options">
            <button
              type="button"
              className={`quiz-btn-option ${selectedId === "sim" ? "is-selected" : ""}`}
              onClick={() => setSelectedId("sim")}
            >
              <span className="quiz-num">A</span>
              <span className="quiz-texto">SIM</span>
            </button>

            <button
              type="button"
              className={`quiz-btn-option ${selectedId === "nao" ? "is-selected" : ""}`}
              onClick={() => setSelectedId("nao")}
            >
              <span className="quiz-num">B</span>
              <span className="quiz-texto">NÃO</span>
            </button>
          </div>

          <button
            type="button"
            className="btn-cadastrar"
            onClick={handleConfirm}
            disabled={!selectedId}
          >
            Conferir resposta
          </button>
        </div>
      </CardLaranja>

      {showModal && (
        <div className="quiz-modal-overlay">
          <div
            className={`quiz-modal ${feedback === "correto" ? "correct" : "incorrect"}`}
          >
            <div className="modal-icon">
              {feedback === "correto" ? "✓" : "✕"}
            </div>

            <h2 className="modal-title">
              {feedback === "correto"
                ? "RESPOSTA CORRETA"
                : "RESPOSTA INCORRETA"}
            </h2>

            <div className="modal-body">
              <strong>Explicação:</strong>
              <p>{perguntas[indiceAtual]?.explicacao}</p>
            </div>

            {feedback === "incorreto" ? (
              <button
                type="button"
                className="modal-next modal-next--danger"
                onClick={closeModal}
              >
                Tentar novamente
              </button>
            ) : (
              <button
                type="button"
                className="modal-next modal-next--primary"
                onClick={handleNext}
              >
                {indiceAtual === perguntas.length - 1 ? "Finalizar" : "Próxima"}
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
