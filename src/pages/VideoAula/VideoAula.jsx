import { Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import YouTube from "react-youtube"; // 1. Importamos o player inteligente
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import DeviceMockup from "../../layout/DeviceMockup";
import "./styles.css";

export default function VideoAula() {
  const { id } = useParams();
  const { state } = useLocation();
  const titulo = state?.titulo ?? "Título do vídeo";
  const desc = state?.desc ?? "Descrição do vídeo";

  // Estado para controlar se o usuário já terminou o vídeo
  const [aulaConcluida, setAulaConcluida] = useState(false);

  // 2. Esta função é disparada SOZINHA pelo YouTube quando o vídeo acaba!
  const handleVideoTerminou = () => {
    setAulaConcluida(true);

    // Pega o email do usuário logado
    const email = localStorage.getItem("usuarioEmail");

    if (email) {
      // 3. Avisa o Java que esse usuário terminou esse vídeo específico
      fetch("/api/progresso/concluir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailUsuario: email,
          videoId: id,
        }),
      })
        .then((resposta) => console.log("Progresso salvo no banco!"))
        .catch((erro) => console.error("Erro ao salvar progresso", erro));
    }
  };

  // Configurações do player (opcional: autoplay)
  const opcoesPlayer = {
    height: "100%",
    width: "100%",
    host: "https://www.youtube-nocookie.com", // 1. Restaura o modo sem cookies que você usava
    playerVars: {
      autoplay: 1,
      rel: 0,
      origin: window.location.origin, // 2. AVISA O YOUTUBE DE ONDE ESTAMOS ACESSANDO
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
                {/* 4. Trocamos o <iframe> por <YouTube> */}
                <YouTube
                  videoId={id}
                  opts={opcoesPlayer}
                  onEnd={handleVideoTerminou}
                  className="youtube-container"
                />
              </div>

              <h2 id="video-title">{titulo}</h2>
              <p className="video-desc">{desc}</p>

              {/* Feedback visual para o usuário saber que completou */}
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
