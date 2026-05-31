import { useParams, useLocation } from "react-router-dom";
import CardLaranja from "../../componentes/CardLaranja";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import logo from "./assets/certificLogo.svg";
import './styles.css'

export default function Certificado(){
  const { id } = useParams();
  const { state } = useLocation();

  // Recebe o nome enviado pela lista de certificados
  const titulo = state?.titulo ?? "Certificado";
  
  // Tenta buscar o nome verdadeiro do localStorage (ou mete um nome padrão se não encontrar)
  const nomeAluno = localStorage.getItem("nomeUsuario") || "Estudante CyberGuard";

  return (
      <div className="app-shell">
          <Header />
          <div className="app-content">
              <section className="certificado" aria-labelledby="certificado-title">
                  <h2 id="certificado-title">Micro-Certificado</h2>
              <CardLaranja>
                  <div className="cert-banner">
                      <div className="cert-badge">
                      <img src={logo} alt="Certificado" />
                      </div>
                  </div>

                  <div className="nome-pill">{nomeAluno}</div>

                  <div className="texto-cert">
                      Concluiu com sucesso o módulo de <strong>{titulo}</strong>
                  </div>
                  
                  {/* O botão "OBTER CERTIFICADO" foi removido daqui! */}
                  
              </CardLaranja>
          
        </section>
      </div>
      <Footer />
    </div>
  );
}