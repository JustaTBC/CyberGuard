import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// 1. Importação necessária do nosso serviço otimizado
import { apiFetch } from "../../services/api"; 
import iconeCertificado from "./assets/certificLogo.svg";

const Certificados = () => {
  const [certificados, setCertificados] = useState([]);

  useEffect(() => {
    const carregarCertificadosPerfil = async () => {
      const emailUsuario = localStorage.getItem("usuarioEmail") || "email@exemplo.com";

      try {
        // 2. Usamos o apiFetch, que já resolve a URL e o .json()
        const data = await apiFetch(`/api/certificados/${emailUsuario}`);
        setCertificados(data);
      } catch (error) {
        console.error("Erro ao buscar certificados do perfil:", error);
      }
    };

    carregarCertificadosPerfil();
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