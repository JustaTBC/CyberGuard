// src/componentes/CertificadoList/index.jsx

import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "./assets/certificLogo.svg";
import { Link } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function CertificadosList() {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarCertificados = async () => {
      const emailUsuario = localStorage.getItem("usuarioEmail") || "email@exemplo.com";

      try {
        // Como o apiFetch já retorna os dados (JSON), não precisamos do .json()
        const data = await apiFetch(`/api/certificados/${emailUsuario}`);
        setCertificados(data);
      } catch (error) {
        console.error("Erro ao buscar certificados:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarCertificados();
  }, []);

  if (loading) {
    return <p className="loading-text">A procurar certificados...</p>;
  }

  if (certificados.length === 0) {
    return <p className="empty-text">Ainda não conquistaste nenhum certificado. Assiste a mais aulas!</p>;
  }

  return (
    <div className="certificados-list">
      {certificados.map((c) => (
        <Link 
            key={c.id} 
            to={`/certificado/${c.id}`}
            state={{ titulo: c.nome }} 
            className="cert-item"
        >
          <img src={logo} alt="Certificado" className="cert-icon" />
          <p>{c.nome}</p>
        </Link>
      ))}
    </div>
  );
}