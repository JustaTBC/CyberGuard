import { useState } from "react"; // ADD THIS
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
// ... (your logo imports)

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // Go to Home (as defined in your routes.jsx)
      } else {
        alert("Falha no login");
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        {/* ... logo ... */}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />

          <button type="submit" className="btn-cadastrar">
            Entrar
          </button>
          
          {/* Keep your other Links as they are */}
        </form>
      </div>
    </div>
  );
}