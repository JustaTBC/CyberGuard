import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "./assets/certificLogo.svg";
import { Link } from "react-router-dom";
// 👇 1. Adicionamos a importação do apiFetch
import { apiFetch } from "../../services/api";

export default function CertificadosList() {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emailUsuario = localStorage.getItem("usuarioEmail") || "email@exemplo.com";

    // 👇 2. Removemos o localhost e usamos apenas a rota final com apiFetch
    apiFetch(`/api/certificados/${emailUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        setCertificados(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar certificados:", error);
        setLoading(false);
      });
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
            // Passamos o 'nome' do certificado (ex: "Certificado 1") como state para a próxima página
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