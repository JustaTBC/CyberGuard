import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api"; 
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import CardLaranja from "../../componentes/CardLaranja";
import alertaIcone from "../Alerta/assets/alerta.png";
import "./styles.css";

export default function AlertaDetalhe() {
  const { id } = useParams();
  const [alertaSelecionado, setAlertaSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Usamos uma função assíncrona para buscar os dados
    const carregarDetalhes = async () => {
      try {
        setCarregando(true);
        // O apiFetch já faz o JSON automaticamente e trata a URL do Render
        const dados = await apiFetch(`/api/alertas/${id}`);
        setAlertaSelecionado(dados);
      } catch (erro) {
        console.error("Erro ao buscar o alerta:", erro);
        setAlertaSelecionado(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarDetalhes();
  }, [id]);

  if (carregando) {
    return (
      <div className="app-shell">
        <Header />
        <div className="app-content" style={{ textAlign: "center", padding: "20px" }}>
          <p>Carregando alerta...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!alertaSelecionado) {
    return (
      <div className="app-shell">
        <Header />
        <div className="app-content">
          <div className="alerta-back-wrapper">
            <Link to="/alerta" className="alerta-back-top">← Voltar</Link>
          </div>
          <section className="alerta-detalhe">
            <CardLaranja>
              <div className="alerta-detalhe-conteudo">
                <h2 className="alerta-detalhe-titulo">Alerta não encontrado</h2>
              </div>
            </CardLaranja>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <div className="alerta-back-wrapper">
          <Link to="/alerta" className="alerta-back-top">← Voltar</Link>
        </div>

        <section className="alerta-detalhe" aria-label={alertaSelecionado.titulo}>
          <CardLaranja>
            <div className="alerta-detalhe-conteudo">
              <div className="alerta-detalhe-icone-wrapper">
                <div className="alerta-detalhe-icone-quadro">
                  <img src={alertaIcone} alt="ícone de alerta" />
                </div>
              </div>

              <h2 className="alerta-detalhe-titulo">{alertaSelecionado.titulo}</h2>

              <div className="alerta-detalhe-box-texto">
                <p className="alerta-detalhe-texto">
                  {alertaSelecionado.texto || alertaSelecionado.descricao}
                </p>
              </div>
            </div>
          </CardLaranja>
        </section>
      </div>
      <Footer />
    </div>
  );
}