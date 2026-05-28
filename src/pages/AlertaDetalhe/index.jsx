// src/pages/AlertaDetalhe/index.jsx

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // 1. Adicionamos os hooks
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import CardLaranja from "../../componentes/CardLaranja";
// Renomeei a imagem para alertaIcone para não dar conflito com os dados
import alertaIcone from "../Alerta/assets/alerta.png"; 
import "./styles.css";

export default function AlertaDetalhe() {
  const { id } = useParams();
  
  // 2. Criamos os estados para guardar o alerta vindo do backend e o status de carregamento
  const [alertaSelecionado, setAlertaSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 3. Buscamos o alerta específico no backend toda vez que a página abrir
  useEffect(() => {
    // Certifique-se de que seu backend Java possui uma rota GET /api/alertas/{id}
    fetch(`http://localhost:8080/api/alertas/${id}`)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Alerta não encontrado");
        }
        return resposta.json();
      })
      .then((dados) => {
        setAlertaSelecionado(dados); // Salvamos os dados do banco
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar o alerta:", erro);
        setCarregando(false);
      });
  }, [id]);

  // Se ainda estiver carregando a requisição, exibe um feedback visual
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

  // Se o backend não achar o alerta pelo ID, exibe a tela de não encontrado
  if (!alertaSelecionado) {
    return (
      <div className="app-shell">
        <Header />
        <div className="app-content">
        <div className="alerta-back-wrapper">
        <Link to="/alerta" className="alerta-back-top">
            ← Voltar
        </Link>
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
        {/* botão voltar no topo */}
        <div className="alerta-back-wrapper">
        <Link to="/alerta" className="alerta-back-top">
            ← Voltar
        </Link>
        </div>

        <section
          className="alerta-detalhe"
          aria-label={alertaSelecionado.titulo}
        >
          <CardLaranja>
            <div className="alerta-detalhe-conteudo">
              {/* ícone em quadrado branco */}
              <div className="alerta-detalhe-icone-wrapper">
                <div className="alerta-detalhe-icone-quadro">
                  <img src={alertaIcone} alt="ícone de alerta" />
                </div>
              </div>

              {/* título centralizado */}
              <h2 className="alerta-detalhe-titulo">
                {alertaSelecionado.titulo}
              </h2>

              {/* texto em fundo branco com letra azul */}
              <div className="alerta-detalhe-box-texto">
                <p className="alerta-detalhe-texto">
                  {/* Substitua 'texto' se o nome da coluna no seu backend for diferente, ex: descricao */}
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