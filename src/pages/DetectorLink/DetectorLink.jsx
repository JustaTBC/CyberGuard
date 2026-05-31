import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./styles.css";
import CardLaranja from "../../componentes/CardLaranja";
import linkIcon from "./assets/link.png"; // Alterado o nome apenas para não confundir com o <Link> do React

export default function DetectorLink() {
  const navigate = useNavigate();
  const [urlDigitada, setUrlDigitada] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleAnalisarLink = async (e) => {
    e.preventDefault(); // Evita que a página salte para o topo ao clicar no link

    if (!urlDigitada.trim()) {
      alert("Por favor, digite um link para analisar!");
      return;
    }

    setCarregando(true);

    try {
      // Faz o POST para a tua API em Java
      const response = await fetch("/links/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlDigitada }),
      });

      if (response.ok) {
        const dados = await response.json();

        // Verifica a resposta de segurança do backend
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

            {/* O "Botão" disfarçado de Link para manter 100% a estética do teu CSS */}
            <a
              href="#"
              className="link-container"
              onClick={handleAnalisarLink}
              style={{
                pointerEvents: carregando ? "none" : "auto", // Desativa o clique se estiver a carregar
                opacity: carregando ? 0.7 : 1, // Dá um efeito visual de carregamento
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
