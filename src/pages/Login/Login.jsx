import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../../services/api"; 
import "./styles.css";
import logoImg from "./assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      // 1. Chamada simplificada: O apiFetch já retorna os dados do usuário (JSON)
      // ou lança uma exceção se a resposta não for 2xx.
      const usuario = await apiFetch("/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });

      // 2. Se a execução chegou aqui, o login foi bem-sucedido
      localStorage.setItem("usuarioNome", usuario.nome);
      localStorage.setItem("usuarioEmail", usuario.email);

      alert(`Bem-vindo, ${usuario.nome}!`);
      navigate("/");
      
    } catch (err) {
      // 3. O erro lançado pelo apiFetch é capturado aqui
      setErro(err.message || "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <img src={logoImg} alt="CyberGuard Logo" className="logo-login" />

        {erro && (
          <div style={{ color: "#e74c3c", marginBottom: "10px", fontSize: "14px" }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="btn-cadastrar" disabled={carregando}>
            {carregando ? "Processando..." : "Entrar"}
          </button>

          <button type="button" className="btn-cadastrar-google">
            Entrar com Google
          </button>
        </form>

        <Link to="/cadastro" className="link-login">
          Não tem conta? Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}