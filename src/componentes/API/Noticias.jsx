import React, { useEffect, useState } from "react";
import "./styles.css";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        // LIMPAMOS O ERRO AQUI! Assim a mensagem desaparece quando dá certo.
        setErro(null);

        const response = await fetch("/api/noticias");

        if (!response.ok) {
          throw new Error("Resposta não OK da API do Java");
        }

        const data = await response.json();
        setNoticias(data.articles || []);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setErro("Não foi possível carregar as notícias.");
      }
    }

    carregarNoticias();
  }, []);

  return (
    <div className="noticias-container">
      <h1 className="titulo-pagina">📰 Notícias</h1>

      {erro && <p className="erro-texto">{erro}</p>}

      {noticias.length === 0 && !erro ? (
        <p className="loading-text">Carregando notícias...</p>
      ) : (
        noticias.map((item, index) => (
          <div className="noticia-card" key={index}>
            {item.image && (
              <img
                src={item.image}
                alt="Imagem da notícia"
                className="noticia-img"
              />
            )}
            <div className="noticia-content">
              <h2 className="noticia-titulo">{item.title}</h2>
              <p className="noticia-descricao">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="noticia-link"
              >
                Ler mais
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Noticias;
