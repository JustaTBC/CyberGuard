import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import Logo from "./assets/lococomunidade4.png";
import "./styles.css";

export default function NovaPostagem() {
    const [conteudo, setConteudo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    async function handleEnviarPostagem(e) {
        e.preventDefault();

        if (!conteudo.trim()) {
            alert("Por favor, escreva algo antes de postar!");
            return;
        }

        // 1. Busca o ID do usuário logado antes de abrir a requisição
        const idLogado = localStorage.getItem("usuarioId");

        if (!idLogado) {
            alert("Erro: Você precisa estar logado para fazer uma postagem!");
            return;
        }

        setCarregando(true);

        try {
            // 2. Faz uma única chamada fetch estruturada
            const response = await fetch("/api/postagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conteudo: conteudo,
                    autorId: idLogado // Envia o ID dinâmico coletado acima
                }),
            });

            if (response.ok) {
                alert("Postagem publicada com sucesso!");
                setConteudo("");
                navigate("/comunidade");
            } else {
                const erroTexto = await response.text();
                alert(`Erro ao publicar: ${erroTexto}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    // 🆕 ESSE É O BLOCO QUE FALTAVA NO SEU ARQUIVO:
    return (
        <div className="app-fundo-br">
            <Header />
            <img src={Logo} alt='Logo da Comunidade' className="logoTopo" />
            <div className="app-content">

                <p className="texto-comunidade">
                    Compartilhe uma postagem com a comunidade:
                </p>

                <form onSubmit={handleEnviarPostagem} className="formulario-postagem">
                    <textarea
                        className="campo-postagem"
                        placeholder="Escreva sua postagem aqui..."
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        disabled={carregando}
                    />

                    <button type="submit" className="botaoComunidade" disabled={carregando}>
                        {carregando ? "Postando..." : "Postar Agora"}
                    </button>
                </form>

                <Link className="Sair" to={'/comunidade'}> Cancelar </Link>

            </div>
            <Footer />
        </div>
    );
}