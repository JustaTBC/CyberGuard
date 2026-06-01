import { Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import YouTube from "react-youtube"; 
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import DeviceMockup from "../../layout/DeviceMockup";
import { apiFetch } from "../../services/api"; 
import "./styles.css";

export default function VideoAula() {
  const { id } = useParams();
  const { state } = useLocation();
  const titulo = state?.titulo ?? "Título do vídeo";
  const desc = state?.desc ?? "Descrição do vídeo";

  const [aulaConcluida, setAulaConcluida] = useState(false);

  const handleVideoTerminou = async () => {
    setAulaConcluida(true);

    const email = localStorage.getItem("usuarioEmail");

    if (email) {
      try {
        // Usamos o apiFetch que já trata a URL do Render e o JSON automaticamente
        await apiFetch("/api/progresso/concluir", {
          method: "POST",
          body: JSON.stringify({
            emailUsuario: email,
            videoId: id,
          }),
        });
        console.log("Progresso salvo no banco com sucesso!");
      } catch (erro) {
        console.error("Erro ao salvar progresso:", erro);
      }
    }
  };

  const opcoesPlayer = {
    height: "100%",
    width: "100%",
    host: "https://www.youtube-nocookie.com", 
    playerVars: {
      autoplay: 1,
      rel: 0,
      origin: window.location.origin, 
    },
  };

  return (
    <DeviceMockup>
      <div className="app-shell">
        <Header />
        <div className="app-content">
          <section className="video" aria-labelledby="video-title">
            <Link to="/aprenda" className="back" aria-label="Voltar">
              ← Voltar
            </Link>

            <div className="video-card">
              <div className="player-wrap">
                <YouTube
                  videoId={id}
                  opts={opcoesPlayer}
                  onEnd={handleVideoTerminou}
                  className="youtube-container"
                />
              </div>

              <h2 id="video-title">{titulo}</h2>
              <p className="video-desc">{desc}</p>

              {aulaConcluida && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  ✅ Aula concluída com sucesso!
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </DeviceMockup>
  );
}