import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; // Importação adicionada
import "./styles.css";
import CardLaranja from "../../componentes/CardLaranja";
import linkIcon from "./assets/link.png";

export default function DetectorLink() {
  const navigate = useNavigate();
  const [urlDigitada, setUrlDigitada] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleAnalisarLink = async (e) => {
    e.preventDefault(); 

    if (!urlDigitada.trim()) {
      alert("Por favor, digite um link para analisar!");
      return;
    }

    setCarregando(true);

    try {
      // Usando o apiFetch no lugar do fetch padrão
      const response = await apiFetch("/links/verificar", {
        method: "POST",
        body: JSON.stringify({ url: urlDigitada }),
      });

      if (response.ok) {
        const dados = await response.json();

        if (dados.seguro) {
          navigate("/DetectorLinkverdadeiro");
        } else {
          navigate("/DetectorLinkfalso");
        }
      } else {
        alert("Ocorreu um erro no servidor ao analisar o link.");
      }
    } catch (error) {
      console.error("Erro na comunicação:", error);
      alert("Falha de conexão com o backend.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <section
          className="DetectordeQRcodefalso"
          aria-labelledby="DetectordeQRcodefalso-title"
        >
          <div className="titulo-link">
            <h2 id="DetectordeQRcodefalso-title">Detector de Links Falsos</h2>
          </div>

          <Link to="/CentraldeAnalises" className="back" aria-label="Voltar">
            ← Voltar
          </Link>

          <CardLaranja>
            <img className="link" src={linkIcon} alt="link" />

            <input
              type="text"
              className="input-link"
              placeholder="Digite seu link aqui"
              value={urlDigitada}
              onChange={(e) => setUrlDigitada(e.target.value)}
            />

            <a
              href="#"
              className="link-container"
              onClick={handleAnalisarLink}
              style={{
                pointerEvents: carregando ? "none" : "auto", 
                opacity: carregando ? 0.7 : 1, 
              }}
            >
              {carregando ? "A ANALISAR..." : "ANALISAR LINK"}
            </a>
          </CardLaranja>
        </section>
      </div>
      <Footer />
    </div>
  );
}