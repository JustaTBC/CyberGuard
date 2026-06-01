import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import logoImg from "./assets/logo.png";
// Se você tiver o ícone do google, importe aqui:
// import googleIcon from "./assets/google.svg";

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
      const response = await fetch("/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("E-mail ou senha incorretos");
      }

      const usuario = await response.json();

      localStorage.setItem("usuarioNome", usuario.nome);
      localStorage.setItem("usuarioEmail", usuario.email);
      localStorage.setItem("usuarioId", usuario.id);

      alert(`Bem-vindo, ${usuario.nome}!`);

      navigate("/");
    } catch (err) {
      setErro(err.message || "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        {/* Usando a classe logo-login do seu CSS */}
        <img src={logoImg} alt="CyberGuard Logo" className="logo-login" />

        {erro && (
          <div
            style={{ color: "#e74c3c", marginBottom: "10px", fontSize: "14px" }}
          >
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

          {/* Botão do Google que você estilizou no CSS */}
          {/* Descomente a imagem se você importou o ícone lá em cima */}
          <button type="button" className="btn-cadastrar-google">
            {/* <img src={googleIcon} alt="Google" /> */}
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
