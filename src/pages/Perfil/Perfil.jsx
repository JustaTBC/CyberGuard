import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header"; // Certifique-se de manter o Header se desejar
import { apiFetch } from "../../services/api";
import "./styles.css";
import Certificados from "../../componentes/Certificado_Perfil";
import Pontuacao from "../../componentes/Pontuacao_Perfil";

export default function Perfil() {
  const navigate = useNavigate();

  // Estados de dados do usuário
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    username: ""
  });
  const [carregando, setCarregando] = useState(true);

  // 1. Busca os dados no banco ao carregar a página
  useEffect(() => {
    const emailStorage = localStorage.getItem("usuarioEmail");

    if (!emailStorage) {
      navigate("/login");
      return;
    }

    const carregarDadosDoPerfil = async () => {
      try {
        const dados = await apiFetch(`/usuarios/buscar?email=${emailStorage}`);
        setUsuario({
          nome: dados.nome || "",
          email: dados.email || "",
          username: dados.nome ? dados.nome.split(" ")[0] : "user"
        });
      } catch (error) {
        console.error("Falha ao carregar perfil:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosDoPerfil();
  }, [navigate]);

  // 2. Função para sair da conta
  const handleLogout = () => {
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioId");
    navigate("/login");
  };

  if (carregando) return <div className="app-shell">Carregando perfil...</div>;

  return (
    <>
      <Header />
      <div className="perfil-card">
        <div className="foto-container">
          <img
            src="https://i.pravatar.cc/50?img=2" 
            alt="Foto de perfil"
            className="foto-perfil"
          />
          <label htmlFor="trocar-foto" className="trocar-foto">
            Alterar foto
          </label>
          <input type="file" id="trocar-foto" accept="image/*" />
        </div>  
        
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="nome">Nome completo</label>
          <input 
            type="text" 
            id="nome" 
            value={usuario.nome} 
            readOnly // Deixamos apenas leitura se o backend não permitir edição ainda
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={usuario.email}
            disabled 
          />

          <label htmlFor="usuario">Nome de Usuário</label>
          <input 
            type="text" 
            id="usuario" 
            value={usuario.username}
            readOnly
          />

          <label htmlFor="senha">Senha Atual</label>
          <input 
            type="password" 
            id="senha" 
            placeholder="********" 
            disabled 
          />

          <div className="perfil-links">
            <Link to="/cadastro" className="link-senha">
              Alterar senha
            </Link>

            <Link to="/login" className="link-logout" onClick={handleLogout}>
              Sair da conta
            </Link>
          </div>
        </form> 
      </div>
      
      <Certificados />
      <Pontuacao />
      <Footer />
    </>
  );
}