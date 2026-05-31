import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// Troquei o import para garantir que a imagem funciona corretamente no .map
import iconeCertificado from "./assets/certificLogo.svg";

const Certificados = () => {
  const [certificados, setCertificados] = useState([]);

useEffect(() => {
    const emailUsuario = localStorage.getItem("usuarioEmail") || "email@exemplo.com";

    fetch(`http://localhost:8080/api/certificados/${emailUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        setCertificados(data);
      })
      .catch((error) => console.error("Erro ao buscar certificados do perfil:", error));
  }, []);

  return (
    <div className="certificados-container">
      <h3 className="certificados-titulo">SEUS CERTIFICADOS</h3>

      <div className="certificados-icones">
        {certificados.length > 0 ? (
          certificados.map((item) => (
            <Link
              key={item.id}
              to="/meuscertificados"
              className="certificado-botao"
              title={item.nome}
            >
              <img src={iconeCertificado} alt={item.nome} width="24" />
            </Link>
          ))
        ) : (
          <p>Nenhum certificado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Certificados;