// src/pages/Alerta/Alerta.jsx

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// 1. Importação essencial para conectar com o Backend no Render
import { apiFetch } from "../../services/api"; 
import CardLaranja from "../../componentes/CardLaranja";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import alerta from "./assets/alerta.png";
import "./styles.css";

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 2. Buscamos os dados do Backend
  useEffect(() => {
    const carregarAlertas = async () => {
      try {
        // Usamos o apiFetch que já aponta para a URL do Render
        const dados = await apiFetch("/api/alertas");
        setAlertas(dados);
      } catch (erro) {
        console.error("Erro ao buscar alertas:", erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarAlertas();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <section className="alertaNovosGolpes" aria-labelledby="alertaNovosGolpes-title">
          <h2 id="alertaNovosGolpes-title">Fique Atento!</h2>

          {carregando ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Carregando alertas...</p>
          ) : (
            <CardLaranja>
              <div className="cert-banner">
                <div className="cert-badge">
                  <img src={alerta} alt="alerta" />
                </div>
              </div>

              {alertas.length > 0 ? (
                alertas.map((item) => (
                  <Link
                    key={item.id}
                    to={`/alertas/${item.id}`} // Certifique-se que a rota no seu App.jsx é /alertas/:id
                    className="alerta-container"
                  >
                    <p className="alerta-texto">{item.titulo}</p>
                  </Link>
                ))
              ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>Nenhum alerta disponível no momento.</p>
              )}
            </CardLaranja>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}