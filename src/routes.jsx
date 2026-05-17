import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import DeviceMockup from "./layout/DeviceMockup.jsx";
import Aprenda from "./pages/Aprenda/Aprenda.jsx";
import VideoAula from "./pages/VideoAula/VideoAula.jsx";
import MeusCertificados from "./pages/MeusCertificados/MeusCertificados.jsx";
import Certificado from "./pages/Certificado/Certificado.jsx";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import QuizPerguntas from "./pages/QuizPerguntas/QuizPerguntas.jsx";
import BemVindoCom from "./pages/BemVindoCom/BemVindoCom.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Alerta from "./pages/Alerta/Alerta.jsx";
import Ranking from "./pages/Ranking/Ranking.jsx";
import FaleConosco from "./pages/FaleConosco/FaleConosco.jsx";
import MissoesDiarias from "./pages/MissoesDiarias/MissoesDiarias.jsx";
import DetectorQrcodes from "./pages/DetectorQrcode/DetectorQrCode.jsx";
import DetectorQRfalso from "./pages/DetectorQRfalso/DetectorQRfalso.jsx";
import DetectorQRverdadeiro from "./pages/DetectorQRverdadeiro/DetectorQRverdadeiro.jsx";
import RelatarGolpe from "./pages/RelatarGolpe/RelatarGolpe.jsx";
import DenunciaEnviada from "./pages/DenunciaEnviada/DenunciaEnviada.jsx";
import FimQuiz from "./pages/FimQuiz/FimQuiz.jsx";
import CentraldeAnalise from "./pages/CentraldeAnalises/CentraldeAnalises.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import Comunidade from "./pages/Comunidade/comunidade.jsx";
import DetectorLink from "./pages/DetectorLink/DetectorLink.jsx";
import DetectorLinkfalso from "./pages/DetectorLinkfalso/DetectorLinkfalso.jsx";
import DetectorLinkverdadeiro from "./pages/DetectorLinkverdadeiro/DetectorLinkverdadeiro.jsx";
import Login from "./pages/Login/Login.jsx";
import DetectorBoletos from "./pages/DetectorBoletos/DetectorBoletos.jsx";
import DetectorBoletosVerdadeiros from "./pages/DetectorBoletosVerdadeiros/DetectorBoletosVerdadeiros.jsx";
import DetectorBoletosFalso from "./pages/DetectorBoletosFalso/DetectorBoletosFalso.jsx";
import NovaPostagem from "./pages/NovaPostagem/NovaPostagem.jsx";
import PageTransition from "./componentes/PageTransition/PageTransition.jsx";
import AlertaDetalhe from "./pages/AlertaDetalhe";

// === 1. CRIAMOS A FUNÇÃO DE PROTEÇÃO DE ROTA ===
function RotaProtegida({ children }) {
  const usuarioLogado = localStorage.getItem("usuarioEmail");

  // Se não houver o e-mail do usuário no localStorage, redireciona para o login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver logado, permite acessar a tela normalmente
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  const fromFooter = location.state?.fromFooter === true;

  return (
    <DeviceMockup>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* === ROTAS PÚBLICAS (NÃO PRECISAM DE LOGIN) === */}
          <Route
            path="/login"
            element={
              <PageTransition fromFooter={fromFooter}>
                <Login />
              </PageTransition>
            }
          />
          <Route
            path="/cadastro"
            element={
              <PageTransition fromFooter={fromFooter}>
                <Cadastro />
              </PageTransition>
            }
          />

          {/* === ROTAS PROTEGIDAS (PRECISAM DE LOGIN) === */}
          <Route
            path="/"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Home />
                </PageTransition>
              </RotaProtegida>
            }
          />

          <Route
            path="/aprenda"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Aprenda />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/videoaula/:id"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <VideoAula />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/meuscertificados"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <MeusCertificados />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/certificado/:id"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Certificado />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/quiz"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Quiz />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/quizperguntas"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <QuizPerguntas />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/bemvindocom"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <BemVindoCom />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/Alerta"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Alerta />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/Ranking"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Ranking />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/faleconosco"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <FaleConosco />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/MissoesDiarias"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <MissoesDiarias />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorQrcode"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorQrcodes />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorQRfalso"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorQRfalso />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorQRverdadeiro"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorQRverdadeiro />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/relatarGolpe"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <RelatarGolpe />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DenunciaEnviada"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DenunciaEnviada />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/FimQuiz"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <FimQuiz />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/CentraldeAnalises"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <CentraldeAnalise />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/Perfil"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Perfil />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/Comunidade"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Comunidade />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorLink"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorLink />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorLinkfalso"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorLinkfalso />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorLinkverdadeiro"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorLinkverdadeiro />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorBoletos"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorBoletos />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorBoletosVerdadeiros"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorBoletosVerdadeiros />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/DetectorBoletosFalso"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <DetectorBoletosFalso />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/NovaPostagem"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <NovaPostagem />
                </PageTransition>
              </RotaProtegida>
            }
          />
          <Route
            path="/alertas/:id"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  {<AlertaDetalhe />}
                </PageTransition>
              </RotaProtegida>
            }
          />

          {/* === ROTA CORINGA === 
              Deve ficar sempre por último! Redireciona qualquer URL não encontrada para a Home */}
          <Route
            path="*"
            element={
              <RotaProtegida>
                <PageTransition fromFooter={fromFooter}>
                  <Home />
                </PageTransition>
              </RotaProtegida>
            }
          />
        </Routes>
      </AnimatePresence>
    </DeviceMockup>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default AppRoutes;