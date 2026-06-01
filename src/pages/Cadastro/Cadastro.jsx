import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api"; 
import "./styles.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    usuario: "", 
    senha: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // 1. O apiFetch já processa o JSON e trata erros de status (4xx/5xx)
      await apiFetch("/usuarios/register", {
        method: "POST",
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      // 2. Se não deu erro no catch, o cadastro foi um sucesso
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
      
    } catch (err) {
      // 3. O catch captura qualquer erro enviado pelo backend
      console.error("Erro no cadastro:", err);
      alert("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>CyberGuard</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome completo</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="usuario">Nome de Usuário</label>
          <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />

          <label htmlFor="senha">Criar senha</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />

          <label htmlFor="confirmar">Confirmar senha</label>
          <input type="password" id="confirmar" name="confirmar" value={formData.confirmar} onChange={handleChange} required />

          <button type="submit" className="btn-cadastrar">Cadastrar</button>

          <Link to={"/login"} className="link-login">Possuo cadastro &gt;</Link>
        </form>
      </div>
    </div>
  );
}