import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; // A nossa função mágica
import "./styles.css";

// Importe as imagens que você já usa no seu perfil (ajuste os caminhos se necessário)
import iconePerfil from "../../componentes/Footer/assets/perfil.svg"; 

export default function Perfil() {
  const navigate = useNavigate();
  
  // Estados para guardar os dados vindos do banco de dados
  const [usuario, setUsuario] = useState({
    nome: "Carregando...",
    email: "",
    pontuacao: 0
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Pegamos o email que foi salvo no login para buscar os dados completos
    const emailStorage = localStorage.getItem("usuarioEmail");

    if (!emailStorage) {
      // Se não tem email, o usuário não está logado. Manda pro login.
      navigate("/login");
      return;
    }

    const carregarDadosDoPerfil = async () => {
      try {
        // Faz a requisição ao backend buscando o usuário pelo email
        // Ajuste esta rota "/usuarios/buscar" para a rota correta do seu Spring Boot
        const response = await apiFetch(`/usuarios/buscar?email=${emailStorage}`, {
          method: "GET",
        });

        if (response.ok) {
          const dados = await response.json();
          setUsuario({
            nome: dados.nome,
            email: dados.email,
            pontuacao: dados.pontuacao || 0
          });
        } else {
          console.error("Erro ao carregar os dados do perfil");
        }
      } catch (error) {
        console.error("Falha na conexão com a API:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosDoPerfil();
  }, [navigate]);

  const handleSair = () => {
    // Limpa os dados do navegador e desloga
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioId");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content perfil-content">
        
        <div className="perfil-header">
          <div className="perfil-avatar">
            <img src={iconePerfil} alt="Avatar do usuário" />
          </div>
          
          {carregando ? (
            <p>A carregar perfil...</p>
          ) : (
            <div className="perfil-info">
              <h2>{usuario.nome}</h2>
              <p>{usuario.email}</p>
              <div className="perfil-pontuacao">
                <span>🏆 Pontos: <strong>{usuario.pontuacao}</strong></span>
              </div>
            </div>
          )}
        </div>

        <div className="perfil-opcoes">
          <Link to="/meuscertificados" className="btn-perfil-opcao">
            📜 Meus Certificados
          </Link>
          
          <Link to="/ranking" className="btn-perfil-opcao">
            📊 Ver Ranking
          </Link>
          
          <button onClick={handleSair} className="btn-sair">
            Sair da Conta
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}