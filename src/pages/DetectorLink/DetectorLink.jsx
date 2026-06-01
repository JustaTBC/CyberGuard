import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; 
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
      // 1. Chamada simplificada: O apiFetch já retorna os dados (JSON)
      // e lança erro automaticamente se o status não for 2xx.
      const dados = await apiFetch("/links/verificar", {
        method: "POST",
        body: JSON.stringify({ url: urlDigitada }),
      });

      // 2. Navegação baseada na resposta direta
      if (dados.seguro) {
        navigate("/DetectorLinkverdadeiro");
      } else {
        navigate("/DetectorLinkfalso");
      }
      
    } catch (error) {
      console.error("Erro na comunicação:", error);
      alert("Falha ao analisar o link: " + error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <section className="DetectordeQRcodefalso" aria-labelledby="DetectordeQRcodefalso-title">
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

            <button
              className="link-container"
              onClick={handleAnalisarLink}
              disabled={carregando}
              style={{
                cursor: carregando ? "not-allowed" : "pointer",
                opacity: carregando ? 0.7 : 1,
                border: "none",
                background: "none",
                padding: 0
              }}
            >
              {carregando ? "A ANALISAR..." : "ANALISAR LINK"}
            </button>
          </CardLaranja>
        </section>
      </div>
      <Footer />
    </div>
  );
}