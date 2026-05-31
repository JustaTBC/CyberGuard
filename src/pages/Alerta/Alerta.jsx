// src/paginas/Alertas/index.jsx

import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // 1. Importamos os hooks do React
import CardLaranja from "../../componentes/CardLaranja";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import alerta from "./assets/alerta.png";
import "./styles.css";

// 2. Apagamos a linha: import { ALERTAS } from "./alertasData";

export default function Alertas() {
  // 3. Criamos uma "memória" vazia para guardar os alertas que virão do Java
  const [alertas, setAlertas] = useState([]);

  // 4. Pedimos ao Java para nos dar os dados assim que a tela abre
  useEffect(() => {
    fetch("/api/alertas")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setAlertas(dados); // Salvamos os dados do PostgreSQL no React
      })
      .catch((erro) => console.error("Erro ao buscar alertas:", erro));
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <section
          className="alertaNovosGolpes"
          aria-labelledby="alertaNovosGolpes-title"
        >
          <h2 id="alertaNovosGolpes-title">Fique Atento!</h2>

          <CardLaranja>
            <div className="cert-banner">
              <div className="cert-badge">
                <img src={alerta} alt="alerta" />
              </div>
            </div>

            {/* 5. Agora lemos os dados da nossa variável de estado "alertas" */}
            {alertas.map((item) => (
              <Link
                key={item.id}
                to={`/alertas/${item.id}`}
                className="alerta-container"
              >
                <p className="alerta-texto">{item.titulo}</p>
              </Link>
            ))}
          </CardLaranja>
        </section>
      </div>
      <Footer />
    </div>
  );
}
