import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./styles.css";
import quizIcon from "./assets/quiz.svg";
import CardLaranja from "../../componentes/CardLaranja";
import { Link } from "react-router-dom";

export default function Quiz() {
    // Estes IDs podem ser usados no futuro se tiveres vários quizzes no Java
    const quizzes = [
        { id: 1, path: "/quizperguntas?categoria=seguranca", label: "1", texto: "Segurança e senhas"},
        { id: 2, path: "/quizperguntas?categoria=links", label: "2", texto: "Links desconhecidos"},
        { id: 3, path: "/quizperguntas?categoria=pagamentos", label: "3", texto: "Pagamentos online"}
    ];

  return (
    <>
      <Header />

      <CardLaranja className="cardlaranja-espaco">
        <div className="cert-banner">
          <div className="cert-badge">
            <img src={quizIcon} alt="Quiz" />
          </div>
        </div>

        <p className="quiz-subtitle">
          SELECIONE O QUIZ ABAIXO PARA <br /> COMEÇARMOS:
        </p>

        <div className="quiz-options">
          {quizzes.map((quiz) => (
            <Link 
              key={quiz.id} 
              to={quiz.path} 
              className="quiz-btn"
              // DICA: Podes passar o ID para a próxima tela se quiseres filtrar perguntas
              state={{ quizId: quiz.id }} 
            >
              <span className="quiz-num">{quiz.label}</span>
              <span className="quiz-texto">{quiz.texto}</span>
            </Link>
          ))}
        </div>
      </CardLaranja>

      <Footer />
    </>
  );
}