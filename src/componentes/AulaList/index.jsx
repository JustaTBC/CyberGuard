import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function AulasList() {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar(pagina = "") {
    try {
      setLoading(true);
      setErro("");

      // O apiFetch já faz o request e transforma em objeto/json automaticamente
      const data = await apiFetch(`/api/aulas?pageToken=${pagina}&maxResults=10`);

      // Verificação: se o backend não retornar o que esperamos, lançamos um erro
      if (!data || !data.items) {
        throw new Error("Formato de dados inválido.");
      }

      const novos = (data.items || [])
        .map((item) => {
          const sn = item.snippet;
          return {
            id: sn?.resourceId?.videoId || item.contentDetails?.videoId,
            titulo: sn?.title ?? "",
            desc: sn?.description ?? "",
            thumb:
              sn?.thumbnails?.high?.url ||
              sn?.thumbnails?.medium?.url ||
              sn?.thumbnails?.default?.url,
          };
        })
        .filter((v) => !!v.id);

      setVideos((prev) => [...prev, ...novos]);
      setNextPageToken(data.nextPageToken || "");
    } catch (e) {
      console.error("Erro ao carregar vídeos:", e);
      setErro("Não foi possível carregar os vídeos agora. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="aulas-card">
      {erro && <p className="erro-aulas">{erro}</p>}

      {videos.map((v) => (
        <Link
          key={v.id}
          to={`/videoaula/${v.id}`}
          state={{ titulo: v.titulo, desc: v.desc }}
          className="aula-item"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="thumb">
            <img
              src={v.thumb || `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
              alt={`Miniatura: ${v.titulo}`}
              loading="lazy"
            />
          </div>
          <div className="texto">
            <h3>{v.titulo}</h3>
            <p>{v.desc?.length > 90 ? v.desc.slice(0, 90) + "..." : v.desc}</p>
          </div>
        </Link>
      ))}

      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        {loading ? (
          <button className="btn-carregar" disabled>Carregando…</button>
        ) : nextPageToken ? (
          <button className="btn-carregar" onClick={() => carregar(nextPageToken)}>
            Carregar mais
          </button>
        ) : (
          videos.length > 0 && <span style={{ opacity: 0.7 }}>Fim da lista</span>
        )}
      </div>
    </div>
  );
}