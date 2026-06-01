import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { apiFetch } from "../../services/api"; 
import "./styles.css";
import iconePerfil from "../../componentes/Footer/assets/perfil.svg"; 

export default function Perfil() {
  const navigate = useNavigate();
  
  const [usuario, setUsuario] = useState({
    nome: "Carregando...",
    email: "",
    pontuacao: 0
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const emailStorage = localStorage.getItem("usuarioEmail");

    if (!emailStorage) {
      navigate("/login");
      return;
    }

    const carregarDadosDoPerfil = async () => {
      try {
        // O apiFetch já resolve a URL e devolve os dados prontos
        const dados = await apiFetch(`/usuarios/buscar?email=${emailStorage}`);
        
        setUsuario({
          nome: dados.nome,
          email: dados.email,
          pontuacao: dados.pontuacao || 0
        });
      } catch (error) {
        console.error("Falha ao carregar perfil:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosDoPerfil();
  }, [navigate]);

  const handleSair = () => {
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