import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconeBoneco from "./assets/iconeBoneco.svg";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./styles.css";

export default function RelatarGolpe() {
  const navigate = useNavigate();

  // 1. Estados para guardar o que o usuário digita
  const [tipo, setTipo] = useState("");
  const [boletim, setBoletim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [carregando, setCarregando] = useState(false);

  // 2. Função disparada ao clicar em "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    setCarregando(true);

    // Como o Java só espera titulo e descricao, vamos juntar o BO na descrição
    const descricaoCompleta = boletim
      ? `BO: ${boletim} - ${descricao}`
      : descricao;

    const novaDenuncia = {
      titulo: tipo,
      descricao: descricaoCompleta,
    };

    try {
      // 3. Faz o POST para o seu backend Java
      const response = await fetch("/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaDenuncia),
      });

      if (response.ok) {
        // Se deu sucesso (200), joga para a tela de confirmação
        navigate("/DenunciaEnviada");
      } else {
        alert("Erro ao enviar a denúncia. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Falha ao comunicar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <div className="app-Content-golpe">
        <h1 className="Page-title">Denúncias</h1>

        <div className="Form-card">
          <div className="Form-Card-Icon-wrapper">
            <img
              src={iconeBoneco}
              alt="Ícone de denúncia"
              className="form-card-icon"
            />
          </div>

          {/* 4. Transformamos a div num <form> */}
          <form className="Form-Container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="Form-Input"
              placeholder="Tipo de denúncia"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />

            <input
              type="text"
              className="Form-Input"
              placeholder="Número do boletim de ocorrência (Opcional)"
              value={boletim}
              onChange={(e) => setBoletim(e.target.value)}
            />

            <textarea
              className="Form-Textarea"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            ></textarea>

            {/* 5. Trocamos o Link por um botão de submissão */}
            <button
              type="submit"
              className="denuncia-btn"
              disabled={carregando}
            >
              {carregando ? "ENVIANDO..." : "ENVIAR DENÚNCIA"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
