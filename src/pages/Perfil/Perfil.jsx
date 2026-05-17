import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import "./styles.css";
import Certificados from "../../componentes/Certificado_Perfil";
import Pontuacao from "../../componentes/Pontuacao_Perfil";

export default function Perfil() {
  const navigate = useNavigate();

  // 1. Buscamos os dados verdadeiros armazenados no localStorage
  const [nome, setNome] = useState(localStorage.getItem("usuarioNome") || "Usuário");
  const [email, setEmail] = useState(localStorage.getItem("usuarioEmail") || "usuario@email.com");
  
  // Para o nome de usuário, pegamos apenas o primeiro nome como padrão
  const [usuario, setUsuario] = useState(
    localStorage.getItem("usuarioNome") ? localStorage.getItem("usuarioNome").split(" ")[0] : "user"
  );

  // 2. Função para limpar os dados ao deslogar da conta
  const handleLogout = () => {
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    // O React Router guiará o usuário de volta para o login público
  };

  return (
    <>
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
            name="nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled // Deixamos desabilitado para o usuário não alterar o e-mail chave da conta
          />

          <label htmlFor="usuario">Nome de Usuário</label>
          <input 
            type="text" 
            id="usuario" 
            name="usuario" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <label htmlFor="senha">Senha Atual</label>
          <input 
            type="password" 
            id="senha" 
            name="senha" 
            placeholder="********" 
            disabled 
          />

          <div className="perfil-links">
            <Link to="/cadastro" className="link-senha">
              Alterar senha
            </Link>

            {/* Injetamos a limpeza de dados antes de redirecionar para o login */}
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