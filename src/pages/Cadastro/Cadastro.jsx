import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function Cadastro() {
  const navigate = useNavigate();

  // Estado para capturar todos os campos do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    usuario: "", // Nome de usuário (uso local/frontend)
    senha: "",
    confirmar: "",
  });

  // Função para atualizar o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica de senha
    if (formData.senha !== formData.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Chamada para o seu UsuarioController no Spring Boot
      const response = await fetch("/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos apenas o que o seu Usuario.java espera
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login"); // Redireciona para a página de login
      } else {
        const errorData = await response.text();
        alert("Erro ao cadastrar: " + errorData);
      }
    } catch (err) {
      console.error("Erro na conexão:", err);
      alert("Não foi possível conectar ao servidor backend.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>CyberGuard</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="usuario">Nome de Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="senha">Criar senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmar">Confirmar senha</label>
          <input
            type="password"
            id="confirmar"
            name="confirmar"
            value={formData.confirmar}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>

          <Link to={"/login"} className="link-login">
            Possuo cadastro &gt;
          </Link>
        </form>
      </div>
    </div>
  );
}
