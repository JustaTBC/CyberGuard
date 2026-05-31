import { useState } from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import DeviceMockup from "../../layout/DeviceMockup"; 
import "./styles.css"; 
import iconeTelefone from './assets/iconeTelefone.svg';
import iconeEmail from './assets/iconeEmail.svg';
import iconeTelefoneL from './assets/iconeTelefoneL.svg';

export default function FaleConosco() {
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");
  const [carregando, setCarregando] = useState(false);
  
  // Novo estado para controlar o efeito visual de foco na caixa de texto
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setStatus("");

    const nomeUsuario = localStorage.getItem("usuarioNome") || "Utilizador Desconhecido";
    const emailUsuario = localStorage.getItem("usuarioEmail") || "email@nao-encontrado.com";

    try {
      const response = await fetch("http://localhost:8080/faleconosco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            nome: nomeUsuario, 
            email: emailUsuario, 
            mensagem: mensagem 
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMensagem(""); 
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setStatus("error");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <DeviceMockup>
      <div className="app-shell"> 
         <Header />
        <div className="app-header-container">
          <div className="app-header">
            
          </div>
        </div>
        
        <div className="app-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '10px' }}> 
          
          <div className="contato-card" style={{ margin: '0 auto', width: '100%', boxSizing: 'border-box' }}> 
            
            <div className="contato-card-title-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={iconeTelefoneL} alt="Ícone de telefone" className="fale-conosco-icone-titulo" /> 
              <h2 className="contato-card-title">Fale conosco</h2>
            </div>

           <div className="contato-bloco-interno"> 

              {/* --- Linha 1: Central de Atendimento --- */}
              <div className="contato-item-bloco">
                <img src={iconeTelefone} alt="Central de atendimento" className="contato-icone" /> 
                <div className="contato-texto">
                  <p className="contato-titulo-bloco">Central de atendimento</p>
                  <p className="contato-conteudo-bloco">0800 1234-5678</p>  
                </div>
              </div>

              {/* --- Linha 2: Email --- */}
              <div className="contato-item-bloco" style={{ overflow: 'hidden' }}>
                <img src={iconeEmail} alt="Email de contato" className="contato-icone" />
                <div className="contato-texto" style={{ width: '100%' }}>
                  <p className="contato-titulo-bloco">Fale Conosco</p>
                  <p className="contato-conteudo-bloco" style={{ wordBreak: 'break-all', margin: 0 }}>CyberGuard@email.com</p>
                </div>
              </div>
            </div>   

            <form onSubmit={handleSubmit} className="form-fale-conosco" style={{ width: '100%', maxWidth: '400px', margin: '10px auto 0 auto', boxSizing: 'border-box' }}>
              <div>
                <textarea 
                  placeholder="Escreva a sua dúvida, sugestão ou relato..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onFocus={() => setIsFocused(true)}   // Ativa o brilho
                  onBlur={() => setIsFocused(false)}   // Desativa o brilho
                  required
                  rows="5"
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    marginBottom: '15px', 
                    borderRadius: '12px', // Bordas mais arredondadas e amigáveis
                    border: isFocused ? '2px solid #E86616' : '1px solid #dcdcdc', // Muda a cor da borda ao clicar
                    backgroundColor: isFocused ? '#ffffff' : '#f8f9fa', // Fundo dinâmico
                    boxShadow: isFocused ? '0 4px 12px rgba(232, 102, 22, 0.15)' : 'inset 0 2px 4px rgba(0,0,0,0.03)', // Efeito de sombra/brilho
                    outline: 'none', 
                    resize: 'none', 
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    color: '#333',
                    lineHeight: '1.5',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease' // Faz com que a mudança de cores seja uma animação fluida
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={carregando}
                style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: '#E86616', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 6px rgba(232, 102, 22, 0.2)', // Sombra subtil no botão também
                    transition: 'opacity 0.2s'
                }}
              >
                {carregando ? "A enviar..." : "Enviar Mensagem"}
              </button>

              {status === "success" && <p style={{ color: "green", marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>Mensagem enviada com sucesso!</p>}
              {status === "error" && <p style={{ color: "red", marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>Erro ao enviar. Tente novamente.</p>}
            </form>

          </div>
        </div>

        <Footer /> 
      </div>
    </DeviceMockup>
  );
}